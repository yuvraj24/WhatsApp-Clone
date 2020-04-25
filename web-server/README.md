# WhatsApp-Clone-Server

The backend of an application is responsible for things like calculations, business logic, database interactions, and performance. Most of the code that is required to make an application work will be done on the backend.This part of the repository mainly deals with the server side implementation of the Whatsapp clone. 

Following are the technologies used in order to construct this backend,
* <a href="https://nodejs.org/">NodeJs</a>

* <a href="https://expressjs.com/">ExpressJs</a>
* <a href="https://www.mongodb.com/">MongoDb</a>
* <a href="https://mongoosejs.com/">Mongoose</a>

* <a href="https://socket.io/">Socket.io</a><br>
Socket.IO enables real-time bidirectional event-based communication which is used here for realtime chat functionality.
<br><br>
Sample code:
```js
io.on('connection', socket => {
  socket.emit('request', /* … */); // emit an event to the socket
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }); // listen to the event
});
```

* <a href="https://www.typescriptlang.org/">Typescript</a>

* <a href="https://github.com/auth0/node-jsonwebtoken">JSON WebToken</a> <br>
JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.  The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.


## Getting Started

### Install Dependencies
```js
npm install express cors mongoose nodemon typescript config jsonwebtoken moment ts-node
```

### Install MongoDb
```
$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community

If you have a previous version of mongodb
$ brew services stop mongodb
$ brew uninstall mongodb

$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community
```
For Windows Installation *<a href="https://docs.mongodb.com/manual/administration/install-community/" target="_blank">click here</a>*


### Install Socket.io

```
npm install socket.io
```
Check out their <a href="https://github.com/socketio/socket.io">Github Link</a> for more information.

### Start Server
```
cd server
nodemon start
```


