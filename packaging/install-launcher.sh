#!/usr/bin/env bash
# Installe le raccourci CORPS dans le lanceur d'applications (Omarchy / Hyprland).
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

install -Dm644 "$root/public/favicon.svg" \
  "$HOME/.local/share/icons/hicolor/scalable/apps/corps-humain.svg"
install -Dm644 "$root/packaging/corps-humain.desktop" \
  "$HOME/.local/share/applications/corps-humain.desktop"

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$HOME/.local/share/applications" || true
fi

echo "Raccourci installé : CORPS — Atlas du corps humain"
echo "Lanceur : $HOME/.local/share/applications/corps-humain.desktop"
