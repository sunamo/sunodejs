---
schema_version: 11
type: npmjs
category_override: none
file_count: 46
file_extensions: ts:23, js:14, json:4, md:2, noext:2, txt:1, yaml:1
file_extensions_updated: 2026-10-04
avg_lines_per_file: 117
total_lines: 1683
metrics_lm: 2026-10-01 16:40:42
move_to_legacy_percent: 5
description_updated: 2026-10-01
links_updated: 2026-10-01
github_source_url: not found
origin_status: found
origin_checked: 2026-10-01
article_source_url: not run
article_status: pending
article_checked: not run
last_build_ok: yes
last_build_date: 2026-10-02
last_tests_run_date: not run
covered_lines: 0
---

## Description

NPM knihovna `@sunamo/sunodejs` (TypeScript) s Node-only utilitami, které nelze bundlovat do webové části Electron aplikací: práce se soubory (FS, TF), spouštění příkazů (ProcessUtils), cesty appdat, vzdálený a souborový logger konzole a URL pomocníci. Slouží jako samostatný balíček oddělující Node část od webové (renderer) části aplikací. Vzniklo přejmenováním z `sunode`.

## Původ zdrojáků

Staženo z GitHubu: **ne** — vlastní knihovna, pouze publikovaná v účtu sunamo.

- Ověřeno: origin je github.com/sunamo/sunodejs, 17 commitů (smutekutek, Radek Jančík) od 2026-06-08 (`initial: sunodejs (renamed from sunode)`), přečten `readme.txt` (vlastní zadání v češtině), package.json a exporty v `src/` (vlastní funkce s odkazem na vlastní appdata a CjPositions); gh search neprováděn, kód je vlastní a specifický.

## Doporučení přesunu do legacy

Doporučení přesunu do sunamocz-legacy.visualstudio.com: **5 %** — malá vlastní sdílená knihovna, ale používaná jako submodul v jiných appkách (např. english-line-by-line).

- Používá se jako submodul v `english-line-by-line` a package.json má skript pro publikaci na npm.
- Repo je malé (46 souborů včetně přeloženého `lib/`), poslední obsahová změna 2026-08-22.
- Smazání by rozbilo submoduly, které na něj míří.

## Vazby na moje repa

- Submoduly: žádné
- ProjectReference / PackageReference: žádné
