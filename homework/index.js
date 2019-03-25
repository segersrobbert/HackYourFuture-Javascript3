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
      fetch(data[selectedRepoIndex - 1].contributors_url)
        .then(status)
        .then(response => response.json())
        .then((data) => {
          document.getElementById('snipper').style.visibility = 'visible';
          const contributors = data;
          const mylist = document.getElementById('contributor-list');
          const lis = mylist.getElementsByTagName('li');
          while (lis.length > 0) {
            mylist.removeChild(lis[0]);
          }
          contributors.forEach((person) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('class', 'contributor-item');
            listItem.setAttribute('aria-label', person.login);
            listItem.innerHTML = `<img src="${person.avatar_url}" width="50" height="50" alt="avatar"><div class="contributor-data"><div>${person.login}</div><div class="contributor-badge">${person.contributions}</div></div>`;
            document.getElementById('contributor-list').appendChild(listItem);
          });
        })
        .catch((error) => {
          console.log('Request failed', error);
        })
        .then(() => {
          document.getElementById('snipper').style.visibility = 'hidden';
        });
    };
  });

