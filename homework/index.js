const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

const json = response => response.json();

// fetching api and onload when page load
window.onload = () => fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
  .then(status)
  .then(json)
  .then((data) => {
    // eslint-disable-next-line no-console
    console.log('Data gotten succesfully', data);
    const names = data.map(p => p.name);
    const descr = data.map(p => p.description);
    const forks = data.map(p => p.forks);
    const updated = data.map(p => p.updated_at);
    // eslint-disable-next-line no-console
    names.forEach((arrayElement) => {
      const selOptions = document.createElement('option');
      const selectElem = document.getElementById('repo-list');
      selOptions.innerHTML = arrayElement;
      selOptions.value = arrayElement;
      selectElem.appendChild(selOptions);
    });
    const detailsArray = [];
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const des = descr[i];
      const fork = forks[i];
      const update = updated[i];
      detailsArray.push({
        name,
        des,
        fork,
        update,
      });
    }
    document.getElementById('repo-list').onchange = function popTable() {
      const selectedRepoIndex = document.getElementById('repo-list').selectedIndex;
      const nameRow = document.getElementById('name');
      let rowCount = document.getElementById('name').cells.length;
      console.log(rowCount);
      // if (rowCount >= 1) { nameRow.deleteCell(1); }
      const cell1 = document.getElementById('name').insertCell();
      cell1.innerHTML = detailsArray[selectedRepoIndex - 1].name;
    };
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Request failed', error);
  });
