# Weather-Journal App Project

[Udacity](https://www.udacity.com/)
![Udacity Logo](https://upload.wikimedia.org/wikipedia/commons/3/3b/Udacity_logo.png)

## Overview
This project is an online weather journal application that uses a Web API to display weather information based on zip code and records the user's current emotional status.
The app is powered by:

   * HTML
   * CSS
   * Javascript
   * NodeJS

## Details

* _server.js_

     * An app endpoint JS object was created in the server file.
        ```
        projectData = {};
        ```

     * Node was installed on local machine. Express, Cors, and Body Parser were required and their instances were created in the file.
        ```
        const express = require('express')
        const app = express();

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        const cors = require('cors');
        app.use(cors());
        ```

     * A local server was created with a specific port.
        ```
        app.use(express.static('website'));

        const port = 3000;
        const server = app.listen(port, listening);

        function listening () {
            console.log(`Server is currently running on localhost: ${port}`)
        };
        ```

     * Added a GET route that returns `projectData` and a POST route that adds the incoming data to `projectData`.
     * A server-side function was used to create entries(temperature, date, user repsponse) in the app endpoint with the data recieved from the client side.
        ```
        function addData (req, res) {
        console.log(req.body);
        recievedData = {
            date: req.body.date,
            temp: req.body.temp,
            feelings: req.body.feelings,
        }
        projectData = recievedData;
        res.end()
        };
        ```

* _app.js_

     * Created API credentials on OpenWeatherMap.com and the API key was stored in the `app.js` file.
     * An asynchronous function was used to fetch the data from the Web API.
        ```
        const getApiWeather = async (baseURL, zipCode, apiKey) =>{
        const res= await fetch(`${baseURL}?zip=${zipCode}&appid=${apiKey}&units=metric`)
        try {
            const data = await res.json();
            return data;
        }catch(error){
            console.log('error', error);
        }
        };
        ```
     * Another async function was used to POST the data acquired from the Web API to the app endpoint.
        ```
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
        ```
     * Another async function to GET the desired data from the server and update the webpage with such data.
        ```
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
        ```
     * All async functions were chained in a promise and stored inside an event listener triggered by the user entering his info to add dynamicity to the app.
        ```
        document.getElementById('generate').addEventListener('click', ()=>{
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
        ```

* _index.html_

     * No changes were made to the starter code

* _style.css_

     * A few adjustments were made to the starter code to make the webpage more appealing.


### Acknowledgments

   * https://www.udacity.com/
   * https://developer.mozilla.org/en-US/
   * https://stackoverflow.com/questions
   * https://openweathermap.org/api
   * https://cssgradient.io/


**Ahmed Emad Ghodaia**  
Udacity Web Development Professional Track Student
