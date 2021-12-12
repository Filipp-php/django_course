async function search(){
	let input = document.getElementById('search')
	let params = new URLSearchParams({
		name: input.value,
	})
	let response = await fetch('http://127.0.0.1:8000/api/exercise/?'+params)
	let data = await response.json() 
	
	let ar = document.getElementById('cardAr')
	ar.innerHTML = ''
	for(let el of data){
		let newEl = document.createElement('div')
		subEnds = el.information.length - Math.floor(2*el.information.length / 2)
		newEl.innerHTML=`
				<div class="card w-75 col-md-3" >
				  <div class="row g-0">
					<div class="col-md-4">
					  <img src="${el.photo}" class="img-fluid rounded-start">
					</div>
					<div class="col-md-8">
					  <div class="card-body">
						<h5 class="card-title">${ el.name }</h5>
						<p class="card-text">${ el.information.substring(0, subEnds) }...</p>
						<a href="{% url 'editor' %}" class="btn btn-primary">Подробнее &raquo </a>
					  </div>
					</div>
				  </div>
				</div>	
		`
		ar.appendChild(newEl)
	}
}

let btn = document.getElementById('searchButton')
btn.onclick=search


let input = document.getElementById('search')
input.oninput=search