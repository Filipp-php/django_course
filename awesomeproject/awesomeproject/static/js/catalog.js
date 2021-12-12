async function search(){
	let input = document.getElementById('search')
	let params = new URLSearchParams({
		name: input.value,
	})
	let response = await fetch('http://127.0.0.1:8000/api/workout/?'+params)
	let data = await response.json() 
	
	let ar = document.getElementById('cardAr')
	ar.innerHTML = ''
	for(let el of data){
		let newEl = document.createElement('div')
		subEnds = el.description.length - Math.floor(el.description.length / 2)
		newEl.innerHTML=`
				<div class="card w-75 col-md-3">
				  <div class="card-body">
					<h5 class="card-title"> ${ el.name } </h5>
					<p class="card-text">${ el.description.substring(0, subEnds) }... </p>
					<a href="${ el.get_absolute_url }" class="btn btn-primary">Подробнее &raquo </a>
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