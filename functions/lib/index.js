"use strict";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require('nodemailer');

// HELLO WORLD!
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map


// SETUP GMAIL (FROM US)
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// SET UP SURVEY (TODO)
const LINK_TO_SURVEY = 'https://goo.gl/forms/IdurnOZ66h3FtlO33';

/**
 * After an authorized user is create, a welcome email is sent including a survey.
 */
exports.sendAppSurvey = functions.auth.user().onCreate((event) => {
  const userID = event.data.user.id;

  return admin.auth().getUser(userID).then((user) => {
    const email = user.email;
    const username = email.substring(0, email.indexOf("@"));
    return sendSurveyEmail(email, username);
  });
});

/**
 * Sends an email pointing to the Upgraded App survey.
 */
function sendSurveyEmail(email, username) {
  console.log("~~~~~~~~~~ FUNCTION sendSurveyEmail to email ", email);

  const mailOptions = {
    from: '"Grizzly Parking" <noreply@grizzlyparking-2222a.firebaseapp.com>',
    to: email,
    subject: 'How did you like our new app?',
    text: `Hey ${username}, We've seen you have registered for our app!
             It would be awesome if you could tell us how you like it.
             Fill out our survey: ${LINK_TO_SURVEY}`,
  };

  //return mailTransport.sendMail(mailOptions).then(() => {
  //  return console.log('Welcome App Survey email sent to:', email);
  //});
}
