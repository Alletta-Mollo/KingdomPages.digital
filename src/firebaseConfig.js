
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBXTl7FMbEzyQCZ44BOO5c47CxnawnORf4",
  authDomain: "kingdom-pages.firebaseapp.com",
  databaseURL: "https://kingdom-pages-default-rtdb.firebaseio.com",
  projectId: "kingdom-pages",
  storageBucket: "kingdom-pages.firebasestorage.app",
  messagingSenderId: "141311626464",
  appId: "1:141311626464:web:8a4c6f2e11c06d132d9485",
  measurementId: "G-1WQS82ZSYQ"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
