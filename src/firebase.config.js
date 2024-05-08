import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4DLZ3nc3cRF0iIp0VDjL7VmpNLs0fuDg",
  authDomain: "restaurantapp-ff2f3.firebaseapp.com",
  databaseURL: "https://restaurantapp-ff2f3-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-ff2f3",
  storageBucket: "restaurantapp-ff2f3.appspot.com",
  messagingSenderId: "1098009011835",
  appId: "1:1098009011835:web:bfe51648e27fd192fee4de"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
