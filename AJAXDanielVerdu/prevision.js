$(document).ready(function () {


    $('#boton').click(function () {
        return mostrarTiempo();


    });


    function mostrarTiempo() {
        var ciudad = $("#ciudad").val();
        var dias = $("#dias").val();

        if (ciudad != '' & dias != '') {

            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/forecast/?q=' + ciudad + "&units=metric" + "&cnt=" + dias + "&APPID=a25218eabcdad00ce292e2962c8c4227",
                type: "GET",
                DataType: "jsonp",
                success: function (data) {
                    var tabla = '';

                    for (var i = 0; i < data.list.length; i++) {
                        tabla += '<tr>';
                        tabla += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";
                        tabla += '<td>' + data.list[i].weather[0].main + "</td>";
                        tabla += '<td>' + data.list[i].weather[0].description + '</td>';
                        tabla += '<td>' + data.list[i].main.temp_min + '&deg;C</td>';
                        tabla += '<td>' + data.list[i].main.temp_max + '&deg;C</td>';
                        tabla += '<td>' + data.list[i].main.pressure + 'hpa</td>';
                        tabla += '<td>' + data.list[i].main.humidity + '%</td>';
                        tabla += '<td>' + data.list[i].wind.speed + 'm/s</td>';
                        tabla += '<td>' + data.list[i].wind.deg + '&deg;</td>';

                        tabla += "</tr>";


                    }
                    $("#previsiontiempo").html(tabla);
                    $("#ciudad").val();
                    $("#dias").val();

                }


            });


        } else {
            $("#error").html('El campo no puede estar vacío');

        }


    }
});
