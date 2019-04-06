let repositories;
function getPromise() {
  return fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
    .then(response => response.json());
}
const myPromise = getPromise(); // Set the promise as a global variable

function selectedRepoCaracteristics(selectValue) {
  myPromise.then((result) => {
    result.forEach((x) => {
      if (x.name === selectValue) {
        document.getElementById('repoCaracteristics').innerHTML = `
         <b>Repository :</b>   <a href="">${x.name} </a><br>
          <b>Descripion :</b>   ${x.description} <br>
          <b>Forks :</b>   ${x.forks} <br>
          <b>Updated :</b>   ${new Date(x.updated_at).toLocaleString('en-US')} <br>`;
      }
    });
  });
}


function showContributors(list) {
  // document.getElementById('repoContributors').removeChild();
  let cont = '<ul class="list-group">';
  list.forEach((item) => {
    console.log(item)
    // cont += `<li>${item.avatar_url}</li>`
    cont += `<li class="list-group-item"><a href="${item.html_url}" target="_blank">${item.login}</a></li>`;
  });
  cont += '</ul>';
  document.getElementById('repoContributors').innerHTML = cont;
}

function selectedRepoContributors(selectValue) {
  myPromise.then((result) => {
    result.forEach((x) => {
      if (x.name === selectValue) {
        console.log(x.contributors_url);
        fetch(x.contributors_url)
          .then(response => response.json())
          .then(data => showContributors(data));
      }
    });
  });
}

function loadPage() {
  myPromise.then((result) => {
    // Make an array of all the names
    const nameArray = result.map(item => item.name);
    // Fill the select with the elements in the array
    nameArray.forEach((x) => {
      const node = document.createElement('option');
      const textnode = document.createTextNode(x);
      node.appendChild(textnode);
      document.getElementById('mySelect').appendChild(node);
    });
    // Show the caracteristics of the default value of the select
    const selectValue = document.getElementById('mySelect').value;
    selectedRepoCaracteristics(selectValue);
    selectedRepoContributors(selectValue);
  });
}

loadPage();
document.getElementById('mySelect').addEventListener('change', () => {
  // eslint-disable-next-line no-undef
  selectedRepoCaracteristics(mySelect.value);
  selectedRepoContributors(mySelect.value);
});
