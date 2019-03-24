const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};
const json = response => response.json();
window.onload = () => fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
  .then(status)
  .then(json)
  .then((data) => {
    const names = data.map(p => p.name);
    names.forEach((arrayElement) => {
      const selOptions = document.createElement('option');
      const selectElem = document.getElementById('repo-select');
      selOptions.innerHTML = arrayElement;
      selOptions.value = arrayElement;
      selectElem.appendChild(selOptions);
    });
    document.getElementById('repo-select').onchange = function popTable() {
      const selectedRepoIndex = document.getElementById('repo-select').selectedIndex;
      document.getElementById('repo-name').innerHTML = data[selectedRepoIndex - 1].name;
      document.getElementById('repo-description').innerHTML = data[selectedRepoIndex - 1].description;
      document.getElementById('repo-forks').innerHTML = data[selectedRepoIndex - 1].forks;
      const time = new Date(data[selectedRepoIndex - 1].updated_at);
      document.getElementById('repo-updated').innerHTML = time.toUTCString();
    };
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Request failed', error);
  });
