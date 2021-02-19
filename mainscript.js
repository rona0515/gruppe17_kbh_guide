 const header = document.querySelector("header h1");
 //        const url = "https://kbhsteder-1f70.restdb.io/rest/steder"
 const medieurl = "https://kbhsteder-1f70.restdb.io/media/";
 const myHeaders = {
     "x-apikey": "602f89cb5ad3610fb5bb63c7"
 }

 document.addEventListener("DOMContentLoaded", start)
 let steder;
 let filter = "alle";

 //første funktion der kaldes efter Dom er loaded

 function start() {
     console.log("DOM er loadet");
     const filterKnapper = document.querySelectorAll("nav button");
     filterKnapper.forEach(knap => knap.addEventListener("click", filtrerSteder));
     loadJSON();
 }

 function filtrerSteder() {
     filter = this.dataset.kategori;
     console.log("filter", filter);
     document.querySelector(".valgt").classList.remove("valgt");
     this.classList.add("valgt")
     visSteder();
     header.textContent = this.textContent;
 }


 async function loadJSON() {
     const JSONData = await fetch("https://kbhsteder-1f70.restdb.io/rest/steder", {
         headers: myHeaders
     });
     steder = await JSONData.json();
     console.log("steder", steder);
     visSteder();
 }

 function visSteder() {
     //            console.log("vis");
     //            console.log(json);

     const dest = document.querySelector("#liste");
     const skabelon = document.querySelector("template").content;
     dest.textContent = "";
     steder.forEach(sted => {
         if (filter == sted.bydel || filter == "alle") {
             const klon = skabelon.cloneNode(true);
             klon.querySelector(".billede").src = medieurl + sted.billede[0];
             klon.querySelector(".navn").textContent = sted.navn;
             //                    klon.querySelector(".kortbeskrivelse").textContent = sted.kortbeskrivelse;
             klon.querySelector(".adresse").textContent = `${"adresse: "}` + sted.adresse;
             klon.querySelector(".kategori").textContent = `${"kategori: "}` + sted.kategori;

             klon.querySelector(".steder").addEventListener("click", () => visDetaljer(sted));

             dest.appendChild(klon);
         }
     })
 }

 function visDetaljer(hvad) {
     location.href = `singleview.html?id=${hvad._id}`;

 }
