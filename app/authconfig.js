export const authConfig = {
  providers:[],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnNews = request.nextUrl.pathname.startsWith("/news");
      if (isOnNews) {
         return true;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/news", request.nextUrl));
      }
      return true;
    },
  },
};
