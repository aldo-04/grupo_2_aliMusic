console.log("estoy en search")

let busqueda = document.getElementById("busqueda")
let categories = document.querySelectorAll("#category")
let divArt = document.querySelectorAll("#divArt")

window.addEventListener("load", ()=>{

    busqueda.addEventListener("change",()=>{
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].textContent != busqueda.value) {
                divArt[i].classList.add("displayNone")
            }else{
                divArt[i].classList.remove("displayNone")
            }
        }
    })

})