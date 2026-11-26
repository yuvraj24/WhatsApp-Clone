# FRWhatsapp Server

The backend for FRWhatsapp's independent web messenger.

The server uses:
* <a href="https://nodejs.org/">NodeJs</a> 
* <a href="https://expressjs.com/">ExpressJs</a>
* <a href="https://www.mongodb.com/">MongoDb</a>
* <a href="https://mongoosejs.com/">Mongoose</a> 
* <a href="https://socket.io/">Socket.io</a>
* <a href="https://www.typescriptlang.org/">Typescript</a>
* <a href="https://firebase.google.com/docs/admin/setup">Firebase Admin SDK</a>

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

### Configure the server

The server requires `MONGODB_URI`, `FIREBASE_PROJECT_ID`, and Google
Application Default Credentials. For local development, set
`GOOGLE_APPLICATION_CREDENTIALS` to a service-account JSON file stored outside
the repository. Set the environment values in your deployment configuration;
do not commit credentials or paste them into source files. The development
server defaults to port `3001`.

For local development, fill in `web-client/.env` and `web-server/.env`.
Use the same Firebase project ID in both files, enable Phone sign-in in Firebase
Authentication, and add `localhost` to the authorized domains. Set
`MONGODB_URI` to your MongoDB connection string and
`GOOGLE_APPLICATION_CREDENTIALS` to the local path of your Firebase service
account JSON file. The `.env` files and service-account file must remain
untracked and outside source control.

The web server verifies Firebase ID tokens for phone-authenticated users. It
only exposes phone-number search for registered FRWhatsapp users; it does not
connect to personal WhatsApp accounts. Messages in this initial MVP are stored
on the server and are not end-to-end encrypted.

Install dependencies from the server directory with `npm install`. Configure the
environment variables listed in `.env.example` before starting the server.

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


## Start Server ⚡
```sh
cd web-server
npm start
```

## Author  ✍️
### *Yuvraj Pandey*
*I am a passionate Engineer which likes to push himself on various fronts of technologies.*  

For more exciting updates follow me,

<a href="https://twitter.com/yuvrajpy24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/twitter.png" width="40" height="40"></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.linkedin.com/in/yuvraj24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/linkedin.png" width="40" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/yuvraj24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/github.png" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://medium.com/@yuvrajpandey24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/medium.png" width="40" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://play.google.com/store/apps/developer?id=Yuvraj+Pandey"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/playstore.png" width="40" height="40"></a>
