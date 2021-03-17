/**
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


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function responsiveMenuFun() {
    var navMenu = document.querySelector(".navbar__menu");
    if(navMenu){
        navMenu.classList.toggle('responsive')
    }
    
  }

  function buildNavMenu()
{
    // add action click to the toggle menu button
    const toggleButton = document.querySelector('.toggle-button');
    if(toggleButton)
    {
        const navLinks = document.querySelector('.navbar-links');
        if(navLinks)
        {
            toggleButton.addEventListener('click',function(evt){
                navLinks.classList.toggle('active');
            });
        }
    }
    // get the list of sections
    const sections = document.querySelectorAll('section');
    if(sections)
    {
    // create fragment
    const fragmentElement = document.createDocumentFragment();
    let ind = 0;
    // loop to each section and create Li
    for(section of sections)
    {
        const liElement = document.createElement('li');
        const anchorLink = document.createElement('a');
        anchorLink.textContent = section.getAttribute('data-nav');
        anchorLink.href = '#'+section.getAttribute('id');
        anchorLink.id='a_'+section.getAttribute('id');
        anchorLink.className='menu__link';
        if(ind==0)
        anchorLink.classList.add('activeLink')

        liElement.appendChild(anchorLink);

        fragmentElement.appendChild(liElement)
        ind++;
    }
    const ulElement = document.querySelector('#navbar__list');
    if(ulElement)
    {
        ulElement.appendChild(fragmentElement);
        ulElement.addEventListener('click',scrollToSection);
    }
    }

}

// scroll to section when the nav links clicked
function scrollToSection(evt){
    if(evt.target.nodeName =='A')
      {
        evt.preventDefault();

          const elements= document.querySelectorAll('.activeLink');
          if(elements.length > 0)
            {
                elements.forEach(function(element) {
                    element.classList.remove("activeLink");
                  });
            }
          evt.target.classList.add('activeLink');  
          //----------------------
          let selectedSectionId = evt.target.id;
          selectedSectionId = selectedSectionId.split('_');
          if(selectedSectionId && selectedSectionId.length > 1)
          {
            const selectedSection= document.querySelector('#'+selectedSectionId[1]);
            if(selectedSection)
                selectedSection.scrollIntoView({behavior: "smooth", block: "center"});
          }
         
      }
}

// activate one section and one anchor link
function activateSection(section)
{
    document.querySelectorAll('section').forEach(function(item)
        {
            item.classList.remove('active')
        });
        section.classList.add('active');
        //
        document.querySelectorAll('.activeLink').forEach(function(element) 
        {
            element.classList.remove("activeLink");
        });
        const anchor =document.getElementById('a_'+section.id);
        if(anchor)
            anchor.classList.add('activeLink');
}

// intersection function for sections and viewport
function toggleActiveState()
{
    // display scroll to top button if the window scroll more than 20px down
   const upButton = document.querySelector('.move-up');
   if(upButton){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        upButton.style.display = "block";
      } else {
        upButton.style.display = "none";
      }
   }
    if(!!window.IntersectionObserver)
    {

        let observer = new IntersectionObserver((entries, observer) => { 

            entries.forEach(function(entry) {
                if(entry.isIntersecting){
                    console.log(entry);
                    activateSection(entry.target);
                    observer.unobserve(entry.target);
                }
                });
        },{threshold:0.5,rootMargin:'50px 0px 10px 0px'});

        document.querySelectorAll('section').forEach(function(section) 
            {
                 observer.observe(section);
            });
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollTopFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

// build Navigation menu after DOM loaded
document.addEventListener('DOMContentLoaded',buildNavMenu);
// add scroll event to the window to detect the intersection between section and viewport
window.addEventListener('scroll',toggleActiveState);
// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


