 const header = document.querySelector("header h1");
 //        const url = "https://kbhsteder-1f70.restdb.io/rest/steder"
 const medieurl = "https://kbhsteder-1f70.restdb.io/media/";
 const myHeaders = {
     "x-apikey": "602f89cb5ad3610fb5bb63c7"
 }

 document.addEventListener("DOMContentLoaded", start)
 let steder;
 let filter = "alle";
 let counter = 0;


 //første funktion der kaldes efter Dom er loaded

 var myIndex = 0;


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
     setTimeout(carousel, 5000); // Change image every 2 seconds
 }

 function start() {
     console.log("DOM er loadet");
     const filterKnapper = document.querySelectorAll("nav button");
     filterKnapper.forEach(knap => knap.addEventListener("click", filtrerSteder));
     loadJSON();
     carousel();
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
             klon.querySelector(".kortbeskrivelse").textContent = sted.kortbeskrivelse;
             klon.querySelector(".adresse").textContent = `${"Adresse: "}` + sted.adresse;
             klon.querySelector(".kategori").textContent = sted.kategori;

             klon.querySelector(".steder").addEventListener("click", () => visDetaljer(sted));

             dest.appendChild(klon);
         }
     })
 }

 function visDetaljer(hvad) {
     location.href = `singleview.html?id=${hvad._id}`;

 }
