#!/usr/bin/env python3
"""Production Kontraktus primary mark — precision refinements only (single direction)."""
from __future__ import annotations

from pathlib import Path

OUT = Path(__file__).resolve().parent / "primary"
OUT.mkdir(exist_ok=True)

# Graphite / paper / cobalt — muted enterprise (no neon)
INK_LT = "#080a0f"
INK_DK = "#f3f5f9"
BLUE_AC = "#3458e6"
BLUE_AC_DK = "#6f96ff"

# --- K silhouette: refined wedge cut for cleaner intent at tiny and huge scales -------------------
def k_planes(ink: str) -> str:
    return f'''    <rect fill="{ink}" x="17.35" y="23.55" width="12.55" height="49.15" rx="4.72" ry="4.72"/>
    <path fill="{ink}" d="M29.9 34.84 L70.42 19.86 L70.42 33.14 L43.48 52.42 L29.9 42.58 Z"/>
    <path fill="{ink}" d="M29.9 47.04 L71.02 71.02 L71.02 57.54 L43.48 53.76 L29.9 47.04 Z"/>'''


def ledger(light: bool) -> str:
    """Thin ledger + cobalt run + flat clause cap (reads at 16px vs a fuzzy dot)."""
    n, a, opn, opc = (
        ("#c5cedd", BLUE_AC, "0.44", "0.86") if light else ("#5c697e", BLUE_AC_DK, "0.42", "0.88")
    )
    return f'''    <path stroke="{n}" opacity="{opn}" stroke-width="1.38" stroke-linecap="round" fill="none" d="M20.05 71.92 H43.42"/>
    <path stroke="{a}" opacity="{opc}" stroke-width="1.38" stroke-linecap="round" fill="none" d="M43.58 71.92 H53.65"/>
    <rect x="52.92" y="71.42" width="2.05" height="1.08" rx="0.42" fill="{a}" opacity="{opc}"/>'''


def layers_full(light: bool) -> str:
    """Three sheets, lower contrast / thinner strokes — depth without clutter."""
    if light:
        return '''    <rect x="7.05" y="7" width="67.42" height="60.92" rx="11.08" ry="11.08" stroke="#ebeff9" stroke-width="1.1" fill="none" opacity="0.52"/>
    <rect x="10.9" y="10.82" width="67.42" height="60.92" rx="10.82" ry="10.82" stroke="#d7e1ef" stroke-width="1.02" fill="none" opacity="0.36"/>
    <rect x="14.72" y="14.62" width="67.42" height="60.92" rx="10.56" ry="10.56" stroke="#aab8cc" stroke-width="0.92" fill="none" opacity="0.52"/>'''
    return '''    <rect x="7.05" y="7" width="67.42" height="60.92" rx="11.08" ry="11.08" stroke="#2a3242" stroke-width="1.05" fill="none" opacity="0.44"/>
    <rect x="10.9" y="10.82" width="67.42" height="60.92" rx="10.82" ry="10.82" stroke="#384252" stroke-width="0.98" fill="none" opacity="0.32"/>
    <rect x="14.72" y="14.62" width="67.42" height="60.92" rx="10.56" ry="10.56" stroke="#4b5569" stroke-width="0.9" fill="none" opacity="0.46"/>'''


def layers_favicon(light: bool) -> str:
    """Single faint sheet so ttab / 16px stays legible."""
    if light:
        return '''    <rect x="8.85" y="8.72" width="65.82" height="59.52" rx="10.65" ry="10.65" stroke="#dce4f3" stroke-width="0.95" fill="none" opacity="0.38"/>'''
    return '''    <rect x="8.85" y="8.72" width="65.82" height="59.52" rx="10.65" ry="10.65" stroke="#343d4f" stroke-width="0.92" fill="none" opacity="0.34"/>'''


def core(light: bool, compact: bool) -> str:
    ink = INK_LT if light else INK_DK
    lyr = layers_favicon(light) if compact else layers_full(light)
    return lyr + "\n" + k_planes(ink) + "\n" + ledger(light)


def wm_def(light: bool, stacked: bool) -> str:
    fill = INK_LT if light else INK_DK
    fs = 53 if stacked else 50
    ta = ";text-anchor:middle;" if stacked else ""
    return f'''  <defs>
    <style><![CDATA[
      .wm{{fill:{fill};font-family:"IBM Plex Sans",Inter,Lato,Lato SemiBold,"DejaVu Sans",system-ui,sans-serif;font-weight:600;font-size:{fs}px;letter-spacing:-0.072em{ta}}}
    ]]></style>
  </defs>'''


def wrap(title: str, w: int, h: int, body: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none" role="img" aria-labelledby="t">
  <title id="t">{title}</title>
{body}</svg>
'''


def horizontal(light: bool) -> None:
    body = wm_def(light, False) + "\n"
    body += '  <g transform="translate(28,21)">\n' + core(light, False) + "\n  </g>\n"
    body += '  <text class="wm" x="140" y="76">Kontraktus</text>'
    suf = "light" if light else "dark"
    (OUT / f"logo-horizontal-on-{suf}.svg").write_text(
        wrap(f"Kontraktus horizontal ({suf} UI)", 800, 120, body), encoding="utf-8"
    )


def stacked(light: bool) -> None:
    body = wm_def(light, True) + "\n"
    body += '  <g transform="translate(169,52) scale(2.05)">\n' + core(light, False) + "\n  </g>\n"
    body += '  <text class="wm" x="220" y="258">Kontraktus</text>'
    suf = "light" if light else "dark"
    (OUT / f"logo-stacked-on-{suf}.svg").write_text(wrap(f"Kontraktus stacked ({suf} UI)", 440, 320, body), encoding="utf-8"
    )


def square_light() -> None:
    body = '  <g transform="translate(114,117) scale(6.0)">\n' + core(True, False) + "\n  </g>"
    (OUT / "icon-square-on-light.svg").write_text(wrap("Kontraktus app icon light", 512, 512, body))


def square_dark() -> None:
    inner = core(False, False)
    body = '''  <defs>
    <linearGradient id="kbg" x1="112" y1="96" x2="416" y2="432" gradientUnits="userSpaceOnUse">
      <stop stop-color="#06080d"/>
      <stop offset="1" stop-color="#101622"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#kbg)"/>
  <g transform="translate(114,117) scale(6.0)">
''' + inner + "\n  </g>"
    (OUT / "icon-square-on-dark.svg").write_text(wrap("Kontraktus app icon dark", 512, 512, body))


def circle(light: bool) -> None:
    inner = core(light, False)
    bg = (
        '<circle cx="256" cy="256" r="248" fill="#ffffff" stroke="#eceef5" stroke-width="1.5"/>'
        if light
        else '<circle cx="256" cy="256" r="248" fill="#06080f" stroke="#151b28" stroke-width="1.5"/>'
    )
    suf = "light" if light else "dark"
    body = "  " + bg + '\n  <g transform="translate(114,117) scale(6.0)">\n' + inner + "\n  </g>"
    (OUT / f"icon-circle-on-{suf}.svg").write_text(wrap(f"Kontraktus profile icon {suf}", 512, 512, body))


def minimal() -> None:
    """Wordless icon: two quiet sheets + silhouette + neutral ledger (no cobalt flicker)."""
    z = '''    <rect x="7.05" y="7" width="67.42" height="60.92" rx="11.08" ry="11.08" stroke="#eaeef8" stroke-width="1.05" fill="none" opacity="0.45"/>
    <rect x="11.95" y="11.82" width="67.42" height="60.92" rx="10.72" ry="10.72" stroke="#cdd7e8" stroke-width="0.95" fill="none" opacity="0.32"/>'''
    inner = z + "\n" + k_planes(INK_LT) + '\n    <path stroke="#b9c5d9" opacity="0.38" stroke-width="1.32" stroke-linecap="round" fill="none" d="M20.05 71.92 H52.82"/>'
    body = '  <g transform="translate(56.8,114) scale(3.74)">\n' + inner + "\n  </g>"
    (OUT / "icon-only-minimal.svg").write_text(wrap("Kontraktus icon minimal", 320, 320, body))


def monochrome() -> None:
    mono_layers = '''    <rect x="7.05" y="7" width="67.42" height="60.92" rx="11.08" stroke="#000" stroke-width="1" fill="none" opacity="0.11"/>
    <rect x="10.9" y="10.82" width="67.42" height="60.92" rx="10.82" stroke="#000" stroke-width="0.95" fill="none" opacity="0.08"/>
    <rect x="14.72" y="14.62" width="67.42" height="60.92" rx="10.56" stroke="#000" stroke-width="0.88" fill="none" opacity="0.06"/>'''
    body = wm_def(True, False) + "\n"
    body += (
        '  <g transform="translate(28,21)">\n'
        + mono_layers
        + "\n"
        + k_planes("#000")
        + "\n"
        + '''    <path stroke="#000" opacity="0.2" stroke-width="1.35" stroke-linecap="round" fill="none" d="M20.05 71.92 H43.42"/>
    <path stroke="#000" opacity="0.3" stroke-width="1.32" stroke-linecap="round" fill="none" d="M43.58 71.92 H53.65"/>
    <rect x="52.92" y="71.42" width="2.05" height="1.06" rx="0.42" fill="#000" opacity="0.28"/>
'''
        + "  </g>\n"
        + '  <text class="wm" x="140" y="76">Kontraktus</text>'
    )
    (OUT / "logo-monochrome.svg").write_text(wrap("Kontraktus monochrome horizontal", 800, 120, body))


def fav(light: bool) -> None:
    bg = "#ffffff" if light else "#06070d"
    inner = core(light, compact=True)
    suf = "light" if light else "dark"
    body = (
        f'  <rect width="64" height="64" rx="15" fill="{bg}"/>\n'
        '  <g transform="translate(8.85,11.6) scale(0.708)">\n'
        + inner
        + "\n  </g>"
    )
    (OUT / f"favicon-on-{suf}.svg").write_text(wrap(f"Kontraktus favicon {suf}", 64, 64, body))


def main() -> None:
    for lt in (True, False):
        horizontal(lt)
        stacked(lt)
        circle(lt)
        fav(lt)
    square_light()
    square_dark()
    minimal()
    monochrome()
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
