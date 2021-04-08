function get_data() {
    
    let state = document.getElementById("state_input").value;
    
    let commuteTime = document.getElementById("commute_time");
    let income = document.getElementById("income");
    let taxes = document.getElementById("taxes");
    // population
    let pop = document.getElementById("population");
    let vets = document.getElementById("vets");
    
    let request = "https://datausa.io/api/data?drilldowns=State&measures=Average%20Income,Total%20Population,Average%20Commute%20Time,State%20Tuition,Workforce%20Population,Veterans,Real%20Estate%20Taxes%20by%20Mortgage";
    
    fetch(request)
        .then(function(res) {
            if (res.status != 200) {
                document.getElementById("results").innerHTML = "failed";
                return {
                    text: "Error calling Data USA service: " + res.statusText
                }
            } else {
                return res.json();
            }
        }).then(function(json) {
            let index = 0;
            for (let iterator = 60; iterator < json.data.length; iterator++) {
                if (json.data[iterator].State === state) {  
                    console.log("iterator: ", iterator);
                    index = iterator;
                    console.log("index " + index);
                    break;
                }
            }
            
            //console.log("json.data = ", json.data[index]);
        
            let averageCommuteTime = "";
            let averageIncome = "";
            let realEstateTaxes = "";
            let population = "";
            let veterans = "";
            
            if (json.data[index]["Average Commute Time"]) {
                averageCommuteTime = "<p>Average commute time: <strong>" + (Math.round(json.data[index]["Average Commute Time"] * 100) / 100) + " minutes</strong></p>";
            } else {
                averageCommuteTime = "<p>No Average commute time data available for this state.</p>";
            }
            
            if (json.data[index]["Average Income"]) {
                averageIncome = "<p>Average income: <strong>$" + (Math.round(json.data[index]["Average Income"] * 100) / 100).toLocaleString("en-US") + "</strong></p>";
            } else {
                averageIncome = "<p>Average income data not available for this state.</p>"
            }
            
            let updatedYear = "<p>Updated year: <strong>" + json.data[index].Year + "</strong></p>";
            
            if (json.data[index]["Real Estate Taxes by Mortgage"]) {
                realEstateTaxes = "<p>Real Estate Taxes by Mortgage: <strong>$" + json.data[index]["Real Estate Taxes by Mortgage"].toLocaleString("en-US") + "</strong></p>";
            } else {
                realEstateTaxes = "<p>Real Estate Taxes by Mortgage data not available for this state.</p>";
            }
            
            if (json.data[index]["Total Population"]) {
                population = "<p>Population: <strong>" + json.data[index]["Total Population"].toLocaleString("en-US") + "</strong></p>";
            } else {
                population = "<p>Population data not available for this state.</p>";
            }
            
            if (json.data[index].Veterans) {
                veterans = "<p>Veteran Population: <strong>" + json.data[index].Veterans.toLocaleString("en-US") + "</strong></p>";
            } else {
                veterans = "<p>Veteran Population data not available for this state.</p>";
            }
            
        
            let text = "";
        
            if (commuteTime.checked) {
                text += averageCommuteTime;
            }
            if (income.checked) {
                text += averageIncome;
            }
            if (taxes.checked) {
                text += realEstateTaxes;
            }
            if (pop.checked) {
                text += population;
            }
            if (vets.checked) {
                text += veterans;
            }
        
            text += updatedYear;
            
            document.getElementById("results").innerHTML = text;
        });
}
