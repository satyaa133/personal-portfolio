'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables (guarded: markup may be commented out)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (only if modal exists)
const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items if required elements exist
if (testimonialsItem.length > 0 && modalContainer && modalImg && modalTitle && modalText && overlay) {

  for (let i = 0; i < testimonialsItem.length; i++) {

    const item = testimonialsItem[i];
    if (!item) continue;

    item.addEventListener("click", function () {

      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar && modalImg) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }
      if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
      if (text && modalText) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();

    });

  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);

}



// custom select & filtering (guarded)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  if (!filterItems) return;
  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }

}

// add event in all filter button items for large screen
if (filterBtn && filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }

}



// contact form variables (guarded)
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs && formInputs.length > 0 && formBtn) {
  // add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // get the clicked link text and normalize
    const clicked = this.textContent.trim().toLowerCase();

    // remove active class from all pages and nav links
    for (let k = 0; k < pages.length; k++) {
      pages[k].classList.remove("active");
    }
    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.remove("active");
    }

    // find and activate the matching page
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === clicked) {
        pages[j].classList.add("active");
        break;
      }
    }

    // mark clicked nav as active
    this.classList.add("active");
    window.scrollTo(0, 0);

  });
}