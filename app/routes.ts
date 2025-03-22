import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/home.tsx"),
    route("/test", "routes/test.tsx"),
    route("/swipe", "routes/swipe.tsx"),
    route("/landing", "routes/landing.tsx"),
  ]),
] satisfies RouteConfig;
