#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parent

INK = "#0d0f11"
PAPER = "#f4f6fb"
BLUE = "#2f6bff"
BLUE_DM = "#6fa3ff"
TEAL = "#18ccc7"
TEAL_DM = "#5ee4df"


def wm_def(light: bool, stacked: bool) -> str:
    fill = INK if light else PAPER
    fs = 56 if stacked else 52
    ta = ";text-anchor:middle;" if stacked else ""
    return f'''  <defs>
    <style><![CDATA[
      .wm{{fill:{fill};font-family:Lato,Lato SemiBold,Lato-Bold,'DejaVu Sans',Arial,sans-serif;font-size:{fs}px;font-weight:700;letter-spacing:-0.062em{ta}}}
    ]]></style>
  </defs>'''


def wrap(title: str, w: int, h: int, body: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none" role="img" aria-labelledby="t">
  <title id="t">{title}</title>
{body}</svg>
'''


def k_planes(ink: str) -> str:
    return f'''    <rect fill="{ink}" x="17" y="23" width="13.85" height="49.95" rx="5.35" ry="5.35"/>
    <path fill="{ink}" d="M30.92 36.08 L71.75 19.92 L71.75 33.58 L43.94 53.95 L31 43.94 Z"/>
    <path fill="{ink}" d="M31 46.52 L71.76 71.68 L71.76 56.94 L44.58 53.95 L31 46.52 Z"/>'''


def core_b(light: bool) -> str:
    s = INK if light else PAPER
    a = BLUE if light else BLUE_DM
    h = BLUE if light else BLUE_DM
    return f'''    <path d="M22 77V17.5 M22 47.5 L63.15 76.35 M22 47.5 L63.15 14.95" stroke="{s}" stroke-width="9.85" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="22" cy="47.5" r="5.55" fill="{a}"/>
    <circle cx="63.15" cy="76.35" r="4.55" fill="{a}"/>
    <circle cx="63.15" cy="14.95" r="4.55" fill="{a}" opacity="0.48"/>
    <circle cx="22" cy="47.5" r="10.4" stroke="{h}" opacity="0.13" stroke-width="1.2" fill="none"/>
    <path d="M28.5 71.5 L53.95 61.95" stroke="{a}" opacity="{'0.3' if light else '0.42'}" stroke-width="2" stroke-linecap="round"/>'''


def core_c(light: bool) -> str:
    ink = INK if light else PAPER
    z1, z2, z3 = ("#cdd6e8", "#b4c2d9", "#9aaab8") if light else ("#3b4558", "#4b556d", "#5c6880")
    rule_op = "0.52" if light else "0.58"
    return f'''    <rect x="7" y="7" width="66" height="60" rx="11" stroke="{z1}" stroke-width="1.65" fill="none" opacity="0.95"/>
    <rect x="12" y="11" width="66" height="60" rx="10.5" stroke="{z2}" stroke-width="1.35" fill="none" opacity="0.7"/>
    <rect x="17" y="15" width="66" height="60" rx="10" stroke="{z3}" stroke-width="1.05" fill="none" opacity="0.48"/>
{k_planes(ink)}
    <path stroke="#9dabbc" opacity="{rule_op}" stroke-width="2.05" stroke-linecap="round" fill="none" d="M19.5 71.95 H53.95"/>'''


def core_d(light: bool) -> str:
    ink = INK if light else PAPER
    t = TEAL if light else TEAL_DM
    op = "0.36" if light else "0.48"
    return f'''    <path d="M57.92 73.92 A 50.95 50.95 0 0 1 72.92 31.92" stroke="{t}" fill="none" stroke-width="3.15" opacity="{op}" stroke-dasharray="9.5 14" stroke-linecap="round"/>
{k_planes(ink)}
    <circle cx="62.92" cy="36.92" r="3.92" fill="{t}" opacity="0.96"/>'''


def core_e(light: bool) -> str:
    ink = INK if light else PAPER
    acc = BLUE if light else BLUE_DM
    return f'''    <rect fill="{ink}" x="15.5" y="14.5" width="12.65" height="59.95" rx="6.55" ry="6.55"/>
    <path fill="{ink}" d="M28.92 37.92 L71.92 19.92 L71.92 34.92 L43.93 53.95 L31 43.93 Z"/>
    <path fill="{ink}" d="M28.95 46 L71.93 71.93 L71.93 56.93 L43.93 53.95 L31 46 Z"/>
    <circle cx="44.6" cy="53.92" r="2.62" fill="{acc}" opacity="0.96"/>'''


XF_H = dict(b="translate(26,21)", c="translate(26,21)", d="translate(26,21)", e="translate(28.25,21)")
XF_S = dict(b="translate(169,53) scale(2.06)", c="translate(168,52) scale(2.04)", d="translate(169,53) scale(2.07)", e="translate(184,61) scale(2.18)")
XF_TILE = dict(b=(114,117,6), c=(114,117,6), d=(114,117,6), e=(117,117,6))


def horizontal(d: str, light: bool, core_fn):
    body = wm_def(light, False) + "\n"
    body += f"  <g transform=\"{XF_H[d]}\">\n{core_fn(light)}\n  </g>\n"
    body += '  <text class="wm" x="142" y="77">Kontraktus</text>'
    name = "light" if light else "dark"
    (ROOT / f"direction-{d}" / f"logo-horizontal-on-{name}.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} horizontal {name}", 800, 120, body),
        encoding="utf-8",
    )


def stacked(d: str, light: bool, core_fn):
    body = wm_def(light, True) + "\n"
    body += f"  <g transform=\"{XF_S[d]}\">\n{core_fn(light)}\n  </g>\n"
    body += '  <text class="wm" x="220" y="258">Kontraktus</text>'
    name = "light" if light else "dark"
    (ROOT / f"direction-{d}" / f"logo-stacked-on-{name}.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} stacked {name}", 440, 320, body),
        encoding="utf-8",
    )


def square_light(d: str, core_fn):
    x, y, sc = XF_TILE[d]
    inner = core_fn(True)
    body = f'  <g transform="translate({x},{y}) scale({sc})">\n{inner}\n  </g>'
    (ROOT / f"direction-{d}" / "icon-square-on-light.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} app icon light", 512, 512, body),
        encoding="utf-8",
    )


def square_dark(d: str, core_fn):
    x, y, sc = XF_TILE[d]
    inner = core_fn(False)
    body = (
        f'  <rect width="512" height="512" rx="128" fill="#0b0e14"/>\n'
        f'  <g transform="translate({x},{y}) scale({sc})">\n{inner}\n  </g>'
    )
    (ROOT / f"direction-{d}" / "icon-square-on-dark.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} app icon dark", 512, 512, body),
        encoding="utf-8",
    )


def circle(d: str, light_canvas: bool, core_fn):
    x, y, sc = XF_TILE[d]
    bg = (
        '<circle cx="256" cy="256" r="248" fill="#ffffff" stroke="#e9edf7" stroke-width="2"/>'
        if light_canvas
        else '<circle cx="256" cy="256" r="248" fill="#080a10" stroke="#1a2233" stroke-width="2"/>'
    )
    inner = core_fn(light_canvas)
    suf = "light" if light_canvas else "dark"
    body = f"  {bg}\n" f'  <g transform="translate({x},{y}) scale({sc})">\n{inner}\n  </g>'
    (ROOT / f"direction-{d}" / f"icon-circle-on-{suf}.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} circle {suf}", 512, 512, body),
        encoding="utf-8",
    )


def minimal_b() -> str:
    return '''    <path d="M22 76V17.5 M22 47.5 L63.15 76.35 M22 47.5 L63.15 14.95" stroke="#0d0f11" stroke-width="9.85" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="22" cy="47.5" r="5.55" fill="#2f6bff"/>'''


def minimal_c() -> str:
    frames = '''    <rect x="7" y="7" width="66" height="60" rx="11" stroke="#cdd6e8" stroke-width="1.65" fill="none" opacity="0.92"/>
    <rect x="12" y="11" width="66" height="60" rx="10.5" stroke="#b4c2d9" stroke-width="1.35" fill="none" opacity="0.64"/>'''
    return frames + "\n" + k_planes(INK)


def minimal_d() -> str:
    return f'''    <path d="M57.92 73.92 A 50.95 50.95 0 0 1 72.92 31.92" stroke="{TEAL}" fill="none" stroke-width="3.15" opacity="0.36" stroke-dasharray="9.5 14" stroke-linecap="round"/>
{k_planes(INK)}'''


def minimal_e() -> str:
    return (
        '''    <rect fill="#0d0f11" x="15.5" y="14.5" width="12.65" height="59.95" rx="6.55" ry="6.55"/>
    <path fill="#0d0f11" d="M28.92 37.92 L71.92 19.92 L71.92 34.92 L43.93 53.95 L31 43.93 Z"/>
    <path fill="#0d0f11" d="M28.95 46 L71.93 71.93 L71.93 56.93 L43.93 53.95 L31 46 Z"/>'''
    )


def mono_b() -> str:
    return '''    <g transform="translate(26,21)">
    <path d="M22 77V17.5 M22 47.5 L63.15 76.35 M22 47.5 L63.15 14.95" stroke="#000" stroke-width="9.85" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="22" cy="47.5" r="5.55" fill="#000" opacity="0.42"/>
    <circle cx="63.15" cy="76.35" r="4.55" fill="#000" opacity="0.32"/>
    <circle cx="63.15" cy="14.95" r="4.55" fill="#000" opacity="0.24"/>
    <path d="M28.5 71.5 L53.95 61.95" stroke="#000" opacity="0.22" stroke-width="2" stroke-linecap="round"/>
    <circle cx="22" cy="47.5" r="10.4" stroke="#000" opacity="0.12" stroke-width="1.2" fill="none"/>
  </g>'''


def mono_c() -> str:
    return f'''    <g transform="translate(26,21)">
    <rect x="7" y="7" width="66" height="60" rx="11" stroke="#000" stroke-width="1.65" fill="none" opacity="0.16"/>
    <rect x="12" y="11" width="66" height="60" rx="10.5" stroke="#000" stroke-width="1.35" fill="none" opacity="0.13"/>
    <rect x="17" y="15" width="66" height="60" rx="10" stroke="#000" stroke-width="1.05" fill="none" opacity="0.1"/>
{k_planes('#000')}
    <path stroke="#000" opacity="0.24" stroke-width="2.05" stroke-linecap="round" fill="none" d="M19.5 71.95 H53.95"/>
  </g>'''


def mono_d() -> str:
    return f'''    <g transform="translate(26,21)">
    <path d="M57.92 73.92 A 50.95 50.95 0 0 1 72.92 31.92" stroke="#000" fill="none" stroke-width="3.15" opacity="0.22" stroke-dasharray="9.5 14" stroke-linecap="round"/>
{k_planes('#000')}
    <circle cx="62.92" cy="36.92" r="3.92" fill="#000" opacity="0.32"/>
  </g>'''


def mono_e() -> str:
    return '''    <g transform="translate(28.25,21)">
    <rect fill="#000" x="15.5" y="14.5" width="12.65" height="59.95" rx="6.55" ry="6.55"/>
    <path fill="#000" d="M28.92 37.92 L71.92 19.92 L71.92 34.92 L43.93 53.95 L31 43.93 Z"/>
    <path fill="#000" d="M28.95 46 L71.93 71.93 L71.93 56.93 L43.93 53.95 L31 46 Z"/>
    <circle cx="44.6" cy="53.92" r="2.62" fill="#000" opacity="0.35"/>
  </g>'''


def fav(d: str, light: bool, core_fn):
    bg = "#ffffff" if light else "#07090e"
    core = core_fn(light)
    tr = dict(b="5.85,7,0.734", c="7.5,10,0.698", d="9,12,0.67", e="13,18,0.74")[d]
    a, bb, cc = tr.split(",")
    body = (
        f'  <rect width="64" height="64" rx="15" fill="{bg}"/>\n'
        f'  <g transform="translate({a},{bb}) scale({cc})">\n'
        f"{core}\n"
        "  </g>"
    )
    suf = "light" if light else "dark"
    (ROOT / f"direction-{d}" / f"favicon-on-{suf}.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} favicon {suf}", 64, 64, body),
        encoding="utf-8",
    )


MIN_T = dict(
    b="translate(95,117) scale(3.74)",
    c="translate(56,114) scale(3.78)",
    d="translate(58,117) scale(3.68)",
    e="translate(106,129) scale(3.85)",
)


def minimal_file(d: str):
    tpl = MIN_T[d]
    fn = dict(b=minimal_b, c=minimal_c, d=minimal_d, e=minimal_e)[d]()
    body = f'  <g transform="{tpl}">\n{fn}\n  </g>'
    (ROOT / f"direction-{d}" / "icon-only-minimal.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} icon minimal", 320, 320, body),
        encoding="utf-8",
    )


def mono_file(d: str):
    mono = dict(b=mono_b, c=mono_c, d=mono_d, e=mono_e)[d]()
    body = wm_def(True, False) + "\n" + mono + '\n  <text class="wm" x="142" y="77">Kontraktus</text>'
    (ROOT / f"direction-{d}" / "logo-monochrome.svg").write_text(
        wrap(f"Kontraktus Dir {d.upper()} monochrome", 800, 120, body),
        encoding="utf-8",
    )


def emit(d: str, core_fn):
    for light in (True, False):
        horizontal(d, light, core_fn)
        stacked(d, light, core_fn)
        fav(d, light, core_fn)
    square_light(d, core_fn)
    square_dark(d, core_fn)
    circle(d, True, core_fn)
    circle(d, False, core_fn)
    minimal_file(d)
    mono_file(d)


def main():
    emit("b", core_b)
    emit("c", core_c)
    emit("d", core_d)
    emit("e", core_e)
    print("Directions BCDE refreshed.")


if __name__ == "__main__":
    main()
