import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import EmbeddedPostgres from "embedded-postgres";

const raw = process.env.DATABASE_URL ?? "";
if (!raw) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const url = new URL(raw.replace(/^postgresql:/, "http:"));
const host = url.hostname;
if (host !== "localhost" && host !== "127.0.0.1") {
  console.log("Database host is not local. Embedded Postgres was not started.");
  process.exit(0);
}

const user = decodeURIComponent(url.username);
const password = decodeURIComponent(url.password);
const port = Number(url.port || 5432);
const database = decodeURIComponent(url.pathname.replace(/^\//, ""));
const databaseDir = path.join(process.cwd(), ".data", "pg");

const pg = new EmbeddedPostgres({
  databaseDir,
  user,
  password,
  port,
  persistent: true,
  autoRehydrateSymlinks: true,
  initdbFlags: ["--encoding=UTF8", "--locale=C", "--lc-messages=C"],
});

const ready = path.join(databaseDir, "PG_VERSION");
if (!fs.existsSync(ready)) {
  await pg.initialise();
}

await pg.start();

try {
  await pg.createDatabase(database);
  console.log("Created the application database.");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (!/already exists/i.test(message)) throw error;
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: true });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

await run("npx", ["prisma", "db", "push", "--skip-generate"]);
await run("npx", ["tsx", "prisma/seed.ts"]);
console.log(`Postgres is listening on ${host}:${port}`);

setInterval(() => {}, 1_000_000);
