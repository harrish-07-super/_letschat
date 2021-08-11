
 var firebaseConfig = {
  apiKey: "AIzaSyC3ny5Owlq6AQ7TX6-ER6MNZf1UQG0IK_8",
  authDomain: "chat-app-3c171.firebaseapp.com",
  databaseURL: "https://chat-app-3c171-default-rtdb.firebaseio.com",
  projectId: "chat-app-3c171",
  storageBucket: "chat-app-3c171.appspot.com",
  messagingSenderId: "421603653874",
  appId: "1:421603653874:web:54e7fa55ccfcbdfdba386b",
  measurementId: "G-FV17XEZMWL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function add_room() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "Adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "let's_chat_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("childkey", childKey);
      console.log("Room_names", Room_names);
      row = "<div class='room_name' id = " + Room_names + " onclick='redirect(this.id)'>#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();

function redirect(name) {
  localStorage.setItem("room_name", room_name);
  window.location = "let's_chat_page.html";
}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}