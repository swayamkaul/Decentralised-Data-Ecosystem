async function gotoCreateform() {
    location.href="http://127.0.0.1:5500/CreateForm.html"
    }



    Moralis.initialize("QlQdSuTFLiORNu22CoR27JyvJZL7tnakoKZFmciz");
    Moralis.serverURL = "https://uwnhukqwmmyp.usemoralis.com:2053/server";
let user = Moralis.User.current();
console.log("logged in user:", user);
let forms;
var titlearray =[];
var resparray=[];
var responders=[];

getForms = async()=>{
const query = new Moralis.Query("Forms");
query.equalTo('Owner',user.attributes.ethAddress);
await query.find().then(function(forms) {
  console.log(forms.length);
console.log(forms[0].attributes.Title);
for(let i=0;i<forms.length;i++){
  titlearray[i]=forms[i].attributes.Title;
  resparray[i]=forms[i].attributes.Responses;
  responders[i]=forms[i].attributes.Responders;
}

console.log(titlearray);
});

//<a class="showmore" href="http://127.0.0.1:5500/Textile.html?resp=${resparray}&responders=${responders}">Save Responses</a>
   

var dynamic = document.querySelector('.container');  
for (var i = 0; i < titlearray.length; i++) {
  var fetch = document.querySelector('.container').innerHTML;  
  dynamic.innerHTML = `<div id="cards${i}" class="boxes">
      <div class="box-content">
        <h2 class="text">${titlearray[i]}</h2>

        <a class="showmore" style="font-size:14px" href="http://127.0.0.1:5500/SaveResponses.html?fname=${titlearray[i]}">Save Responses</a>
   
            </div>
    </div>` + fetch ; 
    var bgimg = document.getElementById(`cards${i}`);
    bgimg.style.backgroundImage = `url('https://source.unsplash.com/collection/9948714?sig=${i+20}')`;
} 



}

 getForms();


//var descriptionarray =["css style","js program","python code","java objects","android program","jquery objects","ruby code"];


document.getElementById("newForm").onclick = gotoCreateform;