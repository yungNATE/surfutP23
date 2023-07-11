// Get all photos from media folder
let webAppID = "AKfycbwR1gOmKKWQlaRSkVI63lIzP_n37iwJB0P8Ij7or9_rUSzWSBv8vqg6svQfYpLtiZbveA";
let webAppUrl = `https://script.google.com/macros/s/${webAppID}/exec`;

async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(data);
      
    } catch (error) {
      console.error(error);
    }
}
  
fetchData(webAppUrl);
