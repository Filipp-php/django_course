

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


function updateList(name){
	let ar = document.getElementById('List_added_ex')
	let newEl = document.createElement('p')
	newEl.innerHTML=name
	ar.appendChild(newEl)
	
}

async function getCopml(){
	let response = await fetch('http://127.0.0.1:8000/api/crossf/')
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
			console.log(response)
			this.seen = false
			choose.seen=true
			let input1 = document.getElementById('nameWforEx')
			input1.value = name
			let input2 = document.getElementById('nameWforCompl')
			input2.value = name
			this.response = JSON.stringify(response, null, 2)
		} catch (error) {
			this.response = error.response.data['name']
			this.name = '';
		}
	
    }
  }
})

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
      cmplx_number: 0,
      sets: 5,
    }
  },
  methods: {
    async submitFormEx() {
		try {
			this.ex_number +=1 
			const currentUser = await getUser()
			const response = await axios({
										  method: "post",
										  url: "/api/base/",
										  data: {
											  'name': this.name2,
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
			console.log(response)
			updateList(this.exercise)
			this.response = JSON.stringify(response, null, 2)
		} catch (error) {
			this.response = error.response.data
			console.log(response)
		}
	
    },
	async submitFormCompl() {
		try {
			this.cmplx_number +=1 
			const currentUser = await getUser()
			const response = await axios({
										  method: "post",
										  url: "/api/base/",
										  data: {
											  'name': this.name3,
											  'crf_cmplx': this.crf_cmplx,
											  'cmplx_number': this.cmplx_number,
											  'sets': this.sets
										  },
										  headers: {
											'X-CSRFToken': csrftoken,
                                            'Content-Type': 'application/json;charset=utf-8'
										  }
										})
			console.log(response)
			updateList(this.crf_cmplx)
			this.response = JSON.stringify(response, null, 2)
		} catch (error) {
			this.response = error.response.data
			console.log(response)
		}
    }
  }
})









