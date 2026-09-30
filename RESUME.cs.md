---
schema_version: 5
type: library
file_count: 46
delete_recommendation_percent: 5
generated_date: 2026-09-30
generated_time: 16:43:40
github_origin: no
github_source_url: 
first_commit_date: 2026-06-08
last_commit_date: 2026-09-24
commit_count: 14
---

## Description

NPM knihovna `@sunamo/sunodejs` (TypeScript) s Node-only utilitami, které nelze bundlovat do webové části Electron aplikací: práce se soubory (FS, TF), spouštění příkazů (ProcessUtils), cesty appdat, vzdálený a souborový logger konzole a URL pomocníci. Slouží jako samostatný balíček oddělující Node část od webové (renderer) části aplikací. Vzniklo přejmenováním z `sunode`.

## Původ zdrojáků

Staženo z GitHubu: **ne** — vlastní knihovna, pouze publikovaná v účtu sunamo.

- Ověřeno: origin je github.com/sunamo/sunodejs, 17 commitů (smutekutek, Radek Jančík) od 2026-06-08 (`initial: sunodejs (renamed from sunode)`), přečten `readme.txt` (vlastní zadání v češtině), package.json a exporty v `src/` (vlastní funkce s odkazem na vlastní appdata a CjPositions); gh search neprováděn, kód je vlastní a specifický.

## Doporučení ke smazání

Doporučení ke smazání: **5 %** — malá vlastní sdílená knihovna, ale používaná jako submodul v jiných appkách (např. english-line-by-line).

- Používá se jako submodul v `english-line-by-line` a package.json má skript pro publikaci na npm.
- Repo je malé (46 souborů včetně přeloženého `lib/`), poslední obsahová změna 2026-08-22.
- Smazání by rozbilo submoduly, které na něj míří.

## Historie commitů

- První commit: 2026-06-08
- Poslední commit: 2026-09-24
- Celkem commitů: 14

- Počítá se bez commitů, které jen generovaly RESUME.cs.md nebo README.md.
