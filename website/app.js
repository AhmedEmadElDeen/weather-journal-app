/* Global Variables */
const zipCode = document.getElementById('zip');
const userFeelings = document.getElementById('feelings');
const currentDate = document.getElementById('date');
const currentTemp = document.getElementById('temp');
const userResponse = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = +d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();


// Defining personal OpenWeatherMap API url and key
let baseURL = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey = '6fb3ec4563e472807e62014f554b7202'

// Creating an event listener on the generate button
document.getElementById('generate').addEventListener('click', ()=>{

// Prompting the user to fill the fields with the appropriate information
        if(!zipCode.value || !userFeelings.value){
            alert('Kindly enter the required information into the fields.');
            return;
        };


    getApiWeather(baseURL, zipCode.value, apiKey)
            .then( data => {
                console.log(data);
                postWeatherData('/add', {
                    date:newDate,
                    temp:data.main.temp,
                    feelings:userFeelings.value,
                });

            })
        .then( () => updateUI())
    });

// Function to GET data from the Web API
const getApiWeather = async (baseURL, zipCode, apiKey) =>{
        const res= await fetch(`${baseURL}?zip=${zipCode}&appid=${apiKey}&units=metric`)
        try {
            const data = await res.json();
            return data;
        }catch(error){
            console.log('error', error);
        }
};


// Function to POST data
const postWeatherData = async ( url ='', data = {}) =>{
    console.log(data);
    const response = await fetch(url, {
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(data)
    });
    try{
        const gatheredData = await response.json();
        console.log(gatheredData);
        return gatheredData;
    }catch(error) {
        console.log('error', error);
    }
};

//Function to fetch data from the app endpoint and update the UI
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        console.log(allData);
        currentDate.innerHTML = "Today's date is " + allData.date;
        currentTemp.innerHTML = "Current Temperature is approximately " + allData.temp + " °C";
        userResponse.innerHTML = "You feel " + allData.feelings;

    }catch(error){
        console.log('error', error);
    }
};