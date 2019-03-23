const promise = fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
  .then(response => response.json());

function selectRepo() {
  promise.then((data) => {
    data.forEach((i) => {
      const repolist = document.createElement('option');
      const opt = document.createTextNode(i.name);
      repolist.appendChild(opt);
      document.getElementById('repoList').appendChild(repolist);
    });
  });
}
selectRepo();

function myFunction() {
  promise.then((data) => {
    data.forEach((i) => {
      const optionList = document.getElementById('repoList');
      if (optionList.value === i.name) {
        const dispTime = new Date(i.updated_at);
        document.getElementById('repoTitle').innerHTML = i.name;
        document.getElementById('repoDesc').innerHTML = i.description;
        document.getElementById('repoForks').innerHTML = i.forks;
        document.getElementById('repoLastUpdate').innerHTML = dispTime.toUTCString();
      }
    });
  });
}
myFunction();
