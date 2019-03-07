function llamada_ajax() {
    var ciudad = document.getElementById('ciudad').value;
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&units=metric" + "&APPID=a25218eabcdad00ce292e2962c8c4227";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var respuesta = JSON.parse(this.responseText);

            var widgtet = mostrar(respuesta);


            $("#mostrar").html(widgtet);
            $("#ciudad").val('');

            mostrar_mapa(respuesta.coord.lat, respuesta.coord.lon);



        }
        else if(this.status === 404){
            $("#mostrar").html('<h2>La ciudad no existe</h2>');
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function mostrar(data) {
    return "<h3 style='font-size: 40px; font-weight= bold;' class='text-center'>Tiempo actual para " + data.name + ", " + data.sys.country + "</h3>" +
        "<h3><strong>Tiempo</strong>: " + data.weather[0].main + "</h3>" +
        "<h3><strong>Descripción</strong>: <img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h3>" +
        "<h3><strong>Temperatura</strong>: " + data.main.temp + "&deg;C</h3>" +
        "<h3><strong>Presión atmosferica</strong>: " + data.main.pressure + " hPa</h3>" +
        "<h3><strong>Humedad</strong>: " + data.main.humidity + "%</h3>" +
        "<h3><strong>Temperatura mínima</strong>: " + data.main.temp_min + "&deg;C</h3>" +
        "<h3><strong>Temperatura máxima</strong>: " + data.main.temp_max + "&deg;C</h3>" +
        "<h3><strong>Velocidad del viento</strong>: " + data.wind.speed + " m/s</h3>" +
        "<h3><strong>Dirección del viento</strong>: " + data.wind.deg + "&deg;</h3>" +
        "<h3><strong>Longitud</strong>: " + data.coord.lon + "</h3>" +
        "<h3><strong>Latitud</strong>: " + data.coord.lat + "</h3>"


}

function mostrar_mapa(longitud, latitud){
    var element = document.getElementById("map");
    var map = new google.maps.Map(element, {
        center: new google.maps.LatLng(longitud, latitud),
        zoom: 13,
        mapTypeId: "OSM",
        mapTypeControl: true,
        streetViewControl: true});
    map.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe+x;}
            return "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
    }));
}