import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI7rojQwB11Hon8tI8IQSGYY9hZu8YSp8",
  authDomain: "nmbm-3520e.firebaseapp.com",
  databaseURL: "https://nmbm-3520e-default-rtdb.firebaseio.com",
  projectId: "nmbm-3520e",
  storageBucket: "nmbm-3520e.appspot.com",
  messagingSenderId: "907648373326",
  appId: "1:907648373326:web:bc79b67c0e7e8fd233291f",
  measurementId: "G-V140XYNFZC"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export{ db };