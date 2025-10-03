// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect API routes
    "/api/(.*)",
    // (Optional) protect app routes
    "/dashboard(.*)",
  ],
};
