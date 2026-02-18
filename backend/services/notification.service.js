// This requires setting up Firebase Admin SDK
// const admin = require('firebase-admin');
// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const sendPushNotification = async (deviceToken, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: deviceToken,
  };
  
  console.log(`Sending notification to ${deviceToken}: ${title}`);
  // try {
  //   const response = await admin.messaging().send(message);
  //   console.log('Successfully sent message:', response);
  // } catch (error) {
  //   console.log('Error sending message:', error);
  // }
};

module.exports = { sendPushNotification };