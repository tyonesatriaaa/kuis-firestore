import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyD_IhlB4qehGrYF762be7lFpuWsHZ5yeeM",
  authDomain: "fir-kuis-8cc8c.firebaseapp.com",
  databaseURL: "https://fir-kuis-8cc8c-default-rtdb.firebaseio.com",
  projectId: "fir-kuis-8cc8c",
  storageBucket: "fir-kuis-8cc8c.appspot.com",
  messagingSenderId: "1046657814093",
  appId: "1:1046657814093:web:a8cec85eff65ba70675604",
  measurementId: "G-P1SJV4YYH4"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
