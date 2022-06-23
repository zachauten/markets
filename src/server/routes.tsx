import { Context, RouteParams, RouterContext, Status } from "../../deps.ts";
import { InitialState } from "./models.ts";

export enum Routes {
  HEALTH = "/api/health",
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
