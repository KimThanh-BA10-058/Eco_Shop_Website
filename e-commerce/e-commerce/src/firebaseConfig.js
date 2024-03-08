import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCHHk-b_oxjbHus17lJxvxXQIvCEw5d6Jc",
  authDomain: "tutorial-c8c7d.firebaseapp.com",
  projectId: "tutorial-c8c7d",
  storageBucket: "tutorial-c8c7d.appspot.com",
  messagingSenderId: "860389718285",
  appId: "1:860389718285:web:c0d4662582aa6d228fd844"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const fs = getFirestore(app);
export const storage = getStorage(app)