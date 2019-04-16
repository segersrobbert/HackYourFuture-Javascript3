'use strict';
class View {
  constructor(e) {
    this.initialize(e);
  }

  async initialize(e) {
    const t = document.getElementById('root');
    const r = Util.createAndAppend('header', t, { class: 'header', });
    Util.createAndAppend('p', r, { html: 'HYF Repositories', });
    const n = Util.createAndAppend('select', r, { class: 'repo-selector', 'aria-label': 'HYF Repositories', });
    n.addEventListener('change', () => this.fetchAndRender(n.value)), Util.createAndAppend('div', t, { id: 'container' });
    try {
      const t = await Util.fetchJSON(e); this.repos = t.sort((e, t) => e.name.localeCompare(t.name)).map(e => new Repository(e)), this.repos.forEach((e, t) => { Util.createAndAppend('option', n, { html: e.name(), value: t }); }), this.fetchAndRender(n.value;
    } catch (e) {
      this.renderError(e);
    }
  }

  async fetchAndRender(e) {
    const t = this.repos[e];
    const r = document.getElementById('container');
    try {
      const e = await t.fetchContributors();
      r.innerHTML = '';
      const n = Util.createAndAppend('div', r, { class: 'left-div whiteframe' });
      const i = Util.createAndAppend('div', r, { class: 'right-div whiteframe' });
      Util.createAndAppend('p', i, { html: 'Contributions', class: 'contributor-header' });
      const a = Util.createAndAppend('ul', i, { class: 'contributor-list' });
      t.render(n),
        e.map(e => new Contributor(e)).forEach(e => e.render(a));
    } catch (e) { this.renderError(e); }
  }

  renderError(e) {
    const t = document.getElementById('container'); t.innerHTML = '', Util.createAndAppend('div', t, { html: e.message, class: 'alert alert-error' });
  }
}
"use strict";
class Contributor {
  constructor(t) {
    this.data = t
  }
  render(t) {
    const a = Util.createAndAppend("li", t, { class: "contributor-item", "aria-label": this.data.login, tabindex: 0 }); a.addEventListener("click", () => { window.open(this.data.html_url, "_blank") }),
      a.addEventListener("keyup", t => { "Enter" === t.key && (t.preventDefault(), window.open(this.data.html_url, "_blank")) }), Util.createAndAppend("img", a, { src: this.data.avatar_url, height: 48, class: "contributor-avatar" }); const e = Util.createAndAppend("div", a, { class: "contributor-data" }); Util.createAndAppend("div", e, { html: this.data.login }), Util.createAndAppend("div", e, { html: this.data.contributions, class: "contributor-badge" })
  }
}
"use strict";
class Repository {
  constructor(t) {
    this.data = t
  }
  render(t) {
    const a = Util.createAndAppend("table", t), d = Util.createAndAppend("tbody", a); this.addRow(d, "Repository", `<a href="${this.data.html_url}" target="_blank">${this.data.name}</a>`), this.data.description && this.addRow(d, "Description", this.data.description), this.addRow(d, "Forks", this.data.forks), this.addRow(d, "Updated", new Date(this.data.updated_at).toLocaleString())
  }
  addRow(t, a, d) {
    const e = Util.createAndAppend("tr", t); Util.createAndAppend("td", e, { html: `${a} :`, class: "label" }), Util.createAndAppend("td", e, { html: d })
  }
  fetchContributors() {
    return Util.fetchJSON(this.data.contributors_url)
  }
  name() { return this.data.name }
}
"use strict";
class Util {
  static createAndAppend(e, t, r = {}) {
    const s = document.createElement(e); return t.appendChild(s), Object.keys(r).forEach(e => { const t = r[e]; "html" === e ? s.innerHTML = t : s.setAttribute(e, t) }), s
  }
  static fetchJSON(e) {
    return new Promise((t, r) => { const s = new XMLHttpRequest; s.open("GET", e), s.responseType = "json", s.onload = (() => { s.status < 400 ? t(s.response) : r(new Error(`Network error: ${s.status} - ${s.statusText}`)) }), s.onerror = (() => r(new Error("Network request failed"))), s.send() })
  }
}




const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
window.onload = (() => new View(HYF_REPOS_URL));
