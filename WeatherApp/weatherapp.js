async function getData() {
    const apiKey = '700fa3950c988f58c1958528e9bc911e';
    const cityName = document.querySelector('input').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data)
      displayWeather(data)

      

    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }

  }

  function displayWeather(data){

    const {
      name: city,
      main:{temp, humidity},
      weather: [{description, id}]
    } = data;

    const cityDisplay=document.createElement('h1')
    const tempDisplay=document.createElement('p')
    const humidityDisplay=document.createElement('p')
    const descriptionDisplay=document.createElement('p')
    const weatherEmoji=document.createElement('p')

    cityDisplay.textContent=city
    tempDisplay.textContent=`${Math.round(temp-273.15)}°C`
    humidityDisplay.textContent=`Humidity: ${humidity}%`
    descriptionDisplay.textContent=description
    weatherEmoji.textContent=getEmoji(id)

    card=document.querySelector('.card')
    card.textContent=''
    card.style.display='flex'
    card.style.justifyContent='center'

    card.style.flexDirection='column'
    card.style.alignItems='center'

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descriptionDisplay)
    card.appendChild(weatherEmoji)

    const image= document.createElement('img')
    image.style.position='absolute'
    image.style.height='600px'
    image.style.opacity='0.6'
    image.style.width= '100%'

    if(weatherEmoji.textContent=="☁️"){
      image.src='slike/cloudy.avif'
      
      
    }else if(weatherEmoji.textContent=='🌧️'){
      image.src='slike/rainy.jpg'
    }else if(weatherEmoji.textContent=='❄️'){
      image.src='slike/snowy.jpg'
    }else if(weatherEmoji.textContent=='☀️'){
      image.src='slike/sunny.webp'
    }else if(weatherEmoji.textContent=='⛈️'){
      image.src='slike/thunderstorm.webp'
    }else if(weatherEmoji.textContent=='🌁'){
      image.src='slike/foggy.jpg'
    }
    card.appendChild(image)
  }

function getEmoji(weatherId){

  switch(true){

    case (weatherId>=200 && weatherId<300):
      

     
      return "⛈️"
    
    case (weatherId>=300 && weatherId<400):
      return "🌧️"
      
    case (weatherId>=500 && weatherId<600):
      return "🌧️"
    
    case (weatherId>=600 && weatherId<700):
      return "❄️"
 
      case (weatherId>=700 && weatherId<800):
      return "🌁"
 
      case (weatherId===800):
      return "☀️"
   
      case (weatherId>=801 && weatherId <810):
 
      return "☁️"
   
      default:
      return "❓"
  
  }
}