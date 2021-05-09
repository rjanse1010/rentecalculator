const inputEl = document.querySelector(".myText");
const inputEl2 = document.querySelector(".myText_two");
const inputEl3 = document.querySelector(".myText_three");
const outputEl = document.querySelector(".output");

//Als iemand iets invoert in de eerste input:
inputEl.addEventListener('input', function() {
	showTextOutput();
});

//Als iemand iets invoert in de tweede input:
inputEl2.addEventListener('input', function() {
	showTextOutput();
});

//Als iemand iets invoert in de derde input:
inputEl3.addEventListener('input', function() {
	showTextOutput();
});

function calculateWalletAfterInterest(wallet, rate, period) { //args €, %, years
	let realRate = 0.01 * rate; //example: €100,- × 1,04510^year
	return parseFloat(parseFloat(wallet) * Math.pow(parseFloat(1 + realRate), parseFloat(period))); //remove parsefloat maybe
}

function calculateAvgInterest(wallet, walletAfter, period) {
	return (walletAfter - wallet) / period;
}

function convertToMoneyString(wallet) {
	return "€" + Math.abs(wallet).toFixed(2).toString().replace(".", ",");
}

function showTextOutput() {
	let wallet = inputEl.value;
	let rate = inputEl2.value;
	let period = inputEl3.value;
	
	let walletAfter = calculateWalletAfterInterest(wallet, rate, period);
	let avgInterest = calculateAvgInterest(wallet, walletAfter, period);
	
	let keyword = (rate < 0)?"betaald":"gehad";
	
	if(period < 0) { //Rente kan negatief zijn, periode natuurlijk niet. Deze calculator houdt geen rekening met rood staan.
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
}

showTextOutput(); //Show text immediately for cached input values