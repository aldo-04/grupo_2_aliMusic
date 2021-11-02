const $ = id => document.getElementById(id)

let regExLetter = /^[A-Z]+$/i;

let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

window.addEventListener("load", () => {
    console.log("Ali music");
    $('firstName').addEventListener('focus', () => {
        if ($('firstName').value.trim() === "") {
            $('firstName-error').innerHTML = "Solo caracter alfabetico"
        }
    })
    $("firstName").addEventListener("blur", () => {
        switch (true) {
            case !$("firstName").value.trim():
                $("firstName-errors").innerText = "El nombre es obligatorio"
                $("firstName").classList.add("is-invalid")
                break;
            case $('firstName').value.trim().length < 3 || $('firstName').value.trim().length > 50:
                $('firstName-errors').innerText = "Entre 3 y 50 caracteres"
                $('firstName').classList.add('is-invalid')
                break;
            case !regExLetter.test($('firstName').value.trim()):
                $('firstName-errors').innerText = "Solo caracter alfabetico"
                $('firstName').classList.add('is-invalid')
                break;


            default: $("firstName").classList.remove("is-invalid")
                $("firstName").classList.add("is-valid")
                $("firstName-errors").innerText = null
                break;
        }
    })
    $("firstName").addEventListener("change", () => {
        $("firstName").classList.remove("is-invalid")
        $("firstName-errors").innerText = null
        $("firstName-msg").innerText = null
    })


    $('lastName').addEventListener('focus', () => {
        if ($('lastName').value.trim() === "") {
            $('lastName-error').innerHTML = "Solo caracter alfabetico"
        }
    })
    $("lastName").addEventListener("blur", () => {
        switch (true) {
            case !$("lastName").value.trim():
                $("lastName-errors").innerText = "El apellido es obligatorio"
                $("lastName").classList.add("is-invalid")
                break;
            case $('lastName').value.trim().length < 3 || $('lastName').value.trim().length > 50:
                $('lastName-errors').innerText = "Entre 3 y 50 caracteres"
                $('lastName').classList.add('is-invalid')
                break;
            case !regExLetter.test($('lastName').value.trim()):
                $('lastName-errors').innerText = "Solo caracter alfabetico"
                $('lastName').classList.add('is-invalid')
                break;


            default: $("lastName").classList.remove("is-invalid")
                $("lastName").classList.add("is-valid")
                $("lastName-errors").innerText = null
                break;
        }
    })
    $("lastName").addEventListener("change", () => {
        $("lastName").classList.remove("is-invalid")
        $("lastName-errors").innerText = null
        $("lastName-msg").innerText = null
    })


    $('email').addEventListener('blur', async () => {

        switch (true) {
            case !regExEmail.test($('email').value):
                $('email-errors').innerText = "Tiene que ser un email válido"
                $('email').classList.add('is-invalid')
                break;
            case await emailVerify($('email').value):
                $('email-errors').innerText = "El email está registrado"
                $('email').classList.add('is-invalid')
                break;
            default:
                $('email-errors').innerText = null
                $('email').classList.remove('is-invalid')
                $('email').classList.add('is-valid')
                break;
        }
    })
    
    $('password').addEventListener('blur',() => {
        if(!regExPass.test($('password').value)){
            $('password-errors').innerText = "La contraseña debe tener una mayúscula, un número y entre 6 y 12 caracteres"
            $('password').classList.add('is-invalid')
        }else{
            $('password-errors').innerText = null
            $('password').classList.remove('is-invalid')
            $('password').classList.add('is-valid')
        }
    })
    $('password').addEventListener('focus',()=> {
        $('password').classList.remove('is-invalid')

    })
    
    $('password2').addEventListener('blur',() => {
        if($('password').value !== $('password2').value){
            $('password2-errors').innerText = "Las contraseñas no coinciden"
            $('password2').classList.add('is-invalid')
        }else if($('password').value == ""){
            $('password2-errors').innerText = "Debes ingresar una contraseña"
            $('password2').classList.add('is-invalid')
        }else{
            $('password2-errors').innerText = null
            $('password2').classList.remove('is-invalid')
            $('password2').classList.add('is-valid')
        }
    })
    $('password2').addEventListener('focus',()=> {
        $('password2').classList.remove('is-invalid')

    })
})