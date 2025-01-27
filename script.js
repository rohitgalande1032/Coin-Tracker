let tableBody = document.querySelector(".table-body");

//fetch data using .then

// fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
// .then(response => response.json())
// .then(data => {
//     console.log(data);
//     renderTable(data)
// })

//Fetch Data Using Async/await

async function fetchCoinData() {
  try {
    let url = 'data.json';
    let response = await fetch(url);
    let data = await response.json();
    renderTable(data);
    console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}


function renderTable(arr) {
  arr.map((item) => {
    let price_change_24h = parseFloat(item.price_change_24h).toFixed(2);
    tableBody.innerHTML += `
            <tr>
                <td><div class="name-section"><img src="${item.image}"> <p>${item.name}</p></div></td>
                <td>${item.symbol.toUpperCase()}</td>
                <td>${item.current_price}</td>
                <td>${item.total_volume}</td>
                <td class="color-change">${price_change_24h}%</td>
                <td>Mkt cap: ${item.market_cap}</td>
            </tr>
            
        `;
        let colorChange = document.querySelector('.color-change');
        if(price_change_24h < 0) {
            colorChange.style.color = "red";
        }else {
            colorChange.style.color = "green";
        }
           
  });
}


function searchByNameOrSymbol() {
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        let searchInput = document.querySelector("#search").value.toLowerCase();
        console.log(searchInput)
        let filteredData = data.filter((item)=>{
            if(item.name.toLowerCase().includes(searchInput) || item.symbol.toLowerCase().includes(searchInput)){
                return item;
            }
        })
        tableBody.innerHTML = '';
        renderTable(filteredData);
    })
}

function sortByMarketCap() {
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        let sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
        console.log("Sorted data by Market Cap");

        tableBody.innerHTML = '';
        renderTable(sortedData);
    })
}

function sortByPercentageChange() {
    fetch("data.json")
    .then(response => response.json())
    .then(data=> {
        let sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        console.log("Sorted data by Percentage Change");

        tableBody.innerHTML = '';
        renderTable(sortedData);
    })
}


fetchCoinData();