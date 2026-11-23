#!/usr/bin/env python3
"""Accès direct au harnais Blender par socket, sans namespace MCP.

Protocole identique à mcp-for-blender : {"type": command, "params": {...}}.
Commandes utiles : get_scene_info, execute_code.
"""
import json
import socket
import sys

HOST = '127.0.0.1'
PORT = 9876


def send(command, params):
    s = socket.create_connection((HOST, PORT), timeout=10)
    s.settimeout(180)
    s.sendall(json.dumps({'type': command, 'params': params}).encode('utf-8'))
    chunks = []
    while True:
        chunk = s.recv(8192)
        if not chunk:
            break
        chunks.append(chunk)
        try:
            data = json.loads(b''.join(chunks).decode('utf-8'))
            return data.get('result', data)
        except json.JSONDecodeError:
            continue
    raise RuntimeError('réponse incomplète')


if __name__ == '__main__':
    command = sys.argv[1]
    if command == 'execute_code':
        payload = {'code': sys.stdin.read()}
    else:
        payload = {}
    print(json.dumps(send(command, payload), ensure_ascii=False, indent=1))
