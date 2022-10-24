import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// lazy-loaded
const Profile = () => import("./components/Profile")
const BoardAdmin = () => import("./components/BoardAdmin")
const BoardModerator = () => import("./components/BoardModerator")
const BoardUser = () => import("./components/BoardUser")
const routes =  [
    // {
    //   path: "/",
    //   alias: "/cars",
    //   name: "carslist",
    //   component: () => import("./components/CarsList")
    // },
    // {
    //   path: "/car/:id",
    //   name: "car-details",
    //   component: () => import("./components/Car")
    // },
    // {
    //   path: "/add",
    //   name: "add",
    //   component: () => import("./components/Addcar")
    // }

    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: Profile,
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: BoardAdmin,
    },
    {
      path: "/mod",
      name: "moderator",
      // lazy-loaded
      component: BoardModerator,
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: BoardUser,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;