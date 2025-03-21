import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/home.tsx"),
  ]),
] satisfies RouteConfig;
