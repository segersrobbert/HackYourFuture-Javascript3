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
    // eslint-disable-next-line no-console
    console.log(names);

    window.onload = (function () { addOptions(); }());
    function addOptions() {
      // eslint-disable-next-line no-undef
      for (let i = names.length - 1; i >= 0; i--) {
        const x = document.getElementById('repo-list');
        const option = document.createElement('option');
        // eslint-disable-next-line no-undef
        option.text = names[i];
        x.add(option, x[0]);
      }
    }
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Request failed', error);
  });
