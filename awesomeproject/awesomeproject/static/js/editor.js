

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

async function delEx(id){
	try{
		await axios({
				      method: "delete",
					  url: "/api/base/"+id,
					  headers: {
						'X-CSRFToken': csrftoken,
						'Content-Type': 'application/json;charset=utf-8'
					  }
					})
	}catch(error){
		console.log(error)
	}
	updateAllList()
}

async function delCompl(id){
	try{
		await axios({
				      method: "delete",
					  url: "/api/crossf/"+id,
					  headers: {
						'X-CSRFToken': csrftoken,
						'Content-Type': 'application/json;charset=utf-8'
					  }
					})
	}catch(error){
		console.log(error)
	}
	updateAllList()
}

async function updateAllList(){
	try{
		let response = await fetch('http://127.0.0.1:8000/get_all_ex/'+choose.name1)
		let data = await response.json() 
		let ar = document.getElementById('List_added_ex')
		ar.innerHTML=''
		for(let el of data){
			let newEl = document.createElement('tr')
			
			if (el.rest){
				if (el.measurement === 'Q') el.measurement = 'раз'
				else el.measurement = 'секунды'
				newEl.id = el.ex_number+'_ex'
				newEl.innerHTML=`	
							  <th scope="row">${el.ex_number}</th>
							  <th scope="row">${el.name}</th>
							  <td>${el.sets}</td>
							  <td>${el.quantity_in_set} ${el.measurement}</td>
							  <td>${el.rest}</td>
							  <td><button id="${el.ex_number}_ed_ex" value = ${el.id} type="button" class="btn btn-primary">&#128736;</button></td>
							  <td><button id="${el.ex_number}_del_ex" value = ${el.id} type="button" class="btn btn-primary">&otimes;</button></td>
						`
				ar.appendChild(newEl)
				document.getElementById(el.ex_number.toString() + '_del_ex').onclick=async function(){
					delEx(this.value)
				}
				document.getElementById(el.ex_number.toString() + '_ed_ex').onclick=async function(){
					edEx(this.value)
				}
					
			}
			else{
				newEl.id = el.ex_number+'_compl'
				newEl.innerHTML=`	
						  <th scope="row">${el.ex_number}</th>
						  <th scope="row">${el.name}</th>
						  <td>${el.sets}</td>
						  <td>---</td>
						  <td>---</td>
						  <td><button id="${el.ex_number}_ed_compl" value = ${el.id} type="button" class="btn btn-primary">&#128736;</button></td>
						  <td><button id="${el.ex_number}_del_compl" value = ${el.id} type="button" class="btn btn-primary">&otimes;</button></td>
						`
				ar.appendChild(newEl)
				document.getElementById(el.ex_number.toString() + '_ed_compl').onclick=function(){
					edC(this.value)
				}
				document.getElementById(el.ex_number.toString() + '_del_compl').onclick=function(){
					delCompl(this.value)
				}
			}
		}
	}catch(error){
		console.log(error)
	}
}

async function edEx(id){
	let response = await fetch('http://127.0.0.1:8000/api/base/'+id)
	let ex = await response.json() 
	console.log(ex)

	choose.changedForm=1
	choose.editBtnEx=true
	let item = document.getElementById(ex['ex_number']+'_ex')
	item.style.backgroundColor = "#2F4F4F";
	item = document.getElementById(ex['ex_number']+'_ed_ex')
	item.disabled=true
	item = document.getElementById(ex['ex_number']+'_del_ex')
	item.disabled=true
	item = document.getElementById('typeEx')
	item.disabled=true
	
	choose.id1 = ex['id']
	choose.name1 = ex['name']
	choose.exercise= ex['exercise']
	choose.ex_number= ex['ex_number']
	choose.sets1= ex['sets']
	choose.quantity_in_set = ex['quantity_in_set']
	choose.measurement = ex['measurement']
	choose.rest= ex['rest']
}

async function edC(id){
	let response = await fetch('http://127.0.0.1:8000/api/crossf/'+id)
	let ex = await response.json() 
	console.log(ex)

	choose.changedForm=2
	choose.editBtnC=true
	let item = document.getElementById(ex['cmplx_number']+'_compl')
	item.style.backgroundColor = "#2F4F4F";
	item = document.getElementById(ex['cmplx_number']+'_ed_compl')
	item.disabled=true
	item = document.getElementById(ex['cmplx_number']+'_del_compl')
	item.disabled=true
	item = document.getElementById('typeEx')
	item.disabled=true
	
	choose.id2 = ex['id']
	choose.name2= ex['name']
	choose.crf_cmplx= ex['crf_cmplx']
	choose.ex_number= ex['cmplx_number']
	choose.sets2= ex['sets']
}

function updateListEx(ex){
	let ar = document.getElementById('List_added_ex')
	let newEl = document.createElement('tr')
	newEl.id = ex['ex_number']+'_ex'
	newEl.innerHTML=`	
					  <th scope="row">${ex['ex_number']}</th>
					  <th scope="row">${ex['name']}</th>
					  <td>${ex['sets']}</td>
					  <td>${ex['quantity_in_set']} ${ex['measurement']}</td>
					  <td>${ex['rest']}</td>
					  <td><button id="${ex['ex_number']}_ed_ex" value = ${ex['id']} type="button" class="btn btn-primary">&#128736;</button></td>
					  <td><button id="${ex['ex_number']}_del_ex" value = ${ex['id']} type="button" class="btn btn-primary">&otimes;</button></td>
				`
	ar.appendChild(newEl)
	document.getElementById(ex['ex_number'].toString() + '_del_ex').onclick=function(){
		delEx(this.value)
	}
	document.getElementById(ex['ex_number'].toString() + '_ed_ex').onclick=async function(){
		edEx(this.value)
	}
	
}

function updateListCompl(compl){
	let ar = document.getElementById('List_added_ex')
	let newEl = document.createElement('tr')
	newEl.id = compl['cmplx_number']+'_compl'
	newEl.innerHTML=`	
					  <th scope="row">${compl['cmplx_number']}</th>
					  <th scope="row">${compl['crf_cmplx']}</th>
					  <td>${compl['sets']}</td>
					  <td>---</td>
					  <td>---</td>
					  <td><button id="${compl['cmplx_number']}_ed_compl" value = ${compl['id']} type="button" class="btn btn-primary">&#128736;</button></td>
					  <td><button id="${compl['cmplx_number']}_del_compl" value = ${compl['id']} type="button" class="btn btn-primary">&otimes;</button></td>
					`
	ar.appendChild(newEl)
	document.getElementById(compl['cmplx_number'].toString() + '_ed_compl').onclick=function(){
		edC(this.value)
	}
	document.getElementById(compl['cmplx_number'].toString() + '_del_compl').onclick=function(){
		delCompl(this.value)
	}
}

var workout_name = ''

var choose = new Vue({
  el: '#choose',
  data() {
    return {
	  id1: 0,
	  id2:0,
	  seen: false,
	  changedForm: '',
      name1: '',
      exercise: '',
      ex_number: 0,
      sets1: 5,
	  quantity_in_set: 12,
	  measurement: 'раз',
	  rest: 60,
      name2: '',
      crf_cmplx: '',
      sets2: 5,
	  editBtnEx: false,
	  editBtnC: false,
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
											  'sets': this.sets1,
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
				'id': response.data.id,
				'name': nameEx.options[nameEx.selectedIndex].text,
				'ex_number': this.ex_number,
				'sets': this.sets1,
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
	async editFormEx(){
		try {
			const response = await axios({
										  method: "put",
										  url: "/api/base/"+this.id1+"/",
										  data: {
											  'name': this.name1,
											  'exercise': this.exercise,
											  'ex_number': this.ex_number,
											  'sets': this.sets1,
											  'quantity_in_set': this.quantity_in_set,
											  'measurement': this.measurement,
											  'rest': this.rest
										  },
										  headers: {
											'X-CSRFToken': csrftoken,
                                            'Content-Type': 'application/json;charset=utf-8'
										  }
										})
			updateAllList()
			this.editBtnEx=false
			let item = document.getElementById(this.ex_number+'_ex')
			item.style.backgroundColor = "#FFFFF";
			item = document.getElementById(this.ex_number+'_ed_ex')
			item.disabled=false
			item = document.getElementById(this.ex_number+'_del_ex')
			item.disabled=false
			item = document.getElementById('typeEx')
			item.disabled=false
		} catch (error) {
			console.log(error)
			this.response = error.response.data
			console.log(response)
		}
		
	},
	async editFormCompl(){
		try {
			const response = await axios({
										  method: "post",
										  url: "/api/crossf/"+this.id2+"/",
										  data: {
											  
											  'name': this.name2,
											  'crf_cmplx': this.crf_cmplx,
											  'cmplx_number': this.ex_number,
											  'sets': this.sets2
										  },
										  headers: {
											'X-CSRFToken': csrftoken,
                                            'Content-Type': 'application/json;charset=utf-8'
										  }
										})
			updateAllList()
			this.editBtnC=false
			let item = document.getElementById(this.ex_number+'_ex')
			item.style.backgroundColor = "#FFFFF";
			item = document.getElementById(this.ex_number+'_ed_ex')
			item.disabled=false
			item = document.getElementById(this.ex_number+'_del_ex')
			item.disabled=false
			item = document.getElementById('typeEx')
			item.disabled=false
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
											  'sets': this.sets2
										  },
										  headers: {
											'X-CSRFToken': csrftoken,
                                            'Content-Type': 'application/json;charset=utf-8'
										  }
										})
			nameCompl = document.getElementById('id_crf_cmplx')
			compl = {
				'id': response.data.id,
				'crf_cmplx': nameCompl.options[nameCompl.selectedIndex].text,
				'cmplx_number': this.ex_number,
				'sets': this.sets2,
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











