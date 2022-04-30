
function onResponseWeather(response){
  console.log('On response');
  return response.json();
}

function onJsonWeather(json){
  console.log(json);
  const results = json.DailyForecasts;
 
  const weather= document.querySelector("#weather");
  weather.innerHTML='';

  const h1= document.createElement('h1');
  h1.textContent= "Catania";

  const p= document.createElement('p');
  p.textContent= results[0].Day.IconPhrase;

  const image= document.createElement('img');

  if(results[0].Day.HasPrecipitation===true){
    image.src="pioggia.png";
  }else{
    image.src="sole.png";
  }
  weather.appendChild(h1);
  weather.appendChild(p);
  weather.appendChild(image);
}

function onJsonImg(json){

    console.log(json);

    const container= document.querySelector('#outfits');
    container.classList.remove('hidden');

    const dettagli= document.querySelector("#dettagli");
    dettagli.classList.add('hidden');

    const results = json.results;
 
    for(let result of results)
    {
      const immagine = result.urls.regular;
      const div= document.createElement('div');
      
      container.appendChild(div);

      const image = document.createElement('img');
      image.src = immagine;

      div.appendChild(image);
    }
}

function onResponseImg(response){
  console.log('On response');
  return response.json();
}

function resetPage(event){
    const container= document.querySelector('#outfits');
    container.classList.add('hidden');

    const dettagli= document.querySelector("#dettagli");
    dettagli.classList.remove('hidden');

    container.innerHTML='';

    button.removeEventListener('click', resetPage);
    button.addEventListener('click',searchOutfits);
    button.textContent='Clicca per idee outfit';
}

function searchOutfits(event){
  const img_url= img_endpoint +"?page=1&query=outfit+clothing+kid"+"&per_page="+num_results+"&orientation=landscape";
  fetch(img_url,
  {
    headers: {
      'Authorization': token.token_type +' '+ token.access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(onResponseImg).then(onJsonImg);

    button.removeEventListener('click',searchOutfits);
    button.textContent='Resetta pagina';
    button.addEventListener('click', resetPage);
}

function getToken(json)
{
	token = json;
  console.log(json);
}

function onTokenResponse(response) {
  console.log(response);
  return response.json();
}

const img_code="t429FOVJb1HPd_JbDtKlRm_38edL1hK3GxpUzF_t7KA"; //da cambiare ogni volta che si ricarica la pagina, vedi documentazione
// se il codice non viene cambiato ogni volta il fetch del token da problemi a causa del CORS

const img_client="phAZkt7QKovxx-kHpa2wLida6gT4qD20wSGnupPUHSA";
const img_secret="CopUPfOk8N7WhyB_25G3nUNDdWe_mAHl36MWUoTfUis";
const img_endpoint_token="https://unsplash.com/oauth/token";
const img_endpoint="https://api.unsplash.com/search/photos";
const num_results=9;

const weather_endpoint="http://dataservice.accuweather.com/forecasts/v1/daily/1day/215605"; //215605 codice Catania
const weather_key="p5AxU4toCpJdddO3MDpbHT2CxGwq0XQd";

let token;
  fetch(img_endpoint_token,
    {
      method: 'POST',
      body: 'grant_type=authorization_code&client_id='+img_client+'&client_secret='+img_secret+'&code='+img_code+
      '&redirect_uri=urn:ietf:wg:oauth:2.0:oob',
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
    ).then(onTokenResponse).then(getToken);

const button= document.querySelector('button');
button.addEventListener('click',searchOutfits);

const weather_request = weather_endpoint + '?apikey=' + weather_key+ "&language="+ "it" + "&details=true";
fetch(weather_request).then(onResponseWeather).then(onJsonWeather);
