const repoSelectElement = document.getElementById('repositories');
const unContainer = document.querySelector('.right__div-username');
const reposContainer = document.querySelector('.right__div-repos');
const avatarContainer = document.querySelector('.right__div-avatar');


const CONTRIBUTORS_URL = async () => {
  const API_CALL = await fetch(
    'https://api.github.com/repos/HackYourFuture/tdd-game/contributors',
  );
  const data = await API_CALL.json();
  return { data };
};
const showContributorsDetails = () => {
  CONTRIBUTORS_URL(repoSelectElement.value).then((response) => {
    unContainer.innerHTML = `username:<span class="right_div-value">${response.data.login}</span>`;
    reposContainer.innerHTML = `Repos:<span class="right_div-value"> ${response.data.repos_url}</span>`;
    avatarContainer.innerHTML = `<span class="right_div-value">${response.data.avatar_url}</span>`;
  });
};
showContributorsDetails();
