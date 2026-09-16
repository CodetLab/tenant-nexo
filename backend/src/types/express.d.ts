import "express";

declare global {
  namespace Express {
    interface Request {
      context?: {
        userId?: number;
        profileId?: number;
        appId?: number;
        role?: string;

        email?: string;
        name?: string;
      };
    }
  }
}

export { };