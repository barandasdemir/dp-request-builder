class RequestStatus {
  constructor(name, nextStatus) {
    this.name = name;
    this.nextStatus = nextStatus;
  }

  next() {
    return new this.nextStatus();
  }
}

class WaitingToBuild extends RequestStatus {
  constructor() {
    super('waitingToBuild', Built);
  }
}

class Built extends RequestStatus {
  constructor() {
    super('built', Sent);
  }
}

class Sent extends RequestStatus {
  constructor() {
    super('sent', Done);
  }
}

class Done extends RequestStatus {
  constructor() {
    super('done', Done);
  }
}
