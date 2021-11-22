/*previsualizar imagenes subidas con multer*/

const db = require('../../src/database/models')

document.getElementById("validatedCustomFile").onchange = function (e) {
  // Creamos el objeto de la clase FileReader
  let reader = new FileReader();

  // Leemos el archivo subido y se lo pasamos a nuestro fileReader
  reader.readAsDataURL(e.target.files[0]);

  // Le decimos que cuando este listo ejecute el código interno
  reader.onload = function () {
    let preview = document.getElementById('img-preview'),
      image = document.createElement('img');


    image.src = reader.result;

    preview.innerHTML = '';
    preview.append(image);
  };
}

