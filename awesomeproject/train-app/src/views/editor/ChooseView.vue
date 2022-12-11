<template>
	<div class="row" id='choose'>
		<p> {{ response }} </p>
		<div class="row">
			<div class="card mb-3">
				<h5 for="form-select" class="form-label">
					<strong>Выберите тип упражнений для вашей тренировки</strong>
				</h5>
				<select id = 'typeEx' v-model="changedForm" class="form-select" aria-label="typeW">
					<option disabled value="0">Выберите тип упражнения</option>
					<option selected value="1">Стандартные</option>
					<option value="2">Кроссфит комплексы</option>
				</select>

			</div>
		</div>
		<hr size="5">
		<div class="row g-0">
			<div class="col-md-4">
				<h4>Отредактируйте упражнение</h4>

				<div id='baseW' v-show="changedForm==1">
					<form onsubmit="return false;">
						<input type ="text" name="ex" id="id_ex" v-model="id1" hidden disabled>

						<div class="card mb-3" hidden>
							<h5 for="form-select" class="form-label">
								<strong><label for="id_name">Название тренировки:</label>
								</strong>
							</h5>
							<input class="form-control" type='text' name="name" required id="nameWforEx" v-model="name1">
						</div>

						<div class="card mb-3">
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_exercise">Название упражнения:</label>
								</strong>
							</h5>
							<select v-model="exercise" class="form-select" name="exercise" required id="id_exercise">
								<option value="" selected disabled>---------</option>
							</select>
						</div>

						<div class="card mb-3" hidden>
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_ex_number">Номер упражнения:</label>
								</strong>
							</h5>
							<input v-model="ex_number" class="form-control" type="number" name="ex_number" id="id_ex_number">
						</div>
						<div class="card mb-3">
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_sets">Количество подходов:</label>
								</strong>
							</h5>
							<input v-model="sets1" class="form-control" type="number" name="sets" required id="id_sets">
						</div> 
						<div class="card mb-3">
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_quantity_in_set">Количество повторений:
									</label>
								</strong>
							</h5>
							<input v-model="quantity_in_set" class="form-control" type="number" name="quantity_in_set" required id="id_quantity_in_set">
						</div>    
						<div class="card mb-3">
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_measurement">Мера для повторений:</label>
								</strong>
							</h5>
							<select v-model="measurement" class = "form-select" name="measurement" required id="id_measurement">
								<option value="Q" selected>раз</option>
								<option value="S">секунды</option>
							</select>
						</div>    
						<div class="card mb-3">
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_rest">Отдых между подходами (в сек):</label>
								</strong>
							</h5>
							<input v-model="rest" class="form-control" type="number" name="rest" required id="id_rest">
						</div>      
						<input v-show="!editBtnEx" @click="submitFormEx" class = 'btn btn-primary' type="submit" value="Добавить упражнение">
						<input v-show="editBtnEx" @click="editFormEx" class = 'btn btn-primary' type="submit" value="Добавить упражнение">
					</form>
				</div>

				<div id='crossfit' v-show="changedForm==2">
					<form onsubmit="return false;">
						<input type ="text" name="c" id="id_c" v-model="id2" hidden disabled>
						<div class="card mb-3" hidden>
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_name">Название тренировки:</label>
								</strong>
							</h5>
							<input type ="text" name="name" required id="nameWforCompl" v-model="name2">
						</div>
						<div class="card mb-3">
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_crf_cmplx">Название комплекса:</label>
								</strong>
							</h5>
							<select v-model="crf_cmplx" name="crf_cmplx" required id="id_crf_cmplx">
								<option value="" disabled selected>---------</option>
							</select> 
						</div>
						<div class="card mb-3" hidden>
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_cmplx_number">Номер комплекса:</label>
								</strong>
							</h5>
							<input v-model="ex_number" class="form-control" type="number" name="cmplx_number" required id="id_cmplx_number">
						</div>
						<div class="card mb-3">
							<h5 for="form-select" class="form-label">
								<strong>
									<label for="id_sets">Количество подходов:</label>
								</strong>
							</h5>
							<input v-model="sets2" class="form-control" type="number" name="sets" required id="id_sets">
						</div>
						<input v-show="!editBtnC" @click="submitFormCompl" class = 'btn btn-primary' type="submit" value="Добавить комплекс">
						<input v-show="editBtnC" @click="editFormCompl" class = 'btn btn-primary' type="submit" value="Добавить комплекс">
					</form>
				</div>
				<br>
				<a @click="alert('Ваша тренировка сохранена')" class = 'btn btn-primary' href="">Сохранить</a>
			</div>
			<div class="col-md-2">

			</div>
			<div class="col-md-6">
				<h4>Список добавленных упражнений</h4>
				<table class="table table-striped table-hover">

					<thead>
						<tr>
							<th scope="col">#</th>  
							<th scope="col">Упр.</th>
							<th scope="col">Подходов</th>
							<th scope="col">Кол повт.</th>
							<th scope="col">Отдых.</th>
							<th scope="col">Изм.</th>
							<th scope="col">Уд.</th>
						</tr>
					</thead>

					<tbody id='List_added_ex'>

					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
import { mapState } from 'vuex'
export default {
	name: 'ChooseView',
	data() {
		return {
			response: '',
			id1: 0,
			id2:0,
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
	computed: {
		...mapState({
			name1: state => state.editor.name1,
			name2: state => state.editor.name2
		})
	},
	mounted: async function () {
	// get exercises
	let response = await fetch('http://127.0.0.1:8000/api/exercise/')
	let data = await response.json() 

	let ar = document.getElementById('id_exercise')
	for(let el of data){
		let newEl = document.createElement('option')
		newEl.innerHTML=el.name
		newEl.value =el.id
		ar.appendChild(newEl)
	}

  	// get complexes
  	response = await fetch('http://127.0.0.1:8000/api/complex/')
  	data = await response.json() 

  	ar = document.getElementById('id_crf_cmplx')
  	for(let el of data){
  		let newEl = document.createElement('option')
  		newEl.innerHTML=el.name
  		newEl.value =el.id
  		ar.appendChild(newEl)
  	}
  },
  methods: {
  	async delEx(id){
  		try{
  			await axios({
  				method: "delete",
  				url: "/api/base/"+id,
  				headers: {
  					'Content-Type': 'application/json;charset=utf-8'
  				}
  			})
  		}catch(error){
  			console.log(error)
  		}
  		this.updateAllList()
  	},

  	async delCompl(id){
  		try{
  			await axios({
  				method: "delete",
  				url: "/api/crossf/"+id,
  				headers: {
  					'Content-Type': 'application/json;charset=utf-8'
  				}
  			})
  		}catch(error){
  			console.log(error)
  		}
  		this.updateAllList()
  	},
  	async updateAllList(){
  		try{
  			let response = await fetch('http://127.0.0.1:8000/get_all_ex/'+this.name1)
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
  							this.delEx(this.value)
  						}
  						document.getElementById(el.ex_number.toString() + '_ed_ex').onclick=async function(){
  							this.edEx(this.value)
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
  							this.edC(this.value)
  						}
  						document.getElementById(el.ex_number.toString() + '_del_compl').onclick=function(){
  							this.delCompl(this.value)
  						}
  					}
  				}
  			}catch(error){
  				console.log(error)
  			}
  		},
  		async edEx(id){
  			let response = await fetch('http://127.0.0.1:8000/api/base/'+id)
  			let ex = await response.json() 
  			console.log(ex)

  			this.changedForm=1
  			this.editBtnEx=true
  			let item = document.getElementById(ex['ex_number']+'_ex')
  			item.style.backgroundColor = "#2F4F4F";
  			item = document.getElementById(ex['ex_number']+'_ed_ex')
  			item.disabled=true
  			item = document.getElementById(ex['ex_number']+'_del_ex')
  			item.disabled=true
  			item = document.getElementById('typeEx')
  			item.disabled=true

  			this.id1 = ex['id']
  			this.name1 = ex['name']
  			this.exercise= ex['exercise']
  			this.ex_number= ex['ex_number']
  			this.sets1= ex['sets']
  			this.quantity_in_set = ex['quantity_in_set']
  			this.measurement = ex['measurement']
  			this.rest= ex['rest']
  		},
  		async edC(id){
  			let response = await fetch('http://127.0.0.1:8000/api/crossf/'+id)
  			let ex = await response.json() 
  			console.log(ex)

  			this.changedForm=2
  			this.editBtnC=true
  			let item = document.getElementById(ex['cmplx_number']+'_compl')
  			item.style.backgroundColor = "#2F4F4F";
  			item = document.getElementById(ex['cmplx_number']+'_ed_compl')
  			item.disabled=true
  			item = document.getElementById(ex['cmplx_number']+'_del_compl')
  			item.disabled=true
  			item = document.getElementById('typeEx')
  			item.disabled=true

  			this.id2 = ex['id']
  			this.name2= ex['name']
  			this.crf_cmplx= ex['crf_cmplx']
  			this.ex_number= ex['cmplx_number']
  			this.sets2= ex['sets']
  		},
  		updateListEx(ex){
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
  				this.delEx(this.value)
  			}
  			document.getElementById(ex['ex_number'].toString() + '_ed_ex').onclick=async function(){
  				this.edEx(this.value)
  			}

  		},
  		updateListCompl(compl){
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
  				this.edC(this.value)
  			}
  			document.getElementById(compl['cmplx_number'].toString() + '_del_compl').onclick=function(){
  				this.delCompl(this.value)
  			}
  		},
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
  						'Content-Type': 'application/json;charset=utf-8'
  					}
  				})
  				let nameEx = document.getElementById('id_exercise')
  				let meas = document.getElementById('id_measurement')
  				let ex = {
  					'id': response.data.id,
  					'name': nameEx.options[nameEx.selectedIndex].text,
  					'ex_number': this.ex_number,
  					'sets': this.sets1,
  					'quantity_in_set': this.quantity_in_set,
  					'measurement': meas.options[meas.selectedIndex].text,
  					'rest': this.rest
  				}
  				this.updateListEx(ex)
  			} catch (error) {
  				console.log(error)
  				this.response = "Провертьте заполненные поля"
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
  						'Content-Type': 'application/json;charset=utf-8'
  					}
  				})
  				console.log(response)
  				this.updateAllList()
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
  				this.response = "Провертьте заполненные поля"
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
  						'Content-Type': 'application/json;charset=utf-8'
  					}
  				})
  				console.log(response)
  				this.updateAllList()
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
  				this.response = "Провертьте заполненные поля"
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
  						'Content-Type': 'application/json;charset=utf-8'
  					}
  				})
  				let nameCompl = document.getElementById('id_crf_cmplx')
  				let compl = {
  					'id': response.data.id,
  					'crf_cmplx': nameCompl.options[nameCompl.selectedIndex].text,
  					'cmplx_number': this.ex_number,
  					'sets': this.sets2,
  				}
  				this.updateListCompl(compl)
  			} catch (error) {
  				this.response = "Провертьте заполненные поля"
  			}
  		}
  	}
  }
  </script>