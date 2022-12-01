const applicationId = 'd78e7f67147305f3042bef05755fa168';
const redirectUri = 'http://localhost:3005/accounts';
export const AuthURL = `https://api.worldoftanks.eu/wot/auth/login/?application_id=${applicationId}&nofollow=0&redirect_uri=${redirectUri}`;
export const playerStatsURL = (account_id) => {
  return `https://api.wotblitz.eu/wotb/account/info/?application_id=${applicationId}&account_id=${account_id}&extra=statistics.rating`
};
export const listOfPlayers = (nickname) => {
  return `https://api.wotblitz.eu/wotb/account/list/?application_id=${applicationId}&search=${nickname}`
}
