class Request {
  constructor() {
    this.url = '';
    this.method = '';
    this.body = {};
    this.state = new WaitingToBuild();
  }

  nextState() {
    this.state = this.state.next();
  };
}

class RequestBuilder {
  constructor() {
    this.request = new Request();
  }

  forUrl(url) {
    this.request.url = url;
    return this;
  }

  useMethod(method) {
    this.request.method = method;
    return this;
  }

  body(body) {
    this.request.body = body;
    return this;
  }

  build() {
    this.request.nextState();
    return this.request;
  }
}
