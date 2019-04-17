class App {
  async getRepositories() {
    if (this.repositories) {
      return this.repositories;
    }

    const streamRepositories = await fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100');
    const rawRepositories = await streamRepositories.json();

    const repositories = rawRepositories.map((rawRepository) => {
      // eslint-disable-next-line no-use-before-define
      return new Repository(rawRepository.name, rawRepository.description, rawRepository.forks, rawRepository.updated_at);
    });
    this.repositories = repositories;
    return repositories;
  }

  async renderOptions(node) {
    const select = document.createElement('select');

    select.setAttribute('id', 'repo-select');
    select.setAttribute('class', 'repo-selector');

    const defaultOption = document.createElement('option');
    defaultOption.innerText = 'Please choose a repo';
    select.appendChild(defaultOption);
    const repositories = await this.getRepositories();

    repositories.forEach((repo) => {
      select.appendChild(repo.renderAsOption());
    });

    node.appendChild(select);
    node.onchange = async event => this.setRepositoryDetails(event.srcElement.value);
  }

  async setRepositoryDetails(name) {
    try {
      const repository = this.repositories.find(repository => repository.name === name);

      document.getElementById('spinner').style.display = 'block';
      document.getElementById('repo-name').innerHTML = name;
      document.getElementById('repo-description').innerHTML = repository.description;
      document.getElementById('repo-forks').innerHTML = repository.forks;
      document.getElementById('repo-updated').innerHTML = repository.getFormattedUpdateDate();


      const mylist = document.getElementById('contributor-list');
      const lis = mylist.getElementsByTagName('li');
      while (lis.length > 0) {
        mylist.removeChild(lis[0]);
      }

      const contributors = await repository.getContributors();

      contributors.forEach((contributor) => {
        document.getElementById('contributor-list').appendChild(contributor.render());
      });

      document.getElementById('spinner').style.display = 'none';
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      document.getElementById('error').style.display = 'block';
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('left').style.display = 'none';
      document.getElementById('right').style.display = 'none';
    }
  }
}

class Repository {
  constructor(name, description, forks, updated_at) {
    this.name = name;
    this.description = description;
    this.forks = forks;
    this.updated_at = updated_at;
  }

  async getContributors() {
    const streamContributors = await fetch(`https://api.github.com/repos/HackYourFuture/${this.name}/contributors`)
    const rawContributors = await streamContributors.json();

    return rawContributors.map(rawContributor => new Contributor(rawContributor.login, rawContributor.contributions, rawContributor.avatar_url, rawContributor.html_url));
  }

  renderAsOption() {
    const option = document.createElement('option');
    option.innerText = this.name;
    option.setAttribute('value', this.name);
    return option;
  }

  getFormattedUpdateDate() {
    const time = new Date(this.updated_at);
    return time.toUTCString();
  }
}

class Contributor {
  constructor(login, contributions, avatar_url, html_url) {
    this.login = login;
    this.contributions = contributions;
    this.avatar_url = avatar_url;
    this.html_url = html_url;
  }

  render() {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'contributor-item');
    listItem.setAttribute('aria-label', this.login);
    listItem.innerHTML = `<img src="${this.avatar_url}" width="50" height="50" class="contributor-avatar"><div class="contributor-data"><div>${this.login}</div><div class="contributor-badge">${this.contributions}</div></div>`;
    listItem.addEventListener('click', () => { window.open(this.html_url, '_blank'); });

    return listItem;
  }
}

const app = new App();
app.renderOptions(document.getElementById('app_repositories'));
