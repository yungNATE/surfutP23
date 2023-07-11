// Get all photos from media folder
let webAppID = "AKfycbwdCUqGrw5te7hVBo74GNy91aDo2-tKB0Y9e9KLSzWiNM_C7OTliaurBOHl8qdLUFXz";
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
  

fetchData(webAppUrl).then((data) => { document.querySelector('.gallery').innerHTML = buildGallery(data) });

function buildGallery(data, level = 2) {
    var galleryHTML = '';
  
    for (var key in data) {
      if (Object.keys(data[key]).length === 0) {
        continue; // Ignorer les dossiers vides
      }
  
      galleryHTML += `<div class="folder"><h${level}>${key}</h${level}>`;
  
      if (typeof data[key].photos !== 'undefined') {
        galleryHTML += '<div class="photo-gallery">';
  
        for (var i = 0; i < data[key].photos.length; i++) {
          var photo = data[key].photos[i];
        //   galleryHTML += '<img src="https://drive.google.com/drive/folders/' + photo.id + '" alt="' + photo.name + '">';
          galleryHTML += `<img src="https://drive.google.com/uc?export=view&id=${photo.id}" loading="lazy" alt="${photo.name}">`;
        }
  
        galleryHTML += '</div>';
      } else {
        galleryHTML += buildGallery(data[key], level + 1);
      }
  
      galleryHTML += '</div>';
    }
  
    return galleryHTML;
}
  