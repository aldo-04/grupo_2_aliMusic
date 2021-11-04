window.addEventListener("load",()=>{
    let form = document.querySelector("form")

    let span = document.querySelectorAll(".error")

    let name = document.querySelector("input#name")
    let price = document.querySelector("input#price")
    let discount = document.querySelector("input#discount")
    let category = document.querySelector("#category")
    let description = document.querySelector("#description")


    name.addEventListener("input",()=>{
        name.value.length <= 0 ? span[0].innerHTML = "<i class='fas fa-times-circle'></i> Debes indicar el nombre del producto" : span[0].innerHTML = ""
    })
    price.addEventListener("input",()=>{
        price.value <= 0 ? span[1].innerHTML = "<i class='fas fa-times-circle'></i> Debes indicar un precio mayor a 0" : span[1].innerHTML = ""
    })
    discount.addEventListener("input",()=>{
        if(discount.value > 90){
            span[2].innerHTML = "<i class='fas fa-times-circle'></i> Solo se permiten números hasta 90"
        }
        discount.value == "" ? span[2].innerHTML = "" : null
    })
    category.addEventListener("input",()=>{
        category.value.length <= 0 ? span[3].innerHTML = "<i class='fas fa-times-circle'></i> Debes seleccionar una categoria" : span[3].innerHTML = ""
    })
    description.addEventListener("input",()=>{
        description.value.length <= 9 ? span[4].innerHTML = "<i class='fas fa-times-circle'></i> La descripción debe tener minimo 10 caracteres" : span[4].innerHTML = ""
    })

    form.addEventListener("submit",e=>{

        name.value.length <= 0 ? span[0].innerHTML = "<i class='fas fa-times-circle'></i> Debes indicar el nombre del producto" : span[0].innerHTML = ""

        price.value <= 0 ? span[1].innerHTML = "<i class='fas fa-times-circle'></i> Debes indicar un precio mayor a 0" : span[1].innerHTML = ""

        category.value.length <= 0 ? span[3].innerHTML = "<i class='fas fa-times-circle'></i> Debes seleccionar una categoria" : span[3].innerHTML = ""

        description.value.length <= 9 ? span[4].innerHTML = "<i class='fas fa-times-circle'></i> La descripción debe tener minimo 10 caracteres" : span[4].innerHTML = ""

        let erroresActivos = []
        span.forEach(error =>{ 
            if (error.textContent != "") {
                erroresActivos.push(error.textContent)
                e.preventDefault()
            }
        })
        console.log(erroresActivos)
        erroresActivos.length != 0 ? e.preventDefault() : e.submit()
    })
})
