
let map = L.map('map').setView([36.7201600, -4.4203400], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);


let plantilla = document.querySelector("template");
let contenido = document.querySelector("#contenido");
let id = 0;

fetch("https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json?classId=a44f2eea-e51b-4a7a-a11a-eefc73428d1a&assignmentId=b6d46e1e-b651-43e1-b861-1d6ba465dd82&submissionId=c773ff20-ba3d-cf9e-1095-93f6fedc73c5") 
 .then(response => response.json())
  .then(data => {
   data.forEach( function(elemento){
    let contenedor = document.createElement("div");
    contenedor.classList.add('localizacion')
    let localizacion = plantilla.content.cloneNode(true);
    localizacion.querySelector("h3").innerText = elemento.properties.nombre;
    localizacion.querySelector("p").innerText = elemento.properties.horario;
    localizacion.querySelector("#direccion").innerText = elemento.properties.direccion;
    localizacion.querySelector("#telefono").innerText = elemento.properties.telefono;
    localizacion.querySelector("button").setAttribute("id",id);
   

    

    let x = elemento.properties.x;
    let y = elemento.properties.y;
  
    let marker = L.marker([x, y]).addTo(map);
    let label = '<b>' + elemento.properties.nombre + '</b><br/>' + elemento.properties.direccion;
    
    marker.bindPopup(label);
    contenedor.appendChild(localizacion);
    contenido.appendChild(contenedor);
    id++
    });

   })
    .catch( 
      err => {alert("Hubo error: " + err +".")}
      );

