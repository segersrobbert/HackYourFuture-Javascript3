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
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Request failed', error);
  });
