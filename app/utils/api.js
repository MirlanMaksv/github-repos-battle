import axios from "axios";

const id = "";
const secret = "";
const params = `?client_id=${id}&client_secret=${secret}`;

const getProfile = username => {
  return axios
    .get(`https://api.github.com/users/${username}${params}`)
    .then(response => response.data);
};

const getRepos = username => {
  return axios
    .get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then(response => response.data);
};

const getStarCount = repos => {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
};

const calculateScore = (profile, repos) => {
  let { followers } = profile;
  let totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
};

const handleError = e => {
  console.log(e);
};

const getUserData = player => {
  return Promise.all([getProfile(player), getRepos(player)]).then(([profile, repos]) => {
    return {
      profile,
      score: calculateScore(profile, repos)
    };
  });
};

const sortPlayers = players => {
  return players.sort((a, b) => b.score - a.score);
};

export const fetchPopularRepos = language => {
  var encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repository`
  );

  return axios.get(encodedURI).then(response => response.data.items);
};

export const battle = players => {
  return Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
};
