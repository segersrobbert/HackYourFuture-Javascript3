const dropDown = document.getElementById('dropDown');

const listArray = [];

const promise = fetch(
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=100',
);

promise
  .then(newData => newData.json())
  .then((data) => {
    let listItem;
    for (let i = 0; i < data.length; i++) {
      listItem = document.createElement('option');
      listItem.text = data[i].name;
      dropDown.add(listItem);
      listArray[i] = data[i];
    }
  });
console.log(listArray);
function reload() {
  listArray.forEach((i) => {
    if (dropDown.value === i.name) {
      const dispTime = new Date(i.updated_at);
      document.getElementById('repoName').innerHTML = i.name;
      document.getElementById('repoDescr').innerHTML = i.description;
      document.getElementById('repoForks').innerHTML = i.forks;
      document.getElementById('repoUpdate').innerHTML = dispTime.toUTCString();
    }
  });
}
