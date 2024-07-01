export default defineEventHandler(async (event) => {


  const config = useRuntimeConfig();
  deleteCookie(event, config.public.authCookieName);
  deleteCookie(event, 'uid');
  deleteCookie(event, 'type');

})
