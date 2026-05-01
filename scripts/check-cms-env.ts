import { groupEnvItems, loadLocalEnv, requiredCmsKeys, statusFor } from "./cms-utils";

loadLocalEnv();

console.log("MorePower2You CMS environment check");
console.log("Secrets are never printed by this command.\n");

const grouped = groupEnvItems();

for (const [group, items] of Object.entries(grouped)) {
  if (!items.length) continue;
  console.log(group);

  for (const item of items) {
    const status = statusFor(item.key) ? "set" : "missing";
    console.log(`  [${status}] ${item.key} - ${item.requiredFor}`);
  }

  console.log("");
}

const missingRequired = requiredCmsKeys().filter((key) => !statusFor(key));

if (missingRequired.length) {
  console.log("Required before seeding Sanity:");
  for (const key of missingRequired) {
    console.log(`  - ${key}`);
  }
  console.log("\nRun `npm run cms:key-guide` for the exact click path to get each value.");
  process.exitCode = 1;
} else {
  console.log("Sanity seed/admin keys are present. You can run `npm run cms:seed`.");
}
