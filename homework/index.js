const repositories = document.getElementById('repositories');
const reposContainer = document.querySelector('.repos');
// const clientId = '1ebd35cdc9277ed1ee8c';
// const clientSecret = '0ecdc67b56e4ca7c3b4710b60f135d52a8f11a32';
const fetchRepo = async () => {
  // const apiCall = await fetch(`https://api.github.com/users/${user}?clientId=${clientId}&clientSecret=${clientSecret}`);
  const apiCall = await fetch('https://api.github.com/HackYourFuture/repos?per_page=100');

  const data = await apiCall.json();
  return data;
};
const showData = () => {
  fetchRepo().then((repository) => {
    reposContainer.innerHTML = `Repos:<span class = "main_profile">${repository}</span>`;
  });
};
showData();

const repositoryNames = repositories.map(r => r.name);

// eslint-disable-next-line no-undef
Console.log(repositoryNames);
