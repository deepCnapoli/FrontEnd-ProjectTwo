/**  file: app.js
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//creates a HTMLCollections of all elements with class section
let sections = document.getElementsByClassName("section");

//creates an array of the above HTMLCollection
sections = Array.from(sections); 

// create button to be displayed when scrolling
const buttonTop = document.getElementById("buttonTop");

//Creates an array of the sections Id´s 
const navItems = sections.map(element => {
   return element.id; 
});
// Creates querySelect of section
const sectionsSelect = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//  see if the element is in Viewport
function InViewport(element) {
    const distance = element.getBoundingClientRect(); //determine the rectangle that is active
    return (
        distance.top <= 100 &&  // 100 px away from top, then in viewport
        distance.left >= 0 &&
        distance.bottom >= 90 &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth));
                  // above is entire width of page use both and use with a "or" ||
}

/**
 * End Helper Functions
 * Begin Main Functions
*/
// Build menu 
// this code is building the nav bar
//For each section, add it to the navbar with a link to the corresponding section.  
const parent = document.querySelector(".navbar__menu")

function buildNavBar (section) {
    const navItem = document.createElement("li");
    const nameOfNavItem = section;
    const linked = document.createElement("a");
    navItem.classList.add("navbar__item", `${nameOfNavItem}`);
    linked.href = `#${nameOfNavItem}`; 
    linked.textContent = nameOfNavItem;   
    linked.classList.add("navItem__link");
    parent.appendChild(navItem);
    navItem.appendChild(linked);   
}

navItems.forEach(buildNavBar);

// Set sections as active
// Add classList to be active to section when near top of viewport
//Scroll event listener added. 
document.addEventListener('scroll', function activeSection(){
    for (let i = 0; i < sectionsSelect.length; i++) {
    let section = sectionsSelect[i];
        const navItem = document.querySelector(`.${section.id}`);
        if (InViewport(section)) { // if in viewport then hightlight
            section.classList.add("section-active"); // additional section of class list
            navItem.classList.add("link-active");  // this does the highlighting
                                                   // link-active that has styles
        } else {  // this is un-highlighting as it moves out of viewport
            section.classList.remove("section-active");
            navItem.classList.remove("link-active");
        }
    }
}
)

// Scroll to section on link click
// Scroll to anchor ID using scrollTO event
const links = document.querySelectorAll(".menu__link");
   for (let i = 0; i < links.length; i++) {
        let link = links[i];
    link.addEventListener("click", function clickHandler(a){
        a.stopPropagation();  // "a" is the event object to be canceled
        const href = document.querySelector(link.getAttribute("href"));
        href.scrollIntoView({ behavior: "smooth" }); // to scroll to new section
    });
}

//The buttonTop is shown after scrolling down 75px from the top
 window.onscroll = function() {scrollFunction()}; 
function scrollFunction () {
  const varButton = document.getElementById('buttonTop');
  if (document .body.scrollTop > 75 || document.documentElement.scrollTop > 75) 
  // scrollTop determines the distance from the top
  {varButton.style.display = 'flex';  //this element needs to be visible
  } else {
   varButton.style.display = 'none'; //the element needs to be invisible.
  }
}
// When the buttonTop is pressed, go to the top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
} 

/** End Main Functions*/