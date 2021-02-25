function get_data() {
    
    let state = document.getElementById("state_input").value;
    
    let commuteTime = document.getElementById("commute_time");
    let income = document.getElementById("income");
    let taxes = document.getElementById("taxes");
    // population
    let pop = document.getElementById("population");
    let vets = document.getElementById("vets");
    
    console.log("state: " + state);
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
            for (let i = 0; i < json.data.length; i++) {
                if (json.data[i].State === state) {
                    console.log(json.data[i].State);
                    index = i;
                    break;
                }
            }
            
            let averageCommuteTime = "<p>Average commute time: " + (Math.round(json.data[index]["Average Commute Time"] * 100) / 100) + " minutes</p>";
            let averageIncome = "<p>Average income: $" + (Math.round(json.data[index]["Average Income"] * 100) / 100).toLocaleString("en-US") + "</p>";
            let updatedYear = "<p>Updated year: " + json.data[index].Year + "</p>";
            let realEstateTaxes = "<p>Real Estate Taxes by Mortgage: $" + json.data[index]["Real Estate Taxes by Mortgage"].toLocaleString("en-US") + "</p>";
            let population = "<p>Population: " + json.data[index]["Total Population"].toLocaleString("en-US") + "</p>";
            let veterans = "<p>Veteran Population: " + json.data[index].Veterans.toLocaleString("en-US") + "</p>";
        
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
