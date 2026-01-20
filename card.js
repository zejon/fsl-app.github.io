const infoBtn = document.getElementById("infoBtn");
const closeBtn = document.getElementById("closeBtn");
const myCard = document.getElementById("myCard");

infoBtn.addEventListener("click", () => {
  myCard.style.display = "block";
  infoBtn.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  myCard.style.display = "none";
   infoBtn.style.display = "inline-block";
});
