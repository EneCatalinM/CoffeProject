//hide preloader

//all the images scripts link have finished loading
//window event

function eventListeners() {
  const ui = new UI();
  window.addEventListener("load", _ => {
    const preloader = document.querySelector(".preloader");
    preloader.style.display = "none";
  });

  document.querySelector(".navBtn").addEventListener("click", _ => {
    const navBar = document.querySelector(".nav");
    navBar.classList.toggle("navShow");
  });
  //control the video
  document
    .querySelector(".video__switch")
    .addEventListener("click", function() {
      ui.videoControls();
    });
  //submit the form
  document
    .querySelector(".drink-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastName = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastName, email);

      if (value) {
        let customer = new Customer(name, lastName, email);
        ui.addCustomer(customer);

        ui.showFeedback("Customer added to the list", "success");
      } else {
        ui.showFeedback("some form values empty", "error");
      }
    });
  //display modal
  const links = document.querySelectorAll(".work-item__icon");
  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModal(event);
    });
  });
  //hide modal
  document
    .querySelector(".work-modal__close")
    .addEventListener("click", function() {
      ui.closeModal();
    });
}

eventListeners();

function UI() {}
//control video
UI.prototype.videoControls = function() {
  let btn = document.querySelector(".video__switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video__item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video__item").play();
  }
};
//check for empty values

UI.prototype.checkEmpty = function(name, lastName, email) {
  let result;
  if (name === "" || lastName === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

//show feedbakc
UI.prototype.showFeedback = function(text, type) {
  const feedback = document.querySelector(".drink-form__feedback");
  if (type === "success") {
    feedback.classList.add("success");
    feedback.innerHTML = text;
    this.removeAlert("success");
    this.clearFields();
  } else if (type === "error") {
    feedback.classList.add("error");
    feedback.innerHTML = text;
    this.removeAlert("error");
  }
};
//add customer
UI.prototype.addCustomer = function(customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `
  <img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__last-name">${customer.lastName}</h4>`;
  document.querySelector(".drink-card__list").appendChild(div);
};
//clear fields
UI.prototype.clearFields = function() {
  name = document.querySelector(".input-name").value = "";
  lastName = document.querySelector(".input-lastname").value = "";
  email = document.querySelector(".input-email").value = "";
};
//remova allter
UI.prototype.removeAlert = function(type) {
  let feedback = document.querySelector(".drink-form__feedback");
  setTimeout(function() {
    feedback.classList.remove(type);
  }, 3000);
};

//show modal
UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item__icon")) {
    let id = event.target.parentElement.dataset.id;

    const modal = document.querySelector(".work-modal");
    const modalItem = document.querySelector(".work-modal__item");

    modal.classList.add("work-modal--show");
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  }
};
//close modal
UI.prototype.closeModal = function() {
  console.log("da");
  document.querySelector(".work-modal").classList.remove("work-modal--show");
};

function Customer(name, lastName, email) {
  (this.name = name), (this.lastName = lastName), (this.email = email);
}
