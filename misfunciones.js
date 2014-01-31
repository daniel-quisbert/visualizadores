/**
 * @author: Daniel Quisbert
 * @date: 30/01/2014
 * funciones que se utilizaran en 'mivisualizador.html'
 * en el cual se visualizarán mapas de OSM
 *
 */
"use strict";

// Variables globales uno del mapa y
// el  otro de la funcion principal init
var map, init;
/**
 * /Utilizare los puntos de referencia (boundingbox)
 * de mi país BOpenLayersIVIA ;)
 */
var bounds = new OpenLayers.Bounds(-8830162.81905630045, -2659717.96953959996, -5571796.30232330039, -1097314.84473340004);
/**
 * Variable de configuración que contendra los
 * parámetros básicos necesarios para nuestro visualizador
 */
var config = {
 projection : new OpenLayers.Projection("EPSG:900913"),
 displayProjection : new OpenLayers.Projection("EPSG:4326")
};
/**
 * funcion creadora de nuestro visualizador
 */
function crearMapa() {
 map = new OpenLayers.Map(
  "map", // nombbre del mapa 
  {
   div : 'map', // selecciona el contenedor donde se vera el mapa
   numZoomLevels : 18, // número máximo de acercamiento del mapa
   projection : config.projection, // proyección google
   displayProjection : config.displayProjection // proyección standard
  });
 /**
  * adición de los mapas como layers (capas)
  * el mapa
  */
 map.addLayers([
  new OpenLayers.Layer.OSM("Mapnik"),
  new OpenLayers.Layer.OSM(
   "Midnight Commander",
    ["http://a.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/999/256/${z}/${x}/${y}.png", 
     "http://b.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/999/256/${z}/${x}/${y}.png", 
     "http://c.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/999/256/${z}/${x}/${y}.png"], 
    { "tileOptions" : { "crossOriginKeyword" : null }
     }
  )
 ]); 
 /**
  * añadimos un control para seleccionar los mapas (layers
  *  y luego centramos el mapa con un acercamiento de 6)
  */
 map.addControl(new OpenLayers.Control.LayerSwitcher({'baseLblTitle':"Nuestros Mapas",'dataLblTitle':"Datos"}));
 map.setCenter(bounds.getCenterLonLat(), 6);
}

/**
 * funcion principal asignada en la variable init
 */
init = function() {
 /**
  * Para los que se preguntaban : 
  * para qué configuramos el proxy??, aqui lo utilizamos
  */
 OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
 /**
  * llamamos a la funcion que creara el mapa
   */
 crearMapa(); 
 
};
// lasignamos a init a la propiedad onload
// de nuestro visualizador
window.onload = init; 


