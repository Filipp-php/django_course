

async function getUser(){
	let response = await axios.get('/get_curr_user')
	let data = await response.id 
	return data
}

async function getEx(){
	let response = await fetch('http://127.0.0.1:8000/api/exercise/')
	let data = await response.json() 
	
	let ar = document.getElementById('id_exercise')
	for(let el of data){
		let newEl = document.createElement('option')
		newEl.innerHTML=el.name
		newEl.value =el.id
		ar.appendChild(newEl)
	}
}

getEx()


function updateListEx(ex){
	let ar = document.getElementById('List_added_ex')
	let newEl = document.createElement('tr')
	newEl.innerHTML=`	
					  <th scope="row">${ex['ex_number']}</th>
					  <th scope="row">${ex['name']}</th>
					  <td>${ex['sets']}</td>
					  <td>${ex['quantity_in_set']} ${ex['measurement']}</td>
					  <td>${ex['rest']}</td>
					  <td><button id="${ex['ex_number']}_ed_ex" value = ${ex['id_work']} type="button" class="btn btn-primary">&#128736;</button></td>
					  <td><button id="${ex['ex_number']}_del_ex" value = ${ex['id_work']} type="button" class="btn btn-primary">&otimes;</button></td>
				`
	ar.appendChild(newEl)
	document.getElementById(ex['ex_number'].toString() + '_del_ex').onclick=function(){
		console.log(this.value)
	}
	document.getElementById(ex['ex_number'].toString() + '_ed_ex').onclick=function(){
		console.log(this.value)
	}
	
}

function updateListCompl(compl){
	let ar = document.getElementById('List_added_ex')
	let newEl = document.createElement('tr')
	newEl.innerHTML=`	
					  <th scope="row">${compl['cmplx_number']}</th>
					  <th scope="row">${compl['crf_cmplx']}</th>
					  <td>${compl['sets']}</td>
					  <td>---</td>
					  <td>---</td>
					  <td><button id="${compl['cmplx_number']}_ed_compl" value = ${compl['id_work']} type="button" class="btn btn-primary">&#128736;</button></td>
					  <td><button id="${compl['cmplx_number']}_del_compl" value = ${compl['id_work']} type="button" class="btn btn-primary">&otimes;</button></td>
					`
	ar.appendChild(newEl)
	document.getElementById(compl['cmplx_number'].toString() + '_ed_compl').onclick=function(){
		console.log(this.value)
	}
	document.getElementById(compl['cmplx_number'].toString() + '_del_compl').onclick=function(){
		console.log(this.value)
	}
}

async function getCopml(){
	let response = await fetch('http://127.0.0.1:8000/api/complex/')
	let data = await response.json() 
	
	let ar = document.getElementById('id_crf_cmplx')
	for(let el of data){
		let newEl = document.createElement('option')
		newEl.innerHTML=el.name
		newEl.value =el.id
		ar.appendChild(newEl)
	}
}

getCopml()

var workout_name = ''

var choose = new Vue({
  el: '#choose',
  data() {
    return {
	  seen: false,
	  changedForm: '',
      name1: '',
      exercise: '',
      ex_number: 0,
      sets: 5,
	  quantity_in_set: 12,
	  measurement: 'раз',
	  rest: 60,
      name2: '',
      crf_cmplx: '',
      sets: 5,
    }
  },
  methods: {
    async submitFormEx() {
		try {
			this.ex_number +=1 
			const response = await axios({
										  method: "post",
										  url: "/api/base/",
										  data: {
											  'name': this.name1,
											  'exercise': this.exercise,
											  'ex_number': this.ex_number,
											  'sets': this.sets,
											  'quantity_in_set': this.quantity_in_set,
											  'measurement': this.measurement,
											  'rest': this.rest
										  },
										  headers: {
											'X-CSRFToken': csrftoken,
                                            'Content-Type': 'application/json;charset=utf-8'
										  }
										})
			nameEx = document.getElementById('id_exercise')
			meas = document.getElementById('id_measurement')
			ex = {
				'id_work': this.name1,
				'name': nameEx.options[nameEx.selectedIndex].text,
				'ex_number': this.ex_number,
				'sets': this.sets,
				'quantity_in_set': this.quantity_in_set,
				'measurement': meas.options[meas.selectedIndex].text,
				'rest': this.rest
			}
			updateListEx(ex)
		} catch (error) {
			console.log(error)
			this.response = error.response.data
			console.log(response)
		}
	
    },
	async submitFormCompl() {
		try {
			this.ex_number +=1 
			const response = await axios({
										  method: "post",
										  url: "/api/crossf/",
										  data: {
											  'name': this.name2,
											  'crf_cmplx': this.crf_cmplx,
											  'cmplx_number': this.ex_number,
											  'sets': this.sets
										  },
										  headers: {
											'X-CSRFToken': csrftoken,
                                            'Content-Type': 'application/json;charset=utf-8'
										  }
										})
			nameCompl = document.getElementById('id_crf_cmplx')
			compl = {
				'id_work': this.name2,
				'crf_cmplx': nameCompl.options[nameCompl.selectedIndex].text,
				'cmplx_number': this.ex_number,
				'sets': this.sets,
			}
			updateListCompl(compl)
		} catch (error) {
			console.log(error)
			this.response = error.response.data
			console.log(response)
		}
    }
  }
})

new Vue({
  el: '#workout',
  data() {
    return {
	  seen:true,
      name: '',
      description: '',
      date: new Date(),
      checkedForAll: false,
	  user: 1,
	  response: '',
    }
  },
  methods: {
    async submitForm() {
		try {
			const currentUser = await getUser()
			const response = await axios({
										  method: "post",
										  url: "/api/workout/",
										  data: {
											  'name': this.name, 
											  'description': this.description,
											  'data': this.date,
											  'user': currentUser,
											  'for_all': this.checkedForAll
										  },
										  headers: {
											'X-CSRFToken': csrftoken,
                                            'Content-Type': 'application/json;charset=utf-8'
										  }
										})
			this.seen = false
			choose.seen=true
			//this.response = JSON.stringify(response, null, 2)
			choose.name1 = response.data.id
			choose.name2 = response.data.id
		} catch (error) {
			console.log(error)
			this.response = error.response.data['name']
			this.name = '';
		}
	
    }
  }
})











