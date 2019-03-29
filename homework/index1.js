const REPOSITORIES_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
// const CONTRIBUTORS_URL = 'https://api.github.com/repos/HackYourFuture/tdd-game/contributors';
let repositories;
const repoSelectElement = document.getElementById('repositories');
// const contributorElement = document.getElementById('contributorElements');


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

/* const showContributorsDetails = () => {
  CONTRIBUTORS_URL().then((response) => {
    contributorElement.innerHTML = `username:${response.data.login}`;
  });
}; */

window.onload = () => {
  fetch(REPOSITORIES_URL)
    .then(response => response.json())

    .then((data) => {
      repositories = data;

      /* fetch(CONTRIBUTORS_URL)
        .then(response => response.json()); */


      populateSelectList();

      showSelectedRepoDetails();
      //  showContributorsDetails();
    });
};


repoSelectElement.onchange = showSelectedRepoDetails;
