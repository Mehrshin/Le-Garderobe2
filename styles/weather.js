// API key used for open weather
var apiKey = "4a0c45de0a18b5d4628b3d567ab7e55f";
var searchKey = "";

$(document).ready(function(){
    $("#submit").click(function(){
        var location = $("#location").val();
        // check if zip code or city
        if (!isNaN(location)){
            searchKey = "zip";
        } else {
            searchKey = "q";
        }
        // check if text area had data
        if(location != ""){
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?' + 
                searchKey + '=' + location + '&units=metric&appid=' + apiKey,
                dataType:"jsonp",
                type:"GET",
                success: function(data){
                    var result = outputData(data);
                    $("#outputData").html(result);
                    $("#outputData").val('');
                }
            })
        }
    })
})

function outputData(data){
    // return the html string of all the desired data
    return "<div><p></p>Weather in " + data.name +
    "<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png' width= 100px>" +
    "<br></br>" +
    "Condition: " + data.weather[0].description + "<br>" +
    "Temperature: " + data.main.temp + " &deg;C <br>" +
    "Feels Like: " + data.main.feels_like + " &deg;C <br>" +
    "High: " + data.main.temp_max + " &deg;C <br>" +
    "Low: " + data.main.temp_min + " &deg;C <br>" +
    "Wind Speed: " + data.wind.speed + " m/s </div>";
}
