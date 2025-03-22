import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/landing.tsx"),
    route("/test", "routes/test.tsx"),
    route("/swipe", "routes/swipe.tsx"),
    route("/map", "routes/home.tsx"),
  ]),
] satisfies RouteConfig;
