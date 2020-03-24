export const API_BASE_URL = 'https://api.daily-mission.com';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'https://daily-mission.com/oauth2/redirect';

export const GOOGLE_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const GITHUB_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const NAVER_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
