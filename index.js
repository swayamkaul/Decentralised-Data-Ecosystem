 // connect to Moralis server
 Moralis.initialize("QlQdSuTFLiORNu22CoR27JyvJZL7tnakoKZFmciz");
 Moralis.serverURL = "https://uwnhukqwmmyp.usemoralis.com:2053/server";



 let user = Moralis.User.current();
 console.log(user)
if (user) {
  document.getElementById('btn-login').setAttribute('class','dis')
  document.getElementById('btn-logout').setAttribute('class','btn')
} else {
  document.getElementById('btn-logout').setAttribute('class','dis')
  document.getElementById('btn-login').setAttribute('class','btn')

}
 // add from here down
 async function login() {
   let user = Moralis.User.current();
   if (!user) {
     user = await Moralis.authenticate();

     var fName = document.getElementById("fname").value;
     var lName = document.getElementById("lname").value;
     var age = document.getElementById("age").value;
     user.set("username",fName);
     user.set("Age",age);
      // user.set("lName",lname);
      user.save();
   }
   console.log("logged in user:", user);


 const userAddress = user.get("ethAddress");
 const usernemail = user.attributes.email;
 const username = user.attributes.username;

 console.log("logged in userAddress:", userAddress);
 console.log("logged in userEmail:",usernemail );
 console.log("logged in userfname:",username );

 location.href="http://127.0.0.1:5500/Dashboard.html"
 }

 async function logOut() {
   await Moralis.User.logOut();
   window.location.reload()
   console.log("logged out");
   
 }

 document.getElementById("btn-login").onclick = login;
 document.getElementById("btn-logout").onclick = logOut;