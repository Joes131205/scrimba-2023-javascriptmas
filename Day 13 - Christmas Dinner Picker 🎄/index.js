const foodEl = document.getElementById('food');
const numInputEl = document.getElementById('num-input');
const vegetarianInputEl = document.getElementById('vegetarian-input');
const btnEl = document.getElementById('btn');
// Well I was going to use an AI / API for stretch goals, but kept giving me errors, so I gave up lol
btnEl.addEventListener("click", async function() {
  const numOfPeople = numInputEl.value;

  if (numOfPeople) {
    if (vegetarianInputEl.checked) {
      foodEl.textContent = "Winter Squash Risotto";
    } else {
      foodEl.textContent = numOfPeople >= 5 ? "Turkey" : "Ham";
    }
  } else {
    btnEl.textContent = "Please input the number of people...";
    setTimeout(() => {
      btnEl.textContent = "Calculate";
    }, 3000);
  }
});
