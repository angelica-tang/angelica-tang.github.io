// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

  // My web app's Firebase configuration
const firebaseConfig =
  {
    apiKey: "AIzaSyB5_jT54SCi46WC-T-xlPzG-nWvQxSe8-s",
    authDomain: "final-project-8c2e6.firebaseapp.com",
    projectId: "final-project-8c2e6",
    storageBucket: "final-project-8c2e6.appspot.com",
    messagingSenderId: "1012119391177",
    appId: "1:1012119391177:web:8290da106aa4128ec37618"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const msg = document.getElementById('msg');

function checkUserLoggedIn()
{
   
  onAuthStateChanged(auth, (user) =>
  {
      if (user)
      {
          const userRef = ref(database, 'users/' + user.uid);
          get(userRef).then((snapshot) =>
          {
              if (snapshot.exists())
              {
                msg.innerHTML = `Welcome!`;
              } else
                {
                    console.log("No user data found");
                }
          }).catch((error) =>
              {
                  console.error("Error fetching user data:", error);
              });
      } else
        {
            msg.innerHTML = `redirecting...`;
            window.location.href = "index.html";
        }
  });
}

checkUserLoggedIn();