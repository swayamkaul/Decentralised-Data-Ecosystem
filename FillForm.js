const params = (new URL(document.location)).searchParams;
    const id = params.get('id');
   console.log("id:"+ id);

   Moralis.initialize("QlQdSuTFLiORNu22CoR27JyvJZL7tnakoKZFmciz");
   Moralis.serverURL = "https://uwnhukqwmmyp.usemoralis.com:2053/server";

let user = Moralis.User.current();
console.log("logged in user:", user);

var ul= document.getElementById("first-ul");
var heading= document.querySelector(".title-div");
var survey_options = document.getElementById('survey_options');
var submitform = document.getElementById('submit');

const Form = new Moralis.Query('Forms');
// Form.equalTo('objectId', id);

Form.get(id).then(function(results) {
    console.log(results.attributes.Title);
    console.log(results.attributes.Questions);
    // results has the list of groups with role x
    const h1 = document.createElement('h1')
    h1.innerHTML=results.attributes.Title;
    heading.appendChild(h1)
    const p = document.createElement('p')
    p.innerHTML = 'This is a google form.'
    const p1 = document.createElement('p')
    p1.innerHTML = '*Required'
    p1.setAttribute('class','required')
    heading.appendChild(p)
    heading.appendChild(p1)
var questions=results.attributes.Questions;
    for(let i=0;i<questions.length;i++){
        // var li=document.createElement('li');
        // li.innerText=questions[i];
        // ul.append(li);

        // var newField = document.createElement('input');
        // newField.setAttribute('type','text');
        // newField.setAttribute('name','survey_options[]');
        // newField.setAttribute('class','survey_options');
        // newField.setAttribute('siz',50);
        // newField.setAttribute('placeholder','Answer');
        let div = document.createElement("div");
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let span = document.createElement("span");
  let inp = document.createElement("input");
  inp.setAttribute("name", "survey_options[]");
  inp.setAttribute("type", "text");
  inp.setAttribute("placeholder", "Your Answer");
  div2.setAttribute("class", "input-div");
  div2.appendChild(inp);
  span.innerHTML = "*";
  span.setAttribute("class", "required");
  div1.innerHTML = questions[i];
  div1.appendChild(span);
  div1.setAttribute("class", "name");
  div.setAttribute("class", "name-div");
  div.appendChild(div1);
  div.appendChild(div2);
  survey_options.appendChild(div);
    }
 });

 submitform.onclick= async function(){
	var fields = document.getElementsByName('survey_options[]')


	let responses = new Array(fields.length);
	for(let i=0;i<fields.length;i++){
		responses[i]=fields[i].value;
		console.log( "responses"+responses[i] );
	}

  await  Form.get(id).then(function(results) {
        let resp=[];
        let responders=[];
        if(results.attributes.Responses==null){
            resp.push(responses);
            
        }
        else{
            resp= results.attributes.Responses.slice();
            resp.push(responses);
        }
        console.log(resp);
        if(results.attributes.Responses==null){
            responders.push(user.attributes.ethAddress);
          }
          else{
              responders= results.attributes.Responders.slice();
              responders.push(user.attributes.ethAddress);
              console.log('user ethAddress',user.attributes.ethAddress);
          }
        results.set("Responders",responders);
        results.set("Responses",resp);
        console.log(responders);
        results.save().then(()=>{
            console.log("Saved");
            alert("Your response has been submitted !")
            window.location.reload()
        });

     });
	
 }
