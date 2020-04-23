export class StatusClassModel {
  userId: String;
  userName: String;
  lastStatusTime: String;
  status: [StatusItemModel];

  constructor(data: any) {
    this.userId = data.userId;
    this.userName = data.userName;
    this.lastStatusTime = data.lastStatusTime;
    this.status = [new StatusItemModel(data.status[0])];
  }
}

export class StatusItemModel {
  image: String;
  message: String;
  seenUsers: [{}];
  time: String;

  constructor(data: StatusItemModel) {
    this.image = data.image;
    this.message = data.message;
    this.seenUsers = [data.seenUsers[0]];
    this.time = data.time;
  }
}

export class UserModel {
  userId: String;

  constructor(seenUsers: UserModel) {
    this.userId = seenUsers.userId;
  }
}
