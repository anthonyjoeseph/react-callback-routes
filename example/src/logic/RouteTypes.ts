import {
  end,
  int,
  lit,
  Match,
  parse,
  Route as RouteBase,
  zero,
  map,
  Parser,
} from "fp-ts-routing";
import { ofType, unionize, UnionOf } from "unionize";
import { flow } from "fp-ts/lib/function";

export const AppRoute = unionize({
  Home: {},
  Squirrel: {},
  NutError: {},
  TreeError: {},
  NotFound: {}
});
export type AppRoute = UnionOf<typeof AppRoute>;

export const homeDuplex = end;
export const squirrelDuplex = lit("squirrel").then(end);
export const nutErrorDuplex = lit("nutError").then(end);
export const treeErrorDuplex = lit("treeError").then(end);

export const router = zero<AppRoute>()
  .alt(homeDuplex.parser.map(() => AppRoute.Home()))
  .alt(squirrelDuplex.parser.map(() => AppRoute.Squirrel()))
  .alt(nutErrorDuplex.parser.map(() => AppRoute.NutError()))
  .alt(treeErrorDuplex.parser.map(() => AppRoute.TreeError()));

export const parseRoute = (s: string): AppRoute =>
  parse(router, RouteBase.parse(s), AppRoute.NotFound());

export const matchRoute: (r: AppRoute) => string = AppRoute.match({
  Home: () => "Welcome!",
  Squirrel: () => `User ID `,
  NutError: () =>
    `User ID `,
  TreeError: () =>
    `User ID `,
  NotFound: () => "Not found"
});

export const matchRouteString = flow(
  parseRoute,
  matchRoute
);
