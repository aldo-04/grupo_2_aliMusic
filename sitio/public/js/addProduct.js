window.addEventListener("load",()=>{
    let form = document.querySelector("form")

    let span = document.querySelectorAll(".error")

    let name = document.querySelector("input#name")
    let price = document.querySelector("input#price")
    let discount = document.querySelector("input#discount")
    let category = document.querySelector("#category")
    let description = document.querySelector("#description")


    name.addEventListener("input",()=>{
        if (name.value.length <= 0) {
            span[0].innerHTML = "Debes indicar el nombre del producto"
            name.classList.add("is-invalid")
        }else{
            span[0].innerHTML = ""
            name.classList.remove("is-invalid")
            name.classList.add("is-valid")
        }
    })
    price.addEventListener("input",()=>{
        if (price.value <= 0) {
            span[1].innerHTML = " Debes indicar un precio mayor a 0"
            price.classList.add("is-invalid")
        }else{
            span[1].innerHTML = ""
            price.classList.remove("is-invalid")
            price.classList.add("is-valid")
        }
    })
    discount.addEventListener("input",()=>{
        if(discount.value > 90){
            span[2].innerHTML = " Solo se permiten números hasta 90"
            discount.classList.add("is-invalid")
        }else{
            span[2].innerHTML = ""
            discount.classList.remove("is-invalid")
            discount.classList.add("is-valid")
        }
        if (discount.value < 0) {
            span[2].innerHTML = " No se permiten números menores a 0"
            discount.classList.add("is-invalid")
        }else{
            discount.classList.add("is-valid")
        }
    })
    category.addEventListener("input",()=>{
        category.value.length <= 0 ? span[3].innerHTML = " Debes seleccionar una categoria" : span[3].innerHTML = ""
    })
    description.addEventListener("input",()=>{
        if (description.value.length <= 9) {
            span[4].innerHTML = " La descripción debe tener minimo 10 caracteres"
            description.classList.add("is-invalid")
        }else{
            span[4].innerHTML = ""
            description.classList.remove("is-invalid")
            description.classList.add("is-valid")
        }
    })

    form.addEventListener("submit",e=>{

        if (name.value.length <= 0) {
            span[0].innerHTML = "Debes indicar el nombre del producto"
            name.classList.add("is-invalid")
        }else{
            span[0].innerHTML = ""
        }

        if (price.value <= 0) {
            span[1].innerHTML = " Debes indicar un precio mayor a 0"
            price.classList.add("is-invalid")
        }else{
            span[1].innerHTML = ""
            price.classList.remove("is-invalid")
            price.classList.add("is-valid")
        }

        if(discount.value > 90){
            span[2].innerHTML = " Solo se permiten números hasta 90"
            discount.classList.add("is-invalid")
        }else{
            span[2].innerHTML = ""
            discount.classList.remove("is-invalid")
            discount.classList.add("is-valid")
        }
        if (discount.value < 0) {
            span[2].innerHTML = " No se permiten números menores a 0"
            discount.classList.add("is-invalid")
        }else{
            discount.classList.add("is-valid")
        }

        category.value.length <= 0 ? span[3].innerHTML = " Debes seleccionar una categoria" : span[3].innerHTML = ""

        if (description.value.length <= 9) {
            span[4].innerHTML = " La descripción debe tener minimo 10 caracteres"
            description.classList.add("is-invalid")
        }else{
            span[4].innerHTML = ""
            description.classList.remove("is-invalid")
            description.classList.add("is-valid")
        }
        
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
