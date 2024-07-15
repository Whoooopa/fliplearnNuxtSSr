export default defineEventHandler(async (event) => {
  // this can be called upon ssr and when fetching API
  // ssr routing is already handled by middleware outside server, so using this for API auth
  const typeCookie = getCookie(event, 'type')
  const pathname = getRequestURL(event).pathname;
  if (pathname.startsWith('/api')){
    if (pathname.includes('teacher') && typeCookie != "teacher") {
      throw createError({
        status: 401,
        statusMessage: "Unauthorized",
        message: "Account type not permitted to access this resource",
      });
    }

    if (pathname.includes('student') && typeCookie != "student") {
      throw createError({
        status: 401,
        statusMessage: "Unauthorized",
        message: "Account type not permitted to access this resource",
      });
    }

    
  }
})
