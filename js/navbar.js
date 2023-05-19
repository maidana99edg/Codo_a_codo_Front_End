let hamburger = document.querySelector('.hamburger');
let navLinks = document.querySelector('#nav-links');
let links = document.querySelectorAll('.links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('hide');
});

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', () => {
    navLinks.classList.toggle('hide');
  });
}

const navMenu = document.querySelector("#navMenu");

navMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active");
})
