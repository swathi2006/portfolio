let btn=document.getElementById("btn");
let inp=document.getElementById("inp");
let city=document.getElementById("city");
let humidity=document.getElementById("humidity");
let wind=document.getElementById("wind");
let temp=document.getElementById("temp");
let img=document.getElementById("state");
let lat,lon;


function success(data){
    lat=data.coords.latitude;
    lon=data.coords.longitude;
    current_loc(lat,lon);
    
}
function error(){
    console.log("something occured")
}

async function data(){
let curr_data=await navigator.geolocation.getCurrentPosition(success, error);
}
data();

async function current_loc(lat,lon) {

    inp.value="Enter city name";
    let key="c864d666276cf8685a3e6290b25962eb";
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    let response=await fetch(api);
    let res=await response.json();
   

    city.innerText=res.name;
    humidity.innerText=res.main.humidity;
    wind.innerText=res.wind.speed;
    temp.innerText=res.main.temp;
  

    if(res.weather[0].main=="Clouds"){
        img.src="images/clouds.png";

    }
    else if(res.weather[0].main=="Clear"){
        img.src="images/clear.png";

    }
    else if(res.weather[0].main=="Drizzle"){
        img.src="images/drizzle.png";

    }
    else if(res.weather[0].main=="Rain"){
        img.src="images/rain.png";

    }
    else if(res.weather[0].main=="Mist"){
        img.src="images/mist.png";

    }
    else if(res.weather[0].main=="Snow"){
        img.src="images/snow.png";

    }

    
    


    
}


async function getweather(place) {

   
   
    let key="c864d666276cf8685a3e6290b25962eb";
    let api="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
    let api2=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}&units=metric`;

    let response=await fetch(api2);
    let res=await response.json();
    city.innerText=res.name;
    humidity.innerText=res.main.humidity;
    wind.innerText=res.wind.speed;
    temp.innerText=res.main.temp;
    console.log(res)

    if(res.weather[0].main=="Clouds"){
        img.src="images/clouds.png";

    }
    else if(res.weather[0].main=="Clear"){
        img.src="images/clear.png";

    }
    else if(res.weather[0].main=="Drizzle"){
        img.src="images/drizzle.png";

    }
    else if(res.weather[0].main=="Rain"){
        img.src="images/rain.png";

    }
    else if(res.weather[0].main=="Mist"){
        img.src="images/mist.png";

    }
    else if(res.weather[0].main=="Snow"){
        img.src="images/snow.png";

    }
  
    
    
}

btn.addEventListener("click",()=>{
    getweather(inp.value);
    
   
})