const resetButtonEl = document.querySelector(".reset_button");
const inputEl = document.querySelector(".myText");
const inputEl2 = document.querySelector(".myText_two");
const inputEl3 = document.querySelector(".myText_three");
const outputEl = document.querySelector(".output");

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
function calculateWalletAfterInterest(wallet, rate, period) { //args €, %, years
	let realRate = 0.01 * rate; //example: €100,- × 1,04510^year aka 4,51% interest/year
	return parseFloat(wallet) * Math.pow(parseFloat(1 + realRate), parseFloat(period)); //remove parseFloat maybe
}

/*Bereken de gemiddelde rente per jaar*/
function calculateAvgInterest(wallet, walletAfter, period) {
	return (walletAfter - wallet) / period;
}

/*Converteer naar een eurobedrag (afgerond op 2 decimalen) met komma's in plaats van punten als die aanwezig zijn.*/
function convertToMoneyString(wallet) {
	return "€" + Math.abs(wallet).toFixed(2).toString().replace(".", ",");
}

/*Toon de uitkomst op het scherm*/
function showTextOutput() {
	let wallet = inputEl.value;
	let rate = inputEl2.value;
	let period = inputEl3.value;
	
	let walletAfter = calculateWalletAfterInterest(wallet, rate, period);
	let avgInterest = calculateAvgInterest(wallet, walletAfter, period);
	
	let keyword = (rate < 0)?"betaald":"gehad";
	
	if(wallet == "" || rate == "" || period == "") {
		outputEl.innerHTML = "Je hebt niet alle velden ingevuld.";
	} else if(period < 0) { //Rente kan negatief zijn, periode natuurlijk niet. Deze calculator houdt geen rekening met rood staan.
		outputEl.innerHTML = "Het aantal jaar mag niet negatief zijn.";
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
	console.log(outputEl.innerHTML);
}

showTextOutput(); //Toon als de pagina geladen wordt de gecachte waardes