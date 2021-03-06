const backButtonHeader = document.querySelector(".card-header");
const backButtonEl = document.querySelector(".back_button");

const resetButtonEl = document.querySelector(".reset_button");
const inputEl = document.querySelector(".myText");
const inputEl2 = document.querySelector(".myText_two");
const inputEl3 = document.querySelector(".myText_three");
const outputEl = document.querySelector(".output");

const exButtonEl = document.querySelector(".example_button");
const exButtonEl2 = document.querySelector(".example_button_two");
const liEls = document.querySelectorAll("li");


/* ### KEEP URL PARAMETERS WHEN GOING TO ANOTHER PAGE & SHOW BACK BUTTON */
const allLinks = document.querySelectorAll("a");

if(allLinks && window.location.search != "") {
	allLinks.forEach(function(element) {
		if(element != backButtonEl && !element.getAttribute("href").startsWith("#")) { //Don't change the back button url and don't change anchor links
			element.setAttribute("href", element.getAttribute("href") + window.location.search);
		}
	});
	const searchParams = new URL(location.href).searchParams;
	const srcName = searchParams.get('srcname');
	const srcURL = searchParams.get('src');
	if(srcName && srcURL) {
		backButtonEl.innerHTML = "<i class='fas fa-long-arrow-alt-left'></i> Terug naar " + srcName;
		if(srcURL.startsWith("file://") && !window.location.href.startsWith("file://")) {
			backButtonEl.addEventListener("click", function() {
				alert("Helaas, webpagina's die op een server gehost worden mogen niet verwijzen naar lokale bestanden. Je kunt zelf de volgende URL bezoeken:\n\n" + srcURL);
			});
		} else {
			backButtonEl.href = srcURL;
		}
		backButtonHeader.classList.remove("hidden");
	}
}

//Als iemand iets invoert in de eerste input:
if(inputEl) {
	inputEl.addEventListener('input', function() {
		showTextOutput();
	});
}

//Als iemand iets invoert in de tweede input:
if(inputEl2) {
	inputEl2.addEventListener('input', function() {
		showTextOutput();
	});
}

//Als iemand iets invoert in de derde input:
if(inputEl3) {
	inputEl3.addEventListener('input', function() {
		showTextOutput();
	});
}

/* ### WHEN USER CLICKS ON RESET BUTTON */
if (resetButtonEl) { 
    resetButtonEl.addEventListener("click", function() {
        inputEl.value = 0;
        inputEl2.value = 0;
        inputEl3.value = 0;
		showTextOutput(); //Show output
    });
}

/*Bereken het banksaldo na rente na (ingevoerd) aantal jaar*/
function calculateWalletAfterInterest(wallet, rate, period) { //args ???, %, years
	let realRate = 0.01 * rate; //example: ???100,- ?? 1,04510^year aka 4,51% interest/year
	return parseFloat(wallet) * Math.pow(parseFloat(1 + realRate), parseFloat(period)); //remove parseFloat maybe
}

/*Bereken de gemiddelde rente per jaar*/
function calculateAvgInterest(wallet, walletAfter, period) {
	return (walletAfter - wallet) / period;
}

/*Converteer naar een eurobedrag (afgerond op 2 decimalen) met komma's in plaats van punten als die aanwezig zijn.*/
function convertToMoneyString(wallet) {
	return "???" + Math.abs(wallet).toFixed(2).toString().replace(".", ",");
}

/*Toon de uitkomst op het scherm*/
function showTextOutput() {
	let wallet = inputEl.value;
	let rate = inputEl2.value;
	let period = inputEl3.value;
	
	let walletAfter = calculateWalletAfterInterest(wallet, rate, period);
	let avgInterest = calculateAvgInterest(wallet, walletAfter, period);
	
	let keyword = (rate < 0)?"betaald":"gehad";

	let showError = false;
	
	if(wallet == "" || rate == "" || period == "") {
		outputEl.innerHTML = "Je hebt niet alle velden (correct) ingevuld.";
		showError = true;
	} else if(period < 0) { //Rente kan negatief zijn, periode natuurlijk niet. Deze calculator houdt geen rekening met rood staan.
		outputEl.innerHTML = "Het aantal jaar mag niet negatief zijn.";
		showError = true;
	} else if(wallet < 0) { //Rente kan negatief zijn, periode natuurlijk niet. Deze calculator houdt geen rekening met rood staan.
		outputEl.innerHTML = "Deze calculator houdt geen rekening met een negatief banksaldo.";
	} else if(period == 0) {
		outputEl.innerHTML = `Je hebt datzelfde jaar hetzelfde saldo.`;
	} else if(wallet == 0) {
		outputEl.innerHTML = `Je hebt na ${ period } jaar nog steeds niks.`;
	} else if(rate == 0) {
		outputEl.innerHTML = `Je hebt na ${ period } jaar nog steeds hetzelfde bedrag.`;
	} else {
		outputEl.innerHTML = `Na ${ period } jaar heb je ${ convertToMoneyString(walletAfter) } op je rekening staan.
		Je hebt dan elk jaar gemiddeld ${ convertToMoneyString(avgInterest) } rente ${ keyword }.`;
	}
	if(showError) {
		console.error(outputEl.innerHTML);
		outputEl.classList.add("text-danger");
	} else {
		console.log(outputEl.innerHTML);
		if(outputEl.classList.contains("text-danger")) {
			outputEl.classList.remove("text-danger");
		}
	}
}

if(inputEl && inputEl2 && inputEl3) { //Als de invoervelden op de pagina staan
	showTextOutput(); //Toon als de pagina geladen wordt de eventuele gecachte waardes
}

if(exButtonEl && liEls) {
	exButtonEl.addEventListener("click", function() {
        liEls.forEach(function(element, index) {
			alert("Kwaliteit " + (index + 1) + " is: " + element.innerHTML);
		});
    });
}

if(exButtonEl2) {
	exButtonEl2.addEventListener("click", function() {
		spamExample();
    });
}
