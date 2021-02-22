       const urlParams = new URLSearchParams(window.location.search);
       const id = urlParams.get("id");

       const medieurl = "https://kbhsteder-1f70.restdb.io/media/";
       let sted;
       const myHeaders = {
           "x-apikey": "602f89cb5ad3610fb5bb63c7"
       }

       console.log("ID", id);
       document.addEventListener("DOMContentLoaded", loadJSON)

       async function loadJSON() {
           const JSONData = await fetch(`https://kbhsteder-1f70.restdb.io/rest/steder/${id}`, {
               headers: myHeaders
           });
           sted = await JSONData.json();

           console.log("steder", sted);
           visSted(sted);
       }

       function visSted() {
           document.querySelector(".billede").src = medieurl + sted.billede;
           document.querySelector(".navn").textContent = sted.navn;
           document.querySelector(".kategori").textContent = sted.kategori;
           document.querySelector(".langbeskrivelse").textContent = sted.langbeskrivelse;
           document.querySelector(".adresse").textContent = `${"Adresse: "}` + sted.adresse;
           document.querySelector("button").addEventListener("click", tilbageTilSted);
       }

       function tilbageTilSted() {
           history.back();
       }
