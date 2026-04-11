#!/usr/bin/env node

/**
 * Converts the CSV pricing file into src/data/pricing.json
 *
 * CSV columns (0-indexed):
 *   0: Car Make
 *   1: Car Model
 *   2: (empty)
 *   3: Start Year
 *   4: End Year
 *   5: Start Year~End Year
 *   6: Monocarbon         (all sides + back glass)
 *   7: Phantom S5          "
 *   8: CTX                 "
 *   9: IRX                 "
 *  10: FW                  (front windshield)
 *  11: Mono 2F             (front 2 doors only)
 *  12: Phantom S5 2F       "
 *  13: CTX 2F              "
 *  14: IRX 2F              "
 *  15: ALL SIDE+BACK       (code)
 *  16: F.W                 (code)
 *  17: Front Doors         (code)
 */

const fs = require("fs");
const path = require("path");

const CSV_PATH = path.resolve(
  __dirname,
  "../Price List 2026 - \uc790\ub3d9\ucc28 \uac00\uaca9\ud45c.csv"
);
const OUTPUT_PATH = path.resolve(__dirname, "../src/data/pricing.json");

function parseDollar(str) {
  if (!str || typeof str !== "string") return 0;
  // Strip dollar sign, commas, spaces
  const cleaned = str.replace(/[$,\s]/g, "");
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

function parseCSVLine(line) {
  // Simple CSV parser — handles the straightforward format in this file
  // (no quoted fields with commas in this dataset)
  return line.split(",");
}

function main() {
  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = raw.split("\n").filter((l) => l.trim() !== "");

  // Skip header (line 0)
  const dataLines = lines.slice(1);

  const vehicles = [];

  for (const line of dataLines) {
    const cols = parseCSVLine(line);

    const make = (cols[0] || "").trim();
    const model = (cols[1] || "").trim();
    const yearRange = (cols[5] || "").trim();

    // Skip rows with empty make or model
    if (!make || !model) continue;

    const vehicle = {
      make,
      model,
      yearRange,
      allSides: {
        "rayno-monocarbon": parseDollar(cols[6]),
        "rayno-phantom-s5": parseDollar(cols[7]),
        "llumar-ctx": parseDollar(cols[8]),
        "llumar-irx": parseDollar(cols[9]),
      },
      frontOnly: {
        "rayno-monocarbon": parseDollar(cols[11]),
        "rayno-phantom-s5": parseDollar(cols[12]),
        "llumar-ctx": parseDollar(cols[13]),
        "llumar-irx": parseDollar(cols[14]),
      },
      windshield: parseDollar(cols[10]),
    };

    vehicles.push(vehicle);
  }

  // Sort by make, then model, then yearRange
  vehicles.sort((a, b) => {
    if (a.make !== b.make) return a.make.localeCompare(b.make);
    if (a.model !== b.model) return a.model.localeCompare(b.model);
    return a.yearRange.localeCompare(b.yearRange);
  });

  const output = {
    vehicles,
    addons: [
      {
        id: "windshield",
        name: "Llumar Autofit\u00ae Windshield Heat Blocker",
        priceFromData: true,
      },
      { id: "sunroof", name: "Add Sunroof Tint", price: 75 },
      { id: "sunstrip", name: "Add Sunstrip (Visor)", price: 50 },
      { id: "removal", name: "Remove Existing Tint", price: 75 },
    ],
    serviceOptions: [
      { id: "all_sides", label: "All side windows and back glass" },
      { id: "fronts_only", label: "Two front door windows only" },
      { id: "windshield", label: "Add front windshield heat blocker" },
      { id: "sunroof", label: "Add sunroof" },
      { id: "sunstrip", label: "Add sunstrip (visor)" },
      { id: "removal", label: "Removal existing tint" },
      { id: "other", label: "Other" },
    ],
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");

  console.log(`Converted ${vehicles.length} vehicles to ${OUTPUT_PATH}`);
  console.log(
    `Unique makes: ${new Set(vehicles.map((v) => v.make)).size}`
  );
  console.log(
    `Unique year ranges: ${new Set(vehicles.map((v) => v.yearRange)).size}`
  );

  // Quick sanity check: print first vehicle
  console.log("\nFirst vehicle:");
  console.log(JSON.stringify(vehicles[0], null, 2));

  // Print last vehicle
  console.log("\nLast vehicle:");
  console.log(JSON.stringify(vehicles[vehicles.length - 1], null, 2));
}

main();
