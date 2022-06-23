#! /usr/bin/env deno run --allow-net --allow-read --allow-write --allow-env

import { app } from "./src/server/app.ts";

export const port = parseInt(Deno.env.get("PORT")!) || 8080;

async function main() {
  const initial_state = {
    state: {},
  };
  const oak = app(initial_state);
  const controller = new AbortController();
  console.log(`listening on port ${port}`);
  const listen = oak.listen({ port: port });
  controller.abort();
  await listen;
  // Cleanup here, close db connections, etc.
  console.log("Shutting down...");
}
await main();
