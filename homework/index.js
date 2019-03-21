// Get the drop down list

const dropDown = document.getElementById('dropDown');

// Fetch data

const promise = fetch(
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=100',
);

// Fill the drop down list with repo names

promise
  .then(newData => newData.json())
  .then((data) => {
    let listItem;
    for (let i = 0; i < data.length; i++) {
      listItem = document.createElement('option');
      listItem.text = data[i].name;
      dropDown.add(listItem);
    }
  });
