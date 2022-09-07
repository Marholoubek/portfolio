let _CONTENT = [  
	"full-stack Developer", 
	"based in Copenhagen and Prague", 
	"Web and Mobile Applications", 
	"Databases, authentication, security...",
	"+ I can learn anything for you",
];

let _PART = 0;

let _PART_INDEX = 0;

let _INTERVAL_VAL;

let _ELEMENT = document.querySelector("#text");

let _CURSOR = document.querySelector("#cursor");

function Type() { 
	let text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX++;

	if(text === _CONTENT[_PART]) {
		_CURSOR.style.display = 'none';

		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 50);
		}, 1000);
	}
}

function Delete() {
	let text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		if(_PART === (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		
		_PART_INDEX = 0;

		setTimeout(function() {
			_CURSOR.style.display = 'inline-block';
			_INTERVAL_VAL = setInterval(Type, 100);
		}, 200);
	}
}
_INTERVAL_VAL = setInterval(Type, 100);