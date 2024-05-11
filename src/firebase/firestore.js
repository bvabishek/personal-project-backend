var admin = require("firebase-admin");

var serviceAccount = require("../../creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-app-c7f17-default-rtdb.firebaseio.com"
});
