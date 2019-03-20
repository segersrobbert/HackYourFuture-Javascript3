function getPromise() {
  const ret = fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
    .then(response => response.json());
  return ret;
}


function populate(Prom) {
  const selectContent = document.getElementById('liste').value;
  Prom.then((result) => {
    result.forEach((x) => {
      if (x.name === selectContent) {
        document.getElementById('show').innerHTML = `
         <b>Repository :</b>   <a href="">${x.name} </a><br>
          <b>Descripion :</b>   ${x.description} <br>
          <b>Forks :</b>   ${x.forks} <br>
          <b>Updated :</b>   ${new Date(x.updated_at).toLocaleString('en-US')} <br>`;
      }
    });
  });
}


function loadPage(Prom) {
  Prom.then((result) => {
    const nameArray = [];
    // make an array of all the names

    result.forEach((item) => {
      nameArray.push(item.name);
    });
    //  populate the select with the elements in the array

    nameArray.forEach((x) => {
      const node = document.createElement('OPTION');
      const textnode = document.createTextNode(x);
      node.appendChild(textnode);
      document.getElementById('liste').appendChild(node);
    });

    // populate the div according to the selected item
    // this code is here to ensure the caracteristics of the default value are printed
    // after this action will be handled by the populate function
    // when the value of the section is changed

    const selectContent = document.getElementById('liste').value;

    result.forEach((x) => {
      if (x.name === selectContent) {
        document.getElementById('show').innerHTML = `
          <b>Repository :</b>   <a href="">${x.name} </a><br>
          <b>Descripion :</b>   ${x.description} <br>
          <b>Forks :</b>   ${x.forks} <br>
          <b>Updated :</b>   ${new Date(x.updated_at).toLocaleString('en-US')} <br>
          `;
      }
    });
  });
}
const myPromise = getPromise();
loadPage(myPromise);
document.getElementById('liste').addEventListener('change', () => {
  populate(myPromise);
});
