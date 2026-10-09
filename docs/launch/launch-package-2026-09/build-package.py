"""Build readable, offline HTML editions of Patina's editable Markdown files.

Requires Python-Markdown. Run from any directory; source files remain unchanged.
"""
from pathlib import Path
from html import escape, unescape
import os
import re
import markdown

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[2]
DOCUMENTS = [
    "README.md", "launch-playbook.md",
    "communications/outreach-and-email.md", "communications/social-copy.md",
    "communications/founder-narrative-and-faq.md",
    "press/press-kit.md", "press/pitches.md", "press/research-notes.md",
    "operations/measurement-and-operations.md",
    "creative/creative-guide.md", "creative/motion-storyboard.md",
]
SOURCE_MAP = {
    (REPO / "docs/messaging/patina-messaging-system.md").resolve(): ROOT / "references/messaging-system.md",
    (REPO / "design-proposals/living-study/PRODUCTION-BRIEF.md").resolve(): ROOT / "references/production-direction.md",
    (REPO / "design-proposals/living-study/PHOTOGRAPHY-SHOT-LIST.md").resolve(): ROOT / "references/photography-shot-list.md",
    (REPO / "public/images/founders/README.md").resolve(): ROOT / "references/documentary-image-provenance.md",
    (REPO / "public/images/studio/README.md").resolve(): ROOT / "references/illustrative-image-provenance.md",
    (REPO / "docs/launch/living-study/email-review/index.html").resolve(): ROOT / "references/signup-email-previews/index.html",
    (REPO / "src/lib/emails/founding-welcome.ts").resolve(): ROOT / "references/signup-email-previews/founding.html",
    (REPO / "src/lib/emails/application-received.ts").resolve(): ROOT / "references/signup-email-previews/index.html",
    (REPO / "src/components/studio/FoundingInvitation.tsx").resolve(): ROOT / "references/messaging-system.md",
}


def relative(target, source):
    return os.path.relpath(target, source.parent).replace(os.sep, "/")


def relink(body, source):
    def fix(match):
        href, label = unescape(match.group(1)), match.group(2)
        if re.match(r"^(?:https?:|mailto:|#|data:)", href):
            return match.group(0)
        path, marker, fragment = href.partition("#")
        target = (source.parent / path).resolve()
        if target in SOURCE_MAP:
            mapped = relative(SOURCE_MAP[target], source)
            return f'<a href="{escape(mapped, quote=True)}">{label}</a>'
        if ROOT not in target.parents and target != ROOT:
            return f'<span title="Repository source: {escape(path, quote=True)}">{label}</span>'
        rel = str(target.relative_to(ROOT))
        if rel in DOCUMENTS:
            path = str(Path(path).with_suffix(".html"))
        url = path + ("#" + fragment if marker else "")
        return f'<a href="{escape(url, quote=True)}">{label}</a>'
    return re.sub(r'<a href="([^"]+)"[^>]*>(.*?)</a>', fix, body, flags=re.S)


def document_html(source, text, title=None, media=False):
    md = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "sane_lists"])
    body = relink(md.convert(text), source)
    title = title or re.search(r"^# (.+)", text, re.M).group(1)
    css = relative(ROOT / "reading.css", source)
    book = relative(ROOT / "launch-book.html", source)
    identity = relative(ROOT / "creative/assets/strata-default.svg", source)
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{escape(title)}</title><link rel="stylesheet" href="{css}"></head>
<body class="{'media-edition' if media else 'reading-edition'}"><a class="skip" href="#content">Skip to content</a>
<nav class="reader-nav" aria-label="Launch collection"><a href="{book}">Patina / Launch collection</a><a href="{source.name}">Editable Markdown</a><button type="button" onclick="window.print()">Print</button></nav>
<div class="reader-layout"><aside class="contents" aria-label="On this page">{md.toc}</aside><main id="content"><img class="reader-strata" src="{identity}" alt="Patina Strata">{body}</main></div>
<footer>Patina · Where Time Adds Value. · hello@patina.cloud</footer></body></html>'''


for name in DOCUMENTS:
    source = ROOT / name
    if not source.exists():
        raise SystemExit(f"Missing package source: {name}")
    destination = source.with_suffix(".html")
    destination.write_text(document_html(source, source.read_text()))
    print(destination.relative_to(ROOT))

# A clean editorial background edition, excluding internal pitch instructions,
# distribution/rights workflow, the media target list, and unapproved quotations.
press = ROOT / "press/press-kit.md"
text = press.read_text()
announcement = text.split("## Announcement\n", 1)[1].split("## Fact sheet", 1)[0]
announcement = re.sub(r"\*Editorial note for dispatch:.*?\*\n", "", announcement, flags=re.S)
facts_and_bios = "## Fact sheet" + text.split("## Fact sheet", 1)[1].split("## Backgrounder:", 1)[0]
media_text = "# Patina — media background\n\nBackground edition · 11 September 2026 · Website and founding community; public app and marketplace pre-launch.\n\n" + announcement + "\n" + facts_and_bios
media_source = ROOT / "press/media-background.md"
media_source.write_text(media_text)
media_source.with_suffix(".html").write_text(document_html(media_source, media_text, "Patina — media background", media=True))
print("press/media-background.html")
