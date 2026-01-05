export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Login URL - returns dashboard since OAuth is disabled
export const getLoginUrl = () => {
  return "/enquiries";
};
