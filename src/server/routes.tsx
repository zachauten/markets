import { RouteParams, RouterContext, Status } from "../../deps.ts";
import { InitialState } from "./models.ts";

export enum Routes {
  HEALTH = "/api/health",
  INDEX = "/",
  EXAMPLE = "/api/example",
}
type example_ctx = RouterContext<
  Routes.EXAMPLE,
  RouteParams<Routes.EXAMPLE>,
  InitialState
>;

export function add_person(
  ctx: example_ctx,
) {
  ctx.response.status = Status.OK;
}

export async function index(ctx: RouterContext<Routes.INDEX, RouteParams<Routes.INDEX>, InitialState>, next: () => Promise<unknown>) {
    await ctx.send({
      root: `${Deno.cwd()}/src/client`,
      index: "index.html",
    });
}
