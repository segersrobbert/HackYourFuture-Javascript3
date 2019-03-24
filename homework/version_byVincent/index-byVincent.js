let repositories;
const selectList = document.getElementById('repo-select');

function populateSelectList() {
  repositories
    .forEach((r) => {
      const optionElement = document.createElement('option');
      optionElement.text = r.name;
      optionElement.value = r.name;
      selectList.add(optionElement);
    });
}

function selectIndex(index) {
  selectList.selectedIndex = (index + 1);
}

function showSelectedRepoDetails() {
  const selectedIndex = selectList.selectedIndex - 1;
  const selectedRepo = repositories[selectedIndex];
  document.getElementById('repo-name').innerHTML = selectedRepo.name;
  document.getElementById('repo-description').innerHTML = selectedRepo.description;
  document.getElementById('repo-forks').innerHTML = selectedRepo.forks;

  const updateDate = new Date(selectedRepo.updated_at);
  const date = updateDate.toLocaleDateString();
  const time = updateDate.toLocaleTimeString();

  document.getElementById('repo-updated').innerHTML = `${date} ${time}`;
}

window.onload = () => {
  fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
    .then(response => response.json())
    .then((data) => {
      repositories = data;

      populateSelectList();
      selectIndex(0);
      showSelectedRepoDetails();
    });
};

selectList.onchange = showSelectedRepoDetails;
