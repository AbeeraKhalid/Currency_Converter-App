
// 1
const dropList = document.querySelectorAll(".drop_lists select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i= 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
       
        // selecting USD by default as FROM currency and AFN as TO currency
        let selected ;
        if( i == 0 ){
            selected= currency_code == "USD" ? "selected" : "" ;
         }else if(i == 1)
            { 
            selected= currency_code == "PKR" ? "selected" : "";
            }
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    //6
    dropList[i].addEventListener("change", e =>{
         loadFlag(e.target); // calling loadFlag with passing target element as an argument
     });
    }
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){ // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src =`https://flagsapi.com/${country_list[code]}/flat/64.png`}
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});
//2
getButton.addEventListener("click", e =>{
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});
//7
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency); // calling loadFlag with passing select element (toCurrency) of TO
    getExchangeRate(); // calling getExchangeRate
})
//3
function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    //5
    exchangeRateTxt.innerText = "Getting exchange rate...";
    //4
    let url = `https://v6.exchangerate-api.com/v6/78e09dbc29ceb408ee671938/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
        
     fetch(url).then(response => response.json()).then(result =>{
        // console.log(result);})
        let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
        //console.log(exchangeRate); })  
          let totalExchangeRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
 // console.log(totalExchangeRate);   }) 
         const exchangeRateTxt = document.querySelector("form .exchange-rate");  
          exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
   })
.catch(() =>{ // if user is offline or any other error occured while fetching data then catch function will run
         exchangeRateTxt.innerText = "Something went wrong";
});      
 }