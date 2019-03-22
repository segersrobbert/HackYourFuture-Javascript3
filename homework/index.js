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
    const descr = data.map(p => p.description);
    const forks = data.map(p => p.forks);
    const updated = data.map(p => p.updated_at);
    names.forEach((arrayElement) => {
      const selOptions = document.createElement('option');
      const selectElem = document.getElementById('repo-list');
      selOptions.innerHTML = arrayElement;
      selOptions.value = arrayElement;
      selectElem.appendChild(selOptions);
    });
    document.getElementById('repo-list').onchange = function popTable() {
      const selectedRepoIndex = document.getElementById('repo-list').selectedIndex;
      document.getElementById('name').innerHTML = names[selectedRepoIndex - 1];
      document.getElementById('description').innerHTML = descr[selectedRepoIndex - 1];
      document.getElementById('forks').innerHTML = forks[selectedRepoIndex - 1];
      const time = new Date(updated[selectedRepoIndex - 1]);
      document.getElementById('updated').innerHTML = time.toUTCString();
    };
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Request failed', error);
  });
