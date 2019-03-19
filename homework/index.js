function getPromise() {
  let ret = fetch("https://api.github.com/orgs/HackYourFuture/repos?per_page=100")
    .then((response) => {
      return response.json()
    })
  console.log("End of getPromise")
  return ret
}


function populate(Prom) {
  console.log("sabs")
  let selectContent = document.getElementById("liste").value;
  Prom.then((result) => {
    for (x of result) {
      if (x.name === selectContent) {
        document.getElementById("affiche").innerHTML = `
         <b>Repository :</b>   <a href="">${x.name} </a><br>
          <b>Descripion :</b>   ${x.description} <br>
          <b>Forks :</b>   ${x.forks} <br>
          <b>Updated :</b>   ${new Date(x.updated_at).toLocaleString('en-US')} <br>`;

      }
    }
  })
}




function loadPage(Prom) {

  Prom.then((result) => {
    let res = [];
    let myres = ""

    // make an array of all the names 

    for (x of result) {
      res.push(x.name)
    }

    //  populate the select with the elements in the array

    res.map((x) => {
      var node = document.createElement("OPTION");
      var textnode = document.createTextNode(x);
      node.appendChild(textnode);
      document.getElementById("liste").appendChild(node);

    })

    // populate the div according to the selected item
    // this code is here to ensure the caracteristics of the default value are printed
    // after this action will be handled by the populate function when the value of the section is changed

    let selectContent = document.getElementById("liste").value;
    for (x of result) {

      if (x.name === selectContent) {
        document.getElementById("affiche").innerHTML = `
          <b>Repository :</b>   <a href="">${x.name} </a><br>
          <b>Descripion :</b>   ${x.description} <br>
          <b>Forks :</b>   ${x.forks} <br>
          <b>Updated :</b>   ${new Date(x.updated_at).toLocaleString('en-US')} <br>

          `
      }
    }

    console.log("End of loadPage");
  })
}
let x = "test"
const Prom = getPromise()
loadPage(Prom);
document.getElementById("liste").addEventListener('change', function () {
  populate(Prom);
})





