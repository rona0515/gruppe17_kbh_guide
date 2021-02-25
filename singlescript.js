//der bliver lokaliseret, herefter hentes ID ned
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//medieurl og x-apikey indsættes og defineres
const medieurl = "https://kbhsteder-1f70.restdb.io/media/";
let sted;
const myHeaders = {
    "x-apikey": "602f89cb5ad3610fb5bb63c7"
}

//når DOM'en er loadet, fetches Json data
console.log("ID", id);
document.addEventListener("DOMContentLoaded", loadJSON)

//asynkron funktion hvor Json fetches og data hentes ned
async function loadJSON() {
    const JSONData = await fetch(`https://kbhsteder-1f70.restdb.io/rest/steder/${id}`, {
        headers: myHeaders
    });
    sted = await JSONData.json();

    console.log("steder", sted);
    visSted(sted);
}

// tekst og billeder bliver sat ind fra restDB
function visSted() {
    document.querySelector(".billede").src = medieurl + sted.billede;
    document.querySelector(".navn").textContent = sted.navn;
    document.querySelector(".kategori").textContent = sted.kategori;
    document.querySelector(".langbeskrivelse").textContent = sted.langbeskrivelse;
    document.querySelector(".adresse").textContent = `${"Adresse: "}` + sted.adresse;
    document.querySelector("button").addEventListener("click", tilbageTilSted);
    document.querySelector("body").style.backgroundImage = `url(${medieurl + sted.billede})`;
}

//tilbage til startsiden
function tilbageTilSted() {
    history.back();
}
