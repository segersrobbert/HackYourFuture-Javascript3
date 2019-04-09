let repositories;
async function getPromise() {
  const res = await fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100');
  return res.json();
}

const myPromise = getPromise(); // Set the promise as a global variable

async function selectedRepoCaracteristics(selectValue) {
  const result = await myPromise;
  result.forEach((x) => {
    if (x.name === selectValue) {
      document.getElementById('repoCaracteristics').innerHTML = `
         <b>Repository :</b>   <a href="">${x.name} </a><br>
          <b>Descripion :</b>   ${x.description} <br>
          <b>Forks :</b>   ${x.forks} <br>
          <b>Updated :</b>   ${new Date(x.updated_at).toLocaleString('en-US')} <br>`;
    }
  });
}


function showContributors(list) {
  // document.getElementById('repoContributors').removeChild();
  let cont = '<ul class="list-group">';
  list.forEach((item) => {
    // cont += `<li>${item.avatar_url}</li>`
    cont += `<li class="list-group-item"><a href="${item.html_url}" target="_blank">${item.login}</a></li>`;
  });
  cont += '</ul>';
  document.getElementById('repoContributors').innerHTML = cont;
}

async function listcontributors(url) {
  const response = await fetch(url);
  const data = await response.json();
  showContributors(data);
}

async function selectedRepoContributors(selectValue) {
  const result = myPromise;
  const data = await result;
  data.forEach(async (x) => {
    if (x.name === selectValue) {
      await listcontributors(x.contributors_url);
    }
  });
}

async function loadPage() {
  const result = myPromise;
  const data = await result;
  // Make an array of all the names
  const nameArray = data.map(item => item.name);
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
}

loadPage();
document.getElementById('mySelect').addEventListener('change', () => {
  // eslint-disable-next-line no-undef
  selectedRepoCaracteristics(mySelect.value);
  // eslint-disable-next-line no-undef
  selectedRepoContributors(mySelect.value);
});
