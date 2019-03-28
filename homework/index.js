window.onload = () => {
  // eslint-disable-next-line no-console
  console.log('window loaded');
};

const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

let repositories;
const selectList = document.getElementById('repo-selector');

function populateSelList() {
  repositories

    .forEach((r) => {
      const optionElement = document.createElement('option');
      optionElement.text = r.name;
      optionElement.value = r.name;
      selectList.add(optionElement);
    });
}


function displaySelectedInfo() {
  const selectedIndex = selectList.selectedIndex - 1;
  if (selectedIndex < 0) return;

  const selectedRepo = repositories[selectedIndex];

  document.getElementById('repo-name').innerHTML = selectedRepo.name;
  document.getElementById('repo-description').innerHTML = selectedRepo.description;
  document.getElementById('repo-forks').innerHTML = selectedRepo.forks;

  const updateDate = new Date(selectedRepo.updated_at);
  const date = updateDate.toLocaleDateString();
  const time = updateDate.toLocaleTimeString();

  document.getElementById('repo-updated').innerHTML = `${date} ${time}`;
}


fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Server can't be reached!");
  })

  .then((data) => {
    // eslint-disable-next-line no-console
    console.log('Request succeed', data);
    repositories = data;

    populateSelList();
    displaySelectedInfo();
  })

  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('"error fetching data"', error);
  });


selectList.onchange = displaySelectedInfo;
