window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatueDescription = document.querySelector('.temperatueDescription');
  let temperatureDegree = document.querySelector('.temperatureDegree ');
  let locationTimezone = document.querySelector('.locationTimezone');
  let temperatueSection = document.querySelector('.temperature');
  const temperatueSpan = document.querySelector('.temperature span');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxyurl}https://api.darksky.net/forecast/c384bbe732c726e1fc922941c743f710/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          //data.currently.temperature 
          //data.currently.summary
          const { temperature, summary, icon } = data.currently;
          //set dom 
          temperatureDegree.textContent = temperature;
          temperatueDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //formula change of celsius
          let celsius = (temperature - 32) * (5 / 9);

          //set icon
          setIcons(icon, document.querySelector(".icon"));
          // change temperatura
          temperatueSection.addEventListener('click', () => {
            if (temperatueSpan.textContent === "F") {
              temperatueSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatueSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          })
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

