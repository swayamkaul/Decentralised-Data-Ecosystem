Moralis.initialize("QlQdSuTFLiORNu22CoR27JyvJZL7tnakoKZFmciz");
Moralis.serverURL = "https://uwnhukqwmmyp.usemoralis.com:2053/server";

var survey_options = document.getElementById('survey_options');
var add_more_fields = document.getElementById('add_more_fields');
var remove_fields = document.getElementById('remove_fields');
var submitform = document.getElementById('submit');


	let user = Moralis.User.current();
	console.log("logged in user:", user);
 

add_more_fields.onclick = function(){
	var newField = document.createElement('input');
	newField.setAttribute('type','text');
	newField.setAttribute('name','survey_options[]');
	newField.setAttribute('class','survey_options');
	newField.setAttribute('siz',50);
	newField.setAttribute('placeholder','Another Question');
	survey_options.appendChild(newField);
}

remove_fields.onclick = function(){
	var input_tags = survey_options.getElementsByTagName('input');
	if(input_tags.length > 2) {
		survey_options.removeChild(input_tags[(input_tags.length) - 1]);
	}
}

submitform.onclick= async function(){
	var fields = document.getElementsByName('survey_options[]')
	console.log( "Title:"+fields[0].value );
	console.log( "length:"+fields.length );

	let questions = new Array(fields.length-1);
	for(let i=1;i<fields.length;i++){
		questions[i-1]=fields[i].value;
		console.log( "question:"+questions[i-1] );
	}
	

	const NewForm = Moralis.Object.extend("Forms");
const newForm = new NewForm();
newForm.set('Owner',user.attributes.ethAddress);
newForm.set('Title',fields[0].value);
newForm.set('Questions',questions);
newForm.save()

.then((newForm) => {
  // Execute any logic that should take place after the object is saved.
  let userformss=[];
  if(user.attributes.UserFormIDS==null){
	userformss.push(newForm.id);
  }
  else{
	  userformss= user.attributes.UserFormIDS.slice();
	  userformss.push(newForm.id);
  }
  
  user.set ('UserFormIDS',userformss);
  user.save();
  alert('New Form created with objectId: '+newForm.id) ;
}, (error) => {

  alert('Failed to create new object, with error code: ' + error.message);
});

console.log(user.attributes.ethAddress);
console.log(survey_options.getElementsByTagName('survey_options[]'));
}