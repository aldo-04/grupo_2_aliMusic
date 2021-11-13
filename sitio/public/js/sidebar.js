ScrollReveal().reveal('.art');
/* $(window).load(function () {
    $(".loader").fadeOut("slow");
  }); */

const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    
    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
            toggleBtn.classList.toggle('bx-x')
        })
    }
}
showMenu('header-toggle','navbar')

const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    linkColor.forEach(l => l.classList.remove('activo'))
    this.classList.add('activo')
}

linkColor.forEach(l => l.addEventListener('click', colorLink))
