import { createTRPCRouter } from "~/server/api/trpc";
import { fileRouter } from "./routers/files";
import { messageRouter } from "./routers/messages";
import { onboardingRouter } from "./routers/onboarding";
import { projectRouter } from "./routers/projects";

import { subjectRouter } from "./routers/subjects";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  subject: subjectRouter,
 file:fileRouter,
 message: messageRouter,
 onboarding: onboardingRouter,
project:projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
