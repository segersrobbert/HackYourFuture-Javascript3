/* eslint-disable no-console */
function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendchild(el);
}
const select = document.getElementById('repositories');
const url = ('https://api.github.com/HackYourFuture/repos?per_page=100');
fetch(url)
  .then(response => response.json())
  .then((data) => {
    const repositories = data.results;
    // eslint-disable-next-line array-callback-return
    return repositories.map((repository) => {
      const option = createNode('option');
      const span = createNode('span');

      span.innerHtml = `${repository}`;
      append(option, span);
      append(select, option);
    });
  })
  .catch((error) => {
    console.log(JSON.stringify(error));
  });
