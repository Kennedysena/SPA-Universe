export class Router {
  router = {};

  add(routeName, page) {
    this.router[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);

    if (window.location.pathname == "/exploration") {
      document.body.style.backgroundImage =
        "url(../assets/mountains-universe-3.png)";
    } else if (window.location.pathname == "/universe") {
      document.body.style.backgroundImage =
        "url(../assets/mountains-universe-2.png)";
    } else {
      document.body.style.backgroundImage =
        "url(../assets/mountains-universe-1.png)";
    }
    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.router[pathname] || this.router[404];
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
