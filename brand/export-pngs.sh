#!/usr/bin/env bash
# Rasterize brand SVG assets (requires ImageMagick + SVG delegate).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PNG_DIR="${ROOT}/png"
mkdir -p "${PNG_DIR}"

render() {
  local src="$1" dest="$2" density="$3"
  convert -background none -density "${density}" "${src}" "${dest}"
}

walk_dir() {
  local dir="$1"
  [[ -d "$dir" ]] || return 0
  while IFS= read -r -d '' f; do
    rel="${f#"${ROOT}/"}"
    base="${rel%.svg}"
    out="${PNG_DIR}/${base}"
    mkdir -p "$(dirname "$out")"

    render "$f" "${out}@4x.png" 288
    render "$f" "${out}-2x.png" 144

    bn="$(basename "$f" .svg)"
    case "${bn}" in
      favicon*|icon-square*)
        convert -background none -density 576 "$f" -resize 512x512 "${PNG_DIR}/${base}-512.png"
        convert -background none -density 576 "$f" -resize 180x180 "${PNG_DIR}/${base}-180.png"
        convert -background none -density 384 "$f" -resize 32x32 "${PNG_DIR}/${base}-32.png"
        ;;
    esac
  done < <(find "$dir" -maxdepth 1 -type f -name '*.svg' -print0 2>/dev/null | sort -z)
}

walk_dir "${ROOT}/primary"
if [[ -d "${ROOT}/archive/partner-explorations" ]]; then
  while IFS= read -r -d '' d; do
    walk_dir "$d"
  done < <(find "${ROOT}/archive/partner-explorations" -mindepth 1 -maxdepth 1 -type d ! -name 'scripts' -print0 | sort -z)
fi

echo "Wrote PNGs under ${PNG_DIR}"
