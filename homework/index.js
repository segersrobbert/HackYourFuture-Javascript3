function getPromise() {
  return fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
    .then(response => response.json());
}
const myPromise = getPromise();
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
  });
}

loadPage();
document.getElementById('mySelect').addEventListener('change', () => {
  // eslint-disable-next-line no-undef
  selectedRepoCaracteristics(mySelect.value);
});
