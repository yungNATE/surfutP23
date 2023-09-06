// Lightbox 
import "../node_modules/three/build/three.min.js"
import "../node_modules/panolens/build/panolens.js"

const panorama = new PANOLENS.ImagePanorama( '../CSS/img/field.jpg' );
const viewer = new PANOLENS.Viewer();
viewer.add( panorama );