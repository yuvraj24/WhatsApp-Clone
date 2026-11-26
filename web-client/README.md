# FRWhatsApp Web

The web client is the browser interface for FRWhatsApp, an independent messaging-app project.

Following are the main technologies used in order to construct this frontend,
* <a href="https://reactjs.org/">ReactJs</a> 
* <a href="https://www.typescriptlang.org/">Typescript</a>
* <a href="https://github.com/bvaughn/react-virtualized">React Virtualized</a> 
* <a href="https://material-ui.com/">Material UI</a>
* <a href="https://github.com/axios/axios">Axios</a>
* <a href="https://socket.io/">Socket.io-client</a><br> 

## Existing Upstream Demo

The live deployment linked below is the original WhatsApp Clone demo; it is not the FRWhatsApp application.

<a href="https://whatsappclone-614cb.web.app/">Original WhatsApp Clone Web demo</a>


## Other Platforms ✨
Refer the following links for platform specific implementation,
* <a href="https://github.com/yuvraj24/WhatsApp-Clone/blob/master/app-client/README.md">Mobile App Client (Android & IOS)</a>
* <a href="https://github.com/yuvraj24/WhatsApp-Clone/blob/master/web-server/README.md">Web Server (Backend)</a>

## Screenshot
<br>

|          **Screens**                  |
| :-----------------------------------: |
| ![](../assets/wh_web1.png)            |<br>
| <br> ![](../assets/wh_web4.png)            |<br>
| <br> ![](../assets/wh_web2.png)            |<br>
| <br> ![](../assets/wh_web6.png)            |<br>
| <br> ![](../assets/wh_web7.png)            |<br>
| <br> ![](../assets/wh_web8.png)            |<br>

## Firebase Hosting 🔥
Firebase Hosting allows fast and secure hosting for our web application, static and dynamic content, and microservices. It is production-grade web content hosting for the developers. We can easily and quickly deploy web apps and serve both static and dynamic content to a global content delivery network with only a single command. We can pair Firebase Hosting with Cloud Function for building and hosting microservices on Firebase. 

Firebase Hosting, by default, provides an SSL certificate and offers an impressive speed across several geographical locations without any requirement for a separate CDN on top

*The Web Application has been deployed via Firebase Hosting*

* <a href="https://firebase.google.com/docs/hosting/use-cases">What can I do with Firebase Hosting?</a>
* <a href="https://firebase.google.com/docs/cli">Website Deployment steps</a>

## Getting Started ✨

The FRWhatsapp web client uses Firebase Phone Authentication for account
registration. Configure the Firebase web environment variables in
`.env.example`, enable Phone sign-in in Firebase Authentication, and add the
development/production domains to Firebase's authorized domains. The first
verification message is sent only after the user requests it from the form.
Contacts can search for one another by verified phone number and chat after
both have FRWhatsapp accounts.

### Install Dependencies
Just execute the command below & it will install all the dependencies mentioned in the ```package.json``` file of the project.
```js
npm install
```

### Start FRWhatsApp Web

```js
npm start
```

The web client defaults to the local API at `http://localhost:3001`. To use a
different server, set `REACT_APP_API_URL` and `REACT_APP_SOCKET_URL` in a local
`.env` file based on `.env.example`. Never put API secrets in the web client.

Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

```js
npm test
```
Launches the test runner in the interactive watch mode. See the section about running tests for more information.

```js
npm run build
```
Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about <a href="https://facebook.github.io/create-react-app/docs/deployment">deployment</a> for more information.
 

## Author  ✍️
### *Yuvraj Pandey*
*I am a passionate Engineer which likes to push himself on various fronts of technologies.*  

For more exciting updates follow me,

<a href="https://twitter.com/yuvrajpy24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/twitter.png" width="40" height="40"></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.linkedin.com/in/yuvraj24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/linkedin.png" width="40" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/yuvraj24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/github.png" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://medium.com/@yuvrajpandey24" target="_blank"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/medium.png" width="40" height="40"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://play.google.com/store/apps/developer?id=Yuvraj+Pandey"><img src="https://github.com/yuvraj24/LiveSmashBar/blob/master/images/playstore.png" width="40" height="40"></a>
