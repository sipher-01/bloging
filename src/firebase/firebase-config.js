import {initializeApp} from "firebase/app"
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBVMgwGIhqlTXnKTDSxiXnBb5VOXT5LWRw",
    authDomain: "basicblog-72b00.firebaseapp.com",
    projectId: "basicblog-72b00",
    storageBucket: "basicblog-72b00.appspot.com",
    messagingSenderId: "642639818679",
    appId: "1:642639818679:web:bb9279d7cbfe4acade8232",
    measurementId: "G-V7Z9SYE741"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage();
  const provider = new  GoogleAuthProvider()
  const db = getFirestore(app);
  export {auth,db,provider,storage}