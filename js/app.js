//window event list
eventListeners();

function eventListeners() {
    const ui = new UI();
    //hide preloader
    window.addEventListener('load', function () {
        ui.hidePreloader();
    })
    // toggle nav btn 
    const navBtn = document.querySelector(".navBtn");
    navBtn.addEventListener('click', function () {
        ui.showNav();
    });
    //control the video
    const videoSwitch = document.querySelector(".video__switch");
    videoSwitch.addEventListener('click', function () {
        ui.videoControls()
    })

    //submit the form
    document.querySelector(".drink-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.querySelector(".input-name").value;
        const lastName = document.querySelector(".input-lastname").value;
        const email = document.querySelector(".input-email").value;
        let value = ui.checkEmpty(name, lastName, email);

        if (value) {
            let customer = new Customer(name, lastName, email);
            ui.showFeedback("success!", "success");
            ui.addCustomer(customer);
            ui.clearFields();

        } else {
            ui.showFeedback("please, fill out the form", "error");

        }

    })
    //display modal
    const links = document.querySelectorAll('.work-item__icon');
    links.forEach(function (item) {
        item.addEventListener('click', function (event) {
            ui.showModal(event);

        })
    })
    //hide modal
    document.querySelector('.work-modal__close').addEventListener("click", function () {
        ui.closeModal();
    })
}
//constructor function
function UI() {}
UI.prototype.hidePreloader = function () {
    const preloader = document.querySelector(".preloader");
    preloader.style.display = "none";
}

UI.prototype.showNav = function () {
    document.querySelector('.nav').classList.toggle('nav--show');
};
UI.prototype.videoControls = function () {
    let btn = document.querySelector(".video__switch-btn");
    let videoItem = document.querySelector(".video__item");

    if (!btn.classList.contains("btnSlide")) {
        btn.classList.add("btnSlide");
        videoItem.pause();

    } else {
        btn.classList.remove("btnSlide");
        videoItem.play();
    }
}
//checks if any of the form fields are empty
UI.prototype.checkEmpty = function (name, lastName, email) {
    let result;
    if (name === '' || lastName === '' || email === '') {
        result = false;
    } else {
        result = true;
    }
    return result;

}
//showing feedback after submiting the form
UI.prototype.showFeedback = function (text, type) {
    const feedback = document.querySelector('.drink-form__feedback');
    if (type === 'success') {
        feedback.classList.add("success");
        feedback.innerText = text;
        this.removeAlert("success");

        this.removeAlert("success");
    } else if (type === 'error') {
        feedback.classList.add("error");
        feedback.innerText = text;
        this.removeAlert("error");
    }
}
//remove alert
UI.prototype.removeAlert = function (type) {
    setTimeout(function () {
        document.querySelector('.drink-form__feedback').classList.remove(type)
    }, 3000);
}

//add customer
UI.prototype.addCustomer = function (customer) {
    const images = [1, 2, 3, 4, 5];
    let random = Math.floor(Math.random() * images.length);
    const div = document.createElement("div");
    div.classList.add('person');
    div.innerHTML = `
    <img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
    <h4 class="person__name">${customer.name}</h4>
    <h4 class="person__last-name">${customer.lastName}</h4>
  `
    document.querySelector(".drink-card__list").appendChild(div);
}
//clearing the form fields
UI.prototype.clearFields = function () {
    document.querySelector(".input-name").value = '';
    document.querySelector(".input-lastname").value = '';
    document.querySelector(".input-email").value = '';

}
//show modal
UI.prototype.showModal = function (event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains("work-item__icon")) {
        let id = event.target.parentElement.dataset.id;
        const modal = document.querySelector(".work-modal");
        const modalItem = document.querySelector(".work-modal__item");
        modal.classList.add("work-modal--show");
        modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`
    } else {

    }
}
//close modal
UI.prototype.closeModal = function () {
    document.querySelector(".work-modal").classList.remove("work-modal--show");
}

//customer constructor function
function Customer(name, lastName, email) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
}