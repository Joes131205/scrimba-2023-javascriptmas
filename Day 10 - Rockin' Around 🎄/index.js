const player = document.getElementById("player");
const custom = document.getElementById("custom");
const buttons = document.querySelectorAll("button");

function playSong(id) {
  player.src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=0&loop=1&disablekb=1`;
  // Don't ask me why I set the display to none while clicking the button, its the Youtube's policy :)
  player.style.display = "none";
}

function getIdThenPlay() {
  const id = videoId.value;
  if (id) {
    playSong(id);

    buttons.forEach(item => {
      buttons.forEach(function(b) {
        item.classList.remove("active");
        custom.classList.remove("active");
      });
    });

    custom.classList.add("active");
    custom.style.backgroundColor = "#87fff1";
  }
}

buttons.forEach(item => {
  item.addEventListener("click", function() {
    buttons.forEach(function(b) {
      b.classList.remove("active");
      custom.classList.remove("active");
      custom.style.backgroundColor = "#BDD59B";
    });

    item.classList.add("active");
  });
});
