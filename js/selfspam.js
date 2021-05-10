function spamExample() {
    if(confirm("Wil je gespamd worden?")) {
        let msg = prompt("Met wat wil je gespamd worden? Typ een bericht:") ;
		if(msg == null) {
			alert("Fout: Bericht mag niet leeg zijn.");
			return;
		}
		let howMuch = prompt("Hoe vaak wil je gespamd worden? Typ een nummer:");
		if(parseInt(howMuch) > 0) {
			for(let i = 0; i < howMuch; i++) {
				alert(msg + "\n\nSpamvoortgang " + (i + 1).toString() + "/" + howMuch.toString()  + "\nGa door tot het eind voor een verrassing.");
			}
			for(let i = 0; i < 10; i++) {
				setTimeout(function(){ messUp() }, 500*i);
			}
		} else {
			alert("Fout: Geen nummer of een te laag nummer. Nummers mogen niet onder 1 zijn.");
		}
    }
}

let allImages;

function getRandomColor() {
	return Math.floor(Math.random()*16777215).toString(16);
}

function messUp() {
	setAllTextColors();
	switchAllImages();
}

function setAllTextColors() {
	let all = document.querySelectorAll("*");
	all.forEach(function(element) {
		//alert(element.tagName.toLowerCase());
		if(element.tagName.toLowerCase() != "img") {
			element.style.color = "#" + getRandomColor(); //CSS biedt geen ondersteuning voor randoms, daarom moet het op deze manier helaas.
			element.style.backgroundColor = "#" + getRandomColor();
		}
	});
}

function switchAllImages() {
	let imgs = document.querySelectorAll("img");
	//let elements = document.querySelectorAll("*");
	img_find();
	imgs.forEach(function(element) {
		let currIndex = Math.floor(Math.random() * allImages.length);
		element.setAttribute('src', allImages[currIndex].src);
		element.setAttribute('srcset', allImages[currIndex].srcset);
		element.setAttribute('width', allImages[currIndex].width);
		element.setAttribute('height', allImages[currIndex].height);
		allImages.splice(currIndex, 1);
	});
}

function img_find() {
    var imgs = document.querySelectorAll("img"); //Vind alle imgs op de pagina
    var imgSrcs = [];

	imgs.forEach(function(element) {
		imgSrcs.push({ //Voeg alle img sources toe als objects aan een array
			src: element.getAttribute('src'),
			srcset: element.getAttribute('srcset'),
			width: element.getAttribute('width'),
			height: element.getAttribute('height')
		});
	});

    allImages = imgSrcs;
	console.log(allImages[0]);
}

//Selfspam RGB versie 10-5-2021