#!/usr/bin/env bash
# collect_web_code.sh (robust)
# Examples:
#   ./collect_web_code.sh                       # -> web_source_dump.txt
#   ./collect_web_code.sh my_dump.txt           # -> custom file
#   ./collect_web_code.sh --root . my_dump.txt  # -> explicit repo root
#   ./collect_web_code.sh --root /path/to/repo -o dump.txt -v

set -euo pipefail
IFS=$'\n\t'

OUT_FILE="web_source_dump.txt"
ROOT_DIR=""
DEBUG=0

# ---- args ----
while [[ $# -gt 0 ]]; do
  case "$1" in
    --root) ROOT_DIR="${2:-}"; shift 2 ;;
    -o|--out) OUT_FILE="${2:-}"; shift 2 ;;
    -v|--debug) DEBUG=1; shift ;;
    *) OUT_FILE="$1"; shift ;;
  esac
done

# pick root: git root if available, else cwd, else provided --root
if [[ -z "${ROOT_DIR}" ]]; then
  if git_root=$(git rev-parse --show-toplevel 2>/dev/null); then
    ROOT_DIR="$git_root"
  else
    ROOT_DIR="$PWD"
  fi
fi

cd "$ROOT_DIR"

# ---- what to include ----
INCLUDE_DIRS=(
  "app" "src/app"
  "components" "src/components"
  "lib" "src/lib"
  "pages" "src/pages"
  "hooks" "src/hooks"           # present in your aliases
  "server" "src/server"         # common in Next.js apps
  "styles" "src/styles"
)

INCLUDE_FILES=(
  "middleware.ts"
  "next.config.ts"
  "postcss.config.mjs"
  "tailwind.config.ts" "tailwind.config.js"
  "drizzle.config.ts"
  "components.json"
  "package.json"
  "docker-compose.yml"
  "app/globals.css" "src/app/globals.css"
)

EXCLUDE_DIRS=(node_modules .next .git .pnpm dist build coverage .turbo .vercel .eslintcache)

# ---- collect ----
: > "$OUT_FILE"
declare -a files=()

# Walk each target dir; prune bulky dirs; then filter by extension in Bash.
for d in "${INCLUDE_DIRS[@]}"; do
  [[ -d "$d" ]] || continue
  [[ $DEBUG -eq 1 ]] && echo "Scanning $d..."
  while IFS= read -r -d '' f; do
    case "$f" in
      *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|\
      *.css|*.scss|*.sass|\
      *.md|*.mdx|\
      *.json|*.jsonc|*.yml|*.yaml|*.sql|\
      */tsconfig.json)
        files+=( "${f#./}" )
        ;;
    esac
  done < <(
    find "$d" \
      -type d \( -name 'node_modules' -o -name '.next' -o -name '.git' -o -name '.pnpm' -o -name 'dist' -o -name 'build' -o -name 'coverage' -o -name '.turbo' -o -name '.vercel' -o -name '.eslintcache' \) -prune -o \
      -type f -print0
  )
done

# Add explicit top-level files if they exist
for f in "${INCLUDE_FILES[@]}"; do
  [[ -f "$f" ]] && files+=( "$f" )
done

# De-dupe + sort
mapfile -t files < <(printf "%s\n" "${files[@]}" | sort -u)

# Write in the requested format
count=0
for f in "${files[@]}"; do
  # skip binaries (best-effort)
  if grep -Iq . "$f"; then
    printf "%s\n" "$f" >> "$OUT_FILE"
    cat "$f" >> "$OUT_FILE"
    printf "\n\n" >> "$OUT_FILE"
    ((count++)) || true
  fi
done

echo "Wrote $count files to: $OUT_FILE (root: $ROOT_DIR)"

