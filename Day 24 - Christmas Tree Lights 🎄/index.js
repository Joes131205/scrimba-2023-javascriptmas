const greenLights = document.getElementsByClassName("green"); 
// Pretend this is red XD. I like color green

const blueLights = document.getElementsByClassName("blue"); 

setInterval(function () {
  setTimeout(function () {
    for (const blueLight of blueLights) {
      blueLight.classList.toggle("lights-on");
    }
  }, 800);
  for (const greenLight of greenLights) {
    greenLight.classList.toggle("lights-on");
  }
}, 800);