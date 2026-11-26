// 1. Access global TypeScript definitions across the whole project
declare global {
  // 2. Open Express's existing type namespace
  namespace Express {
    // 3. Add custom properties to Express's built-in Request interface
    interface Request {
      // Attached by isAuth after looking up the user in the database
      user?: {
        id: string;
      };
      // Attached by isAuth from the decoded JWT so /logout knows which token (jti) to revoke
      auth?: {
        userId: string;
        jti: string;
        exp: number;
      };
    }
  }
}

// 4. Required dummy export so TypeScript treats this file as a module (needed for `declare global`)
export {};
