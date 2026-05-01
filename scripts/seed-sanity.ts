import { createClient } from "@sanity/client";
import { loadLocalEnv, requiredCmsKeys, statusFor } from "./cms-utils";
import { seedDocuments } from "../src/sanity/seed/seedContent";

loadLocalEnv();

const dryRun = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

function countByType() {
  return seedDocuments.reduce<Record<string, number>>((counts, doc) => {
    counts[doc._type] = (counts[doc._type] || 0) + 1;
    return counts;
  }, {});
}

function printSummary() {
  console.log(`Prepared ${seedDocuments.length} Sanity documents.\n`);
  for (const [type, count] of Object.entries(countByType()).sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`  ${type}: ${count}`);
  }

  console.log("\nFirst documents:");
  for (const doc of seedDocuments.slice(0, 8)) {
    console.log(`  - ${doc._id} (${doc._type})`);
  }
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function main() {
  printSummary();

  if (dryRun) {
    console.log("\nDry run only. No Sanity project was modified.");
    return;
  }

  const missingRequired = requiredCmsKeys().filter((key) => !statusFor(key));
  if (missingRequired.length) {
    throw new Error(`Missing required Sanity env vars: ${missingRequired.join(", ")}. Run npm run cms:key-guide for steps.`);
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2025-01-01",
    useCdn: false,
  });

  for (const docs of chunk(seedDocuments, 50)) {
    let transaction = client.transaction();
    for (const doc of docs) {
      transaction = transaction.createOrReplace(doc);
    }
    await transaction.commit();
  }

  console.log(`\nSeeded ${seedDocuments.length} documents into Sanity project ${projectId}, dataset ${dataset}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
