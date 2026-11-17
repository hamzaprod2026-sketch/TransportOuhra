const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();

const quoteForm = document.querySelector("#quoteForm");
const formStatus = document.querySelector("#formStatus");

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!quoteForm.reportValidity()) return;

  const data = new FormData(quoteForm);
  const subject = encodeURIComponent("Demande de devis - Transport Ouhra");
  const body = encodeURIComponent(
`Bonjour Transport Ouhra,

Je souhaite obtenir des informations / un devis.

Prénom : ${data.get("prenom")}
Nom : ${data.get("nom")}
Entreprise : ${data.get("entreprise") || "Non renseignée"}
Téléphone : ${data.get("telephone")}
E-mail : ${data.get("email")}
Service souhaité : ${data.get("service")}

Message :
${data.get("message") || "Aucun message supplémentaire"}

Cordialement.`
  );

  formStatus.textContent = "Votre application e-mail va s'ouvrir avec votre demande.";
  window.location.href = `mailto:ouhracompte@gmail.com?subject=${subject}&body=${body}`;
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
}
