function get_data() {
    
    let city = document.getElementById("city_input").value;
    let state = document.getElementById("state_input").value;
    let country = document.getElementById("country_input").value;
    
    let request = "http://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=" + country + "&key=16324c69-a36d-426b-ad59-415432683d67";
    
    fetch(request)
        .then(function(res) {
            if (res.status != 200) {
                if (res.statusText == "Not Found") {
                    document.getElementById("results").innerHTML = "<p>Location not found. Please try again. Perhaps the state is not spelled out? Perhaps there is no data for this location</p>";
                } else {
                    document.getElementById("results").innerHTML = "<p>Error calling IQ Air API service: " + res.statusText + "</p>";
                }
                return {
                    text: "Error calling IQ Air API service: " + res.statusText
                }
            } else {
                return res.json();
            }
        }).then(function(json) {
            // temp is returned in celcius, so convert to fahrenheit
            let temp = Math.ceil(((json.data.current.weather.tp * 1.800) + 32.00) * 100) / 100;
            let timestamp = json.data.current.weather.ts;
            // windspeed in m/s
            let windspeed = Math.ceil(json.data.current.weather.ws * 100) / 100;
        
            document.getElementById("results").innerHTML = '<p>US Air Quality Index (AQI): <strong>' + json.data.current.pollution.aqius + '</strong></p><p>Main pollutant: <strong>' + json.data.current.pollution.mainus.toUpperCase() + '</strong></p>' + "<p>Temperature: <strong>" + temp + " &#176;F</strong> <img src=\"https://airvisual.com/images/" + json.data.current.weather.ic + ".png\" /></p><p>Humidity: <strong>" + json.data.current.weather.hu + "%</strong></p><p>Wind Speed: <strong>" + windspeed + " m/s</strong></p><p>Updated as of <strong>" + timestamp + " GMT</strong></p>";
        });
}

function load_states(e) {
    let country = document.getElementById("country_input").value;
    
    let request = "http://api.airvisual.com/v2/states?country=" + country + "&key=16324c69-a36d-426b-ad59-415432683d67";
    
    fetch(request)
        .then(function(res) {
            if (res.status != 200) {
                document.getElementById("state_input").setAttribute("placeholder","Location not autofilled. Please try again or try manually typing in state. Perhaps the state is not spelled out? Perhaps there is no data for this location.");
                return {
                    text: "Error calling IQ Air API service: " + res.statusText
                }
            } else {
                return res.json();
            }
    }).then(function(json) {
        console.log(json);
        let text = "";
        for (let i = 0; i < json.data.length; i++) {
            text += "<option value=\"" + json.data[i].state + "\">";
        }
        
        document.getElementById("states").innerHTML = text;
    });
}

function load_cities(e) {
    let country = document.getElementById("country_input").value;
    let state = document.getElementById("state_input").value;
    
    let request = "http://api.airvisual.com/v2/cities?state=" + state + "&country=" + country + "&key=16324c69-a36d-426b-ad59-415432683d67";
    
    fetch(request)
        .then(function(res) {
            if (res.status != 200) {
                document.getElementById("city_input").setAttribute("placeholder","Location not autofilled. Please try again or try manually typing in city. Perhaps the city is not spelled correctly? Perhaps there is no data for this location.");
                return {
                    text: "Error calling IQ Air API service: " + res.statusText
                }
            } else {
                return res.json();
            }
    }).then(function(json) {
        console.log(json);
        let text = "";
        for (let i = 0; i < json.data.length; i++) {
            text += "<option value=\"" + json.data[i].city + "\">";
        }
        
        document.getElementById("cities").innerHTML = text;
    });
}