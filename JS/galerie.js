// Lightbox 
import "../node_modules/fslightbox/index.js"


// Get all photos from media folder
let webAppID = "AKfycbwJoDYs2kKshvon1hUpUE8yjOXhfAg0ARW43Y3R7BqIKqWRXJW0dm_w_KgAdoB8hHjtzw";
let webAppUrl = `https://script.google.com/macros/s/${webAppID}/exec`;

async function fetchData(url) {
    console.info("Fetching data from " + url);
    try {
        const response = await fetch(url);
        const responseJSON = await response.json();
        const data = responseJSON.data;
    
        console.log(data[Object.keys(data)[0]]);

        return data[Object.keys(data)[0]]; // permet d'évacuer le dossier racine
       
    } catch (error) {
        alert("Une erreur est survenue, recharge la page.");
        console.error(error);
    }
}

let foldersDiv = document.querySelector(".folders");
fetchData(webAppUrl).then((data) => { buildGallery(data, 2, foldersDiv) });

function buildGallery(data, level = 2, parent = null) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      // Ajouter le titre et l'iframe au DOM
      const title = document.createElement(`h${level}`);
      title.textContent = key;

      // Créer la div pour les dossiers avec ID
      const div = document.createElement('div');
      div.classList.add('folder');
      div.id = key; // todo : sanitize
      div.appendChild(title);
      parent == null ?
        document.body.appendChild(div) :
        parent.appendChild(div);
      
      if (value.hasOwnProperty("id")) { // Créer l'iframe avec l'ID correspondant
        const iframe = document.createElement('iframe');
        iframe.src = `https://drive.google.com/embeddedfolderview?id=${value.id}#grid`;
        iframe.title = `Niveau ${level} : ${key}`;
        div.appendChild(iframe);

      } else { // Appeler récursivement la fonction pour les sous-dossiers
        buildGallery(value, level + 1, div);
      }
    }
  }
}


  