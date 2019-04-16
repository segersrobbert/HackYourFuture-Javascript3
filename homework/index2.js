async function fetchAndRender(repoUrl) {
  try {
    const response = await fetch(repoUrl);
    const repoData = await response.json();

    const names = repoData.map(p => p.name);
    names.forEach((arrayElement) => {
      const selOptions = document.createElement('option');
      const selectElem = document.getElementById('repo-select');
      selOptions.innerHTML = arrayElement;
      selOptions.value = arrayElement;
      selectElem.appendChild(selOptions);
      document.getElementById('spinner').style.display = 'none';
    });

    // eslint-disable-next-line no-multi-assign
    document.getElementById('repo-select').onchange = () => {
      // document.getElementById('spinner').style.display = 'block';
      const selectedRepoIndex = document.getElementById('repo-select').selectedIndex;
      document.getElementById('repo-name').innerHTML = repoData[selectedRepoIndex - 1].name;
      document.getElementById('repo-description').innerHTML = repoData[selectedRepoIndex - 1].description;
      document.getElementById('repo-forks').innerHTML = repoData[selectedRepoIndex - 1].forks;
      const time = new Date(repoData[selectedRepoIndex - 1].updated_at);
      document.getElementById('repo-updated').innerHTML = time.toUTCString();
      // let response = await fetch(repoData[selectedRepoIndex - 1].contributors_url);
      // const conData = await response.json();
    };
  } catch (error) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('left').style.display = 'none';
    document.getElementById('right').style.display = 'none';
  } finally {
    document.getElementById('spinner').style.display = 'none';
  }
}
const repUrl = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
window.onload = () => fetchAndRender(repUrl);
