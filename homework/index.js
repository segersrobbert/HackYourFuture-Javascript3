const API_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

class Repository {
  constructor(name) {
    this.name = name;
  }


  logName = () => {
    console.log(this.name);
  }
}

class Contributor {

}

const $container = document.querySelector('.container');

const renderRepository = (repo) => {
  const listItem = document.createElement('li');
  const nameNode = document.createTextNode(repo.name);
  listItem.appendChild(nameNode);
  $container.appendChild(listItem);
};

const fetchRepositories = async () => {
  let repositories = null;
  try {
    const response = await fetch(API_URL);
    repositories = await response.json();
  } catch (error) {
    console.error({ error });
  }
  console.log(repositories);
  const classes = repositories.map((repo) => {
    const repoClass = new Repository(repo.name);
    return repoClass;
  });
  classes.map(renderRepository)
};

fetchRepositories();





// class Repositories {
//   constructor(repoURL) {
//     this.fetchAndRender(repoURL);
//   }

//   async fetchAndRender(repoUrl) {
//     const response = await fetch(repoUrl);
//     const repoData = await response.json();
//     console.log(repoData);
//     try {
//       const names = repoData.map(p => p.name);
//       names.forEach((arrayElement) => {
//         const selOptions = document.createElement('option');
//         const selectElem = document.getElementById('repo-select');
//         selOptions.innerHTML = arrayElement;
//         selOptions.value = arrayElement;
//         selectElem.appendChild(selOptions);
//         document.getElementById('spinner').style.display = 'none';
//       });
//       document.getElementById('repo-select').onchange = () => {
//         // document.getElementById('spinner').style.display = 'block';
//         const selectedRepoIndex = document.getElementById('repo-select').selectedIndex;
//         document.getElementById('repo-name').innerHTML = repoData[selectedRepoIndex - 1].name;
//         document.getElementById('repo-description').innerHTML = repoData[selectedRepoIndex - 1].description;
//         document.getElementById('repo-forks').innerHTML = repoData[selectedRepoIndex - 1].forks;
//         const time = new Date(repoData[selectedRepoIndex - 1].updated_at);
//         document.getElementById('repo-updated').innerHTML = time.toUTCString();
//         // let response = await fetch(repoData[selectedRepoIndex - 1].contributors_url);
//         // const conData = await response.json();
//       };
//     } catch (error) {
//       this.errorHandling(error);
//     }
//   }

//   async getContributor(url) {
//     const conResponse = await fetch(url);
//     const conributorData = await conResponse.json();
//   }

//   errorHandling() {
//     document.getElementById('error').style.display = 'block';
//     document.getElementById('spinner').style.display = 'none';
//     document.getElementById('left').style.display = 'none';
//     document.getElementById('right').style.display = 'none';
//   }
// }

// class Contributor {
//   constructor(person) {
//     this.Render(person);
//   }

//   render() {

//   }

// }
// const repUrl = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
// window.onload = (() => new Repositories(repUrl));
