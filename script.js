const APIKEY = ""; // Please insert your API key here 

const stockName = document.querySelector("#name");
const price = document.querySelector("#price");
const frame = document.querySelector("img");

const showPrice = (name) => {
    fetch("https://finnhub.io/api/v1/quote?symbol=" + name + APIKEY)
    .then((response) => {
        if(response.ok){ return response; }
        throw Error(response.statusText);
    }).then(response => response.json())
    .then(data => {
        stockName.innerHTML = name;
        let stock = Object.entries(data);
        let current = stock[0][1].toFixed(2);
        let high = stock[3][1].toFixed(2);
        let low = stock[4][1].toFixed(2);
        let open = stock[5][1].toFixed(2);
        let difference = current - open;

        if (difference < 0) {
            price.innerHTML = `Current Price: $${current} (<span> - $${Math.abs(difference)} </span>) 
                          <br><br> Open: $${open} 
                          <br><br> Today's high: $${high} <br> Today's low: $${low}`;
                          document.querySelector("span").style.color = "red";
        } else {
            price.innerHTML = `Current Price: $${current} (<span> + $${Math.abs(difference)} </span>) 
                          <br><br> Open: $${open} 
                          <br><br> Today's high: $${high} <br> Today's low: $${low}`;
                          document.querySelector("span").style.color = "limegreen";     
        }

        showProfile(name);
    }).catch(e => console.log("There was an error"));
}

const showProfile = (name) => {
    fetch("https://finnhub.io/api/v1/stock/profile2?symbol="+name+"&token=btsi2mv48v6tbbfivfn0")
    .then((response) => {
        if(response.ok){ return response; }
        throw Error(response.statusText);
    }).then(response => response.json())
    .then(data => {
        let profile = Object.entries(data);
        stockName.innerHTML = `${profile[7][1]}`;
        document.querySelector("a").href = profile[11][1];
        let img = profile[5][1];
        frame.src = img;
        frame.alt = profile[7][1];
    }).catch (e => console.log("There was an error"));
}

const light = () => {
    document.body.style.background = "white";
    document.body.style.color = "#454545"; 
    document.querySelector("a").style.color = "#454545";
    document.querySelector("select").style.color = "#454545";
    document.querySelector("select").style.background = "white";
}

const dark = () => {
    document.body.style.background = "#454545";
    document.body.style.color = "white"; 
    document.querySelector("a").style.color = "white";
    document.querySelector("select").style.color = "white";
    document.querySelector("select").style.background = "#454545"; 
}


showPrice("AAPL");

const choose = document.getElementById("choose");

choose.addEventListener("change", function(evt) {
    showPrice(evt.target.value);
});
