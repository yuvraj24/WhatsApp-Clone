# WhatsApp-Clone-Server

The backend of an application is responsible for things like calculations, business logic, database interactions, and performance. Most of the code that is required to make an application work will be done on the backend.This part of the repository mainly deals with the server side implementation of the Whatsapp clone. 

Following are the technologies used in order to construct this backend,
* <a href="https://nodejs.org/">NodeJs</a> 
* <a href="https://expressjs.com/">ExpressJs</a>
* <a href="https://www.mongodb.com/">MongoDb</a>
* <a href="https://mongoosejs.com/">Mongoose</a> 
* <a href="https://socket.io/">Socket.io</a><br> 
* <a href="https://www.typescriptlang.org/">Typescript</a>
* <a href="https://github.com/auth0/node-jsonwebtoken">JSON WebToken</a>

## Other Platforms ✨
Refer the following links for platform specific implementation,
* <a href="https://github.com/yuvraj24/WhatsApp-Clone/blob/master/app-client/README.md">Mobile App Client (Android & IOS)</a>
* <a href="https://github.com/yuvraj24/WhatsApp-Clone/blob/master/web-server/README.md">Web App Client (WhatsApp Clone Web)</a>

## Heroku Deployment 🔥
Heroku runs the customer's apps in virtual containers which execute on a reliable runtime environment. Heroku calls these containers "Dynos." These Dynos can run code written in Node, Ruby, PHP, Go, Scala, Python, Java, or Clojure. Heroku also provides custom buildpacks with which the developer can deploy apps in any other language. Heroku lets the developer scale the app instantly just by either increasing the number of dynos or by changing the type of dyno the app runs in.

*The Backend code has been deployed & made live via Heroku*

* <a href="https://devcenter.heroku.com/articles/how-heroku-works">Check how Heroku works</a>
* <a href="https://devcenter.heroku.com/categories/deployment">Platform specific deployment</a>

## MongoDb Deployment (mLab) 🔥
mLab is a fully managed cloud database service that hosts MongoDB databases. mLab runs on cloud providers Amazon, Google, and Microsoft Azure, and has partnered with platform-as-a-service providers.

*The MongoDb databse code has been deployed & made live on mLab*

* <a href="https://docs.mlab.com/">Quick-Start Guide to mLab</a> 

## Getting Started ✨

### Install Dependencies
```js
npm install express cors mongoose nodemon typescript config moment ts-node
```

### Install MongoDb
MongoDB is a general purpose, document-based, distributed database built for modern application developers. MongoDB is a document database, which means it stores data in JSON-like documents.
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
For windows installation *<a href="https://docs.mongodb.com/manual/administration/install-community/" target="_blank">click here</a>*.


### Install Socket.io
Socket.IO enables real-time bidirectional event-based communication which is used here for realtime transmission of data across all the active users.
```js
npm install socket.io
```

Sample code:
```js
io.on('connection', socket => {
  socket.emit('request', /* … */); // emit an event to the socket
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }); // listen to the event
});
```

Check out their <a href="https://github.com/socketio/socket.io">Github Link</a> for more information.

### Install JSON Web Token

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.  The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.
```js
npm install jsonwebtoken
```
Check out their <a href="https://github.com/auth0/node-jsonwebtoken">Github Link</a> for more information.

## Start Server ⚡
Once the installation is completed as highlighted above you can now move on to start the server & experience the magic yourself.
```js
cd web-server
nodemon start
```

## Author  ✍️
### *Yuvraj Pandey*
*I am a passionate Engineer which likes to push himself on various fronts of technologies.*  

For more exciting updates follow me,

<a href="https://twitter.com/yuvrajpy24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/twitter.png" width="40" height="40"></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.linkedin.com/in/yuvraj24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/linkedin.png" width="40" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/yuvraj24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/github.png" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://medium.com/@yuvrajpandey24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/medium.png" width="40" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://play.google.com/store/apps/developer?id=Yuvraj+Pandey"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/playstore.png" width="40" height="40"></a>
