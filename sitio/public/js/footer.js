window.addEventListener("load", () => {


    const openContact = document.getElementById('openContact');
    const modal_contact = document.getElementById('modal_contact');
    const closeContact = document.getElementById('closeContact');

    openContact.addEventListener('click', () => {
        modal_contact.classList.add('show');
    });
    closeContact.addEventListener('click', () => {
        modal_contact.classList.remove('show');
    });


    var form = document.getElementById("my-form");

    async function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById("my-form-status");
        var data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            status.innerHTML = "Thanks for your submission!";
            form.reset()
        }).catch(error => {
            status.innerHTML = "Oops! There was a problem submitting your form"
        });
    }
    form.addEventListener("submit", handleSubmit)
})
