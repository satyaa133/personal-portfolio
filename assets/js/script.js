'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

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

  
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }

}

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

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });

    formInputs[i].addEventListener("change", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    
    const clicked = this.textContent.trim().toLowerCase();

    
    for (let k = 0; k < pages.length; k++) {
      pages[k].classList.remove("active");
    }
    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.remove("active");
    }

    
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === clicked) {
        pages[j].classList.add("active");
        break;
      }
    }

    
    this.classList.add("active");
    window.scrollTo(0, 0);

  });
}

/**
 * Video Modal Logic
 */

const videoModalContainer = document.querySelector(".video-modal-container");
const videoModalCloseBtn = document.querySelector(".modal-close-btn");
const videoModalContent = document.querySelector(".video-modal video");
const videoModalIframe = document.querySelector(".video-modal iframe");
const videoModal = document.querySelector(".video-modal");
const projectItems = document.querySelectorAll(".project-item");

if (videoModalContainer && videoModalCloseBtn && videoModalContent) {
  
  for (let i = 0; i < projectItems.length; i++) {
    projectItems[i].addEventListener("click", function (e) {
      
      const videoType = this.getAttribute("data-video-type");
      const videoUrl = this.getAttribute("data-video-url");
      const hasVideo = this.querySelector("video");

      if (videoType === "youtube" || hasVideo) {
        e.preventDefault();
        if (videoType === "youtube" && videoUrl) {
          videoModalIframe.setAttribute("src", videoUrl + "?autoplay=1");
          videoModal.classList.add("youtube");
        } else if (hasVideo) {
          const videoSrc = hasVideo.getAttribute("src");
          videoModalContent.setAttribute("src", videoSrc);
          videoModal.classList.remove("youtube");
          videoModalContent.play();
        }
        videoModalContainer.classList.add("active");
      }
    });
  }

  const closeModal = function () {
    videoModalContainer.classList.remove("active");
    videoModalContent.pause();
    videoModalContent.currentTime = 0;
    videoModalIframe.setAttribute("src", "");
  }

  videoModalCloseBtn.addEventListener("click", closeModal);
  videoModalContainer.addEventListener("click", function (e) {
    if (e.target === videoModalContainer) closeModal();
  });

}