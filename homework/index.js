let repositories//repositories
let selectList = document.getElementById('repo-select');
//console.log(loaded) can load the page
window.onload = fuction() {
  console.log(loaded);
}
const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: response.status, statusText: response.statusText });
  })
  // eslint-disable-next-line no-console
  .then(response) console.log(res))
  .then(response => response.json())
repositories = data;
populateSelectList();
selectIndex(0)
  .then((post) => {
    // eslint-disable-next-line no-console
    console.log('success', post);
  })
function populateSelectList(){
  repositories

    .forEach(r => {
  const optionElement = document.createElement('option');
  optionElement.text = r.name;
  optionElement.value = r.name;
  selectList.add(optionElement);

    });
  }
function selectIndex(index) {
  selectList.selectedIndex = (Index + 1);
}
function showSelectRepoDetails({
  const selectedIndex = selectList.selectedIndex - 1;
  const selectedRepo = repositories[selectedIndex];
  document.getElementById("repo-name").innerHTML = selectedRepo.name;
document.getElementById(repo - description').innerHTML = selectedRepo.description;
document.getElementById('repo-forks').innerHTML = selectedRepo.forks;

const updateDate = new Date(selectRepo.upate_at);
const date = 
  })
  })
  // eslint-disable-next-line no-console
  .catch(err => console.log('Error, with message:', err.statusText));

/* const condition = true; // your condition
if (condition) {
  const theSelect = document.getElementById('val');
  const options = theSelect.getElementsByTagName('OPTION');
  for (let i = 0; i < options.length; i++) {
    if (options[i].innerHTML === 'alumni' || options[i].innerHTML === 'angular') {
      theSelect.removeChild(options[i]);
      i--; // options have now less element, then decrease i
    }
  }
}
*/
