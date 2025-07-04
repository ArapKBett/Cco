# Crypto Casino Case Opening

A web-based case opening game featuring real-world luxury items.

## Project Structure
- `/cases/`: JSON files for 50 cases (auto-generated).
- `/images/`: 150x150px transparent PNGs for items (manual addition).
- `/src/`: Frontend source code.
- `/server/`: Node.js server files.
- `generate_cases.js`: Script to generate cases.
- `package.json`: Root project configuration.

## Setup
1. Install Node.js: `pkg install nodejs` (Termux).
2. Install dependencies: `npm install`.
3. Generate cases: `npm run generate`.
4. Add images to `/images/` (150x150px, transparent PNGs).
5. Start server: `npm run start:dev`.
6. Open `http://127.0.0.1:8080/` in a browser.

## Usage
- Select a case and click "Open Case" to reveal a random item.
- A probability chart updates with each open.

## Notes
- Images must be manually sourced or generated.
- Date created: July 04, 2025, 12:02 PM EAT..
