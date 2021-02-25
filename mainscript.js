//medieurl og x-apikey indsættes og defineres
const header = document.querySelector("header h1");
const medieurl = "https://kbhsteder-1f70.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602f89cb5ad3610fb5bb63c7"
}

//DOM content skal loades og variabler bliver defineret
document.addEventListener("DOMContentLoaded", start)
let steder;
let filter = "alle";
let counter = 0;


/*-----------SLIDESHOW----------*/
var myIndex = 0;

//kode lånt fra W3 schools, for i betyder forEach
function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 5 seconds
}

/*-------------------BURGER-MENU---------------*/

window.addEventListener("load", sidenVises);

// funktionen lytter efter klik på burgermenuen
function sidenVises() {
    console.log("sidenVises");
    document.querySelector(".burger").addEventListener("click", toggleMenu);
}

// funktionen toggler burgermenuen så den slåes til og fra
function toggleMenu() {
    console.log("toggleMenu");
    const burger = document.querySelector('.burger');

    document.querySelector(".nav-btns").classList.toggle("nav-active");

    //mulighed for at toggle på burger kryds, får tildelt klassen toggle
    burger.classList.toggle('toggle');
}

/*-------------------FILTRERING FUNKTIONER---------------*/


//DOM er loadet, vi hiver fat i alle filtrerknapper og giver dem hver især er  eventlistener så de kan klikkes på
function start() {
    console.log("DOM er loadet");
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerSteder));
    loadJSON();
    carousel();
}

// filtrering af steder defineres og fjerner valgt classen og tilføjer igen
function filtrerSteder() {
    filter = this.dataset.kategori;
    console.log("filter", filter);
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt")
    visSteder();
    header.textContent = this.textContent;
}

//asynkron funktion hvor Json fetches og data hentes ned
async function loadJSON() {
    const JSONData = await fetch("https://kbhsteder-1f70.restdb.io/rest/steder", {
        headers: myHeaders
    });
    steder = await JSONData.json();
    console.log("steder", steder);
    visSteder();
}

// tekst og billeder bliver sat ind fra restDB
function visSteder() {
    const dest = document.querySelector("#liste");
    const skabelon = document.querySelector("template").content;
    dest.textContent = ""; //HTML containeren tømmes så der kan fyldes nyt indhold i den
    steder.forEach(sted => {
        //her loopes der igennem arrayet
        if (filter == sted.bydel || filter == "alle") {
            const klon = skabelon.cloneNode(true); //templaten bliver klonet og der kommer nyt indhold i den fra restdb
            klon.querySelector(".billede").src = medieurl + sted.billede[0];
            klon.querySelector(".navn").textContent = sted.navn;
            klon.querySelector(".kortbeskrivelse").textContent = sted.kortbeskrivelse;
            klon.querySelector(".adresse").textContent = `${"Adresse: "}` + sted.adresse;
            klon.querySelector(".kategori").textContent = sted.kategori;

            klon.querySelector(".steder").addEventListener("click", () => visDetaljer(sted));

            dest.appendChild(klon); //Klonen tilføjes til DOM'en
        }
    })
}

//der linkes til singleview med det specifikke ID
function visDetaljer(hvad) {
    location.href = `singleview.html?id=${hvad._id}`;

}
