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

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

    function send(){
msg=document.getElementById("input_message").value;
firebase.database().ref(room_name).push({
user_name:user_name,
message:msg,
like:0
});
document.getElementById("input_message").value="";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

  console.log(firebase_message_id);
         console.log(message_data);
         name=message_data['user_name'];
         message=message_data['message'];
         like=message_data['like'];
         name1="<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
         message1="<h4 class='message_h4'>" + message + "</h4>";
         like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update(this.id)'>";
         like_button1="<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>"; 
         row=name1 + message1 + like_button + like_button1;
         document.getElementById("output").innerHTML+=row;


      } });  }); }
getData();

function update(message_id){
    console.log("clicked on this button-" + message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like:updated_likes
    });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}