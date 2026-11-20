#!/usr/bin/env python3
"""Assemble des cartes PBR CC0 en une texture tissulaire normalisee.

Usage :
  python3 assemble-texture.py --input /cache/tissu --output public/textures/os \
      --tissue os --seed 2039 --size 1024

Le dossier d'entree doit contenir au moins albedo.* (jpg/png). Les cartes
roughness.*, normal.* et ao.* sont optionnelles. La graine rend le bruit
procedural reproductible. Ecrit un manifeste avec empreintes et provenance.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import random
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter


MAPS = ("albedo", "roughness", "normal", "ao", "height")


def find_map(folder: Path, name: str) -> Path | None:
    for ext in ("*.png", "*.jpg", "*.jpeg", "*.webp"):
        for path in folder.glob(f"{name}{ext}"):
            return path
    return None


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True)
    ap.add_argument("--output", required=True)
    ap.add_argument("--tissue", required=True)
    ap.add_argument("--seed", type=int, default=2039)
    ap.add_argument("--size", type=int, default=1024)
    ap.add_argument("--source", default="")
    ap.add_argument("--license", default="CC0")
    ap.add_argument("--url", default="")
    args = ap.parse_args()

    src = Path(args.input)
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    albedo_path = find_map(src, "albedo")
    if not albedo_path:
        raise SystemExit("carte albedo introuvable (albedo.jpg ou albedo.png)")

    size = (args.size, args.size)
    albedo = Image.open(albedo_path).convert("RGB").resize(size, Image.LANCZOS)
    albedo = ImageEnhance.Color(albedo).enhance(0.88)

    # Bruit procedure multi-echelle, reproductible via la graine.
    rng = random.Random(args.seed)
    noise = Image.new("L", (64, 64))
    noise.putdata([rng.randint(108, 148) for _ in range(64 * 64)])
    noise = noise.resize(size, Image.BICUBIC).filter(ImageFilter.GaussianBlur(1.2))
    albedo = Image.blend(albedo, Image.merge("RGB", (noise, noise, noise)), 0.08)

    written = {}
    albedo_file = out / "albedo.jpg"
    albedo.save(albedo_file, quality=88, optimize=True)
    written["albedo"] = sha256(albedo_file)

    for name in MAPS[1:]:
        path = find_map(src, name)
        if not path:
            continue
        img = Image.open(path).convert("L").resize(size, Image.LANCZOS)
        target = out / f"{name}.jpg"
        img.save(target, quality=86, optimize=True)
        written[name] = sha256(target)

    manifest = {
        "tissue": args.tissue,
        "generated": datetime.now(timezone.utc).isoformat(),
        "source": args.source,
        "license": args.license,
        "url": args.url,
        "seed": args.seed,
        "size": args.size,
        "maps": written,
        "rule": "aucun detail anatomique inventé ; bruit procede multi-echelle reproductible",
    }
    (out / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1))
    print(json.dumps(manifest, ensure_ascii=False))


if __name__ == "__main__":
    main()
