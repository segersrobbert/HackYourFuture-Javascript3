const unContainer = document.querySelector('.username');
const reposContainer = document.querySelector('.repos');
const avatarContainer = document.querySelector('.avatar');
const repoSelectElement = document.getElementById('repositories');
const REPOSITORIES_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
let repositories;

function populateSelectList() {
  repositories.forEach((r) => {
    const optionElement = document.createElement('option');

    optionElement.text = r.name;

    optionElement.value = r.name;

    repoSelectElement.add(optionElement);
  });
}

function showSelectedRepoDetails() {
  // Account for the first 'Please choose...' option

  const selectedIndex = repoSelectElement.selectedIndex - 1;

  if (selectedIndex < 0) return; // Don't do anything upon selecting the 'Please choose...' option
  const selectedRepo = repositories[selectedIndex];
  document.getElementById('repo-name').innerHTML = selectedRepo.name;
  document.getElementById('repo-description').innerHTML = selectedRepo.description;
  document.getElementById('repo-forks').innerHTML = selectedRepo.forks;
  const updateDate = new Date(selectedRepo.updated_at);
  const date = updateDate.toLocaleDateString();
  const time = updateDate.toLocaleTimeString();
  document.getElementById('repo-updated').innerHTML = `${date} ${time}`;
}
const getContributors = async () => {
  const API_CALL = await fetch(
    'https://api.github.com/repos/HackYourFuture/tdd-game/contributors',
  );
  const data = await API_CALL.json();
  return {
    selectedIndex: data,
  };
};
const showContributorsDetails = () => {
  getContributors(getContributors.value).then((response) => {
    unContainer.innerHTML = `username:<span class="right_div-value">${
      response.data.login
    }</span>`;
    reposContainer.innerHTML = `Repos:<span class="right_div-value"> ${
      response.data.repos_url
    }</span>`;
    avatarContainer.innerHTML = `<span class="right_div-value">${
      response.data.avatar_url
    }</span>`;
  });
};
window.onload = () => {
  fetch(REPOSITORIES_URL)
    .then(response => response.json())

    .then((data) => {
      repositories = data;
      populateSelectList();

      showSelectedRepoDetails();
      showContributorsDetails();
    });
};
repoSelectElement.onchange = showSelectedRepoDetails;
