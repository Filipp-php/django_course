let date = document.getElementById('id_data');
date.type = "datetime-local"


let user = document.getElementById('id_user');
user.hidden = true
let currentUser = document.getElementById('username')
user.selectedIndex = currentUser.value

let for_all = document.getElementById('id_for_all');
for_all.className += "form-check-input";

let inputs = document.querySelectorAll('input');
for(var i = 0; i < inputs.length; i++){
	if(inputs[i].id != 'id_for_all'){
		inputs[i].className += " form-control";
	}
}

let selects = document.querySelectorAll('select');
for(var i = 0; i < selects.length; i++){
	if(selects[i].id != 'id_for_all'){
		selects[i].className += " form-select";
	}
}




