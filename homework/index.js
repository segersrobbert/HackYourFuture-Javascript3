const inputValue = document.querySelector('#search');
const searchButton = document.querySelector('.searchButton');
const reposContainer = document.querySelector('.main__profile-repos');
// const clientId = '1ebd35cdc9277ed1ee8c';
// const clientSecret = '0ecdc67b56e4ca7c3b4710b60f135d52a8f11a32';
const fetchRepo = async () => {
  // const apiCall = await fetch(`https://api.github.com/users/${user}?clientId=${clientId}&clientSecret=${clientSecret}`);
  const apiCall = await fetch('https://api.github.com/HackYourFuture/repos?callback=?');

  const data = await apiCall.json();
  return {
    data,
  };
};

const showData = () => {
  fetchRepo(inputValue.value).then((res) => {
    reposContainer.innerHTML = `Repos:<span class = "main_profile">${res.data.public_repos}</span>`;
  });
};

searchButton.addEventListener('click', () => {
  showData();
});
