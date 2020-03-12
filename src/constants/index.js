export const API_BASE_URL =
  'http://ec2-13-125-52-52.ap-northeast-2.compute.amazonaws.com';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://daily-mission.com/oauth2/redirect';

export const GOOGLE_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const NAVER_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
