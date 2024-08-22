export {default} from "next-auth/middleware";

// protect all the routes

export const config = {
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites",
  ]
};