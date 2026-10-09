"""Embed local presentation assets into a shareable HTML file. No dependencies."""

import base64
import html
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
source = (ROOT / 'index.html').read_text()
homepage_source = (ROOT / 'homepage.html').read_text()


def embed(match):
    asset = ROOT / match.group(0)
    mime = mimetypes.guess_type(asset.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(asset.read_bytes()).decode('ascii')


def embed_assets(content):
    return re.sub(r'assets/[a-zA-Z0-9_.-]+\.(?:jpg|png|ttf)', embed, content)


homepage = embed_assets(homepage_source)
homepage_destination = ROOT / 'Patina-Homepage-Prototype.html'
homepage_destination.write_text(homepage)

# The presentation remains one portable file, including its interactive homepage.
portable = embed_assets(source)
portable = portable.replace('src="homepage.html"', 'srcdoc="' + html.escape(homepage, quote=True) + '"')
portable = portable.replace('href="homepage.html', 'href="Patina-Homepage-Prototype.html')
destination = ROOT / 'Patina-The-Living-Study.html'
destination.write_text(portable)
for output in (destination, homepage_destination):
    print(f'{output.name}: {output.stat().st_size / 1024 / 1024:.2f} MB')
