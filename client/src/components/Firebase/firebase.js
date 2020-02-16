import app from 'firebase/app';
import 'firebase/storage';


var firebaseConfig = {
  apiKey: "AIzaSyBrMYR_M-cU3oApuvUPVm2GiV71EQOBGrk",
  authDomain: "amzr-b7fd2.firebaseapp.com",
  databaseURL: "https://amzr-b7fd2.firebaseio.com",
  projectId: "amzr-b7fd2",
  storageBucket: "amzr-b7fd2.appspot.com",
  messagingSenderId: "782988860860",
  appId: "1:782988860860:web:2747696473369e66"
};
// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.storage = app.storage();

  }
}

export default Firebase;