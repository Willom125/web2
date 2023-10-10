let compteur = 0;
let myCount = document.querySelector("#count");
const btn1 = document.querySelector("#btn1");
let message = document.getElementById("demo");



window.addEventListener("click", () => {
   compteur++;
   myCount.textContent = compteur;

   if (compteur >= 5 && compteur <= 9) {
     message.textContent = "Bravo, bel échauffement !";
   } else if (compteur >= 10) {
     message.textContent =
       "Vous êtes passé maître en l'art du clic !";
   }
});


