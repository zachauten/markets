#! /usr/bin/env deno run --allow-net --allow-env
import { port } from "./main.ts";

try {
  await fetch(`http://host.docker.internal:${port}/health`);
} catch (err) {
  console.error(err);
  Deno.exit(1);
}
