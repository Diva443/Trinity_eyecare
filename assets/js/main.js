$(".product-slider").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 2000, //2000ms = 2s;
  autoplayHoverPause: true,
});

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  toggle.addEventListener("click", () => {
    // Add show-menu class to nav menu
    nav.classList.toggle("show-menu");
    // Add show-icon to show and hide menu icon
    toggle.classList.toggle("show-icon");
  });
};

showMenu("nav-toggle", "nav-menu");

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll(".dropdown__item");

// 1. Select each dropdown item
dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector(".dropdown__button");

  // 2. Select each button click
  dropdownButton.addEventListener("click", () => {
    // 7. Select the current show-dropdown class
    const showDropdown = document.querySelector(".show-dropdown");

    // 5. Call the toggleItem function
    toggleItem(item);

    // 8. Remove the show-dropdown class from other items
    if (showDropdown && showDropdown !== item) {
      toggleItem(showDropdown);
    }
  });
});

// 3. Create a function to display the dropdown
const toggleItem = (item) => {
  // 3.1. Select each dropdown content
  const dropdownContainer = item.querySelector(".dropdown__container");

  // 6. If the same item contains the show-dropdown class, remove
  if (item.classList.contains("show-dropdown")) {
    dropdownContainer.removeAttribute("style");
    item.classList.remove("show-dropdown");
  } else {
    // 4. Add the maximum height to the dropdown content and add the show-dropdown class
    dropdownContainer.style.height = dropdownContainer.scrollHeight + "px";
    item.classList.add("show-dropdown");
  }
};

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia("(min-width: 1118px)"),
  dropdownContainer = document.querySelectorAll(".dropdown__container");

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () => {
  // Validate if the media query reaches 1118px
  if (mediaQuery.matches) {
    // Remove the dropdown container height style
    dropdownContainer.forEach((e) => {
      e.removeAttribute("style");
    });

    // Remove the show-dropdown class from dropdown item
    dropdownItems.forEach((e) => {
      e.classList.remove("show-dropdown");
    });
  }
};

addEventListener("resize", removeStyle);

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});

var swiper1 = new Swiper1(".mySwiper1", {
  slidesPerView: 4,
  centeredSlides: true,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination1",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;

    // Calculate the new scroll position
    const newScrollLeft = startScrollLeft - (e.pageX - startX);

    // Check if the new scroll position exceeds
    // the carousel boundaries
    if (
      newScrollLeft <= 0 ||
      newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth
    ) {
      // If so, prevent further dragging
      isDragging = false;
      return;
    }

    // Otherwise, update the scroll position of the carousel
    carousel.scrollLeft = newScrollLeft;
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
    // Return if window is smaller than 800
    if (window.innerWidth < 800) return;

    // Calculate the total width of all cards
    const totalCardWidth = carousel.scrollWidth;

    // Calculate the maximum scroll position
    const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

    // If the carousel is at the end, stop autoplay
    if (carousel.scrollLeft >= maxScrollLeft) return;

    // Autoplay the carousel after every 2500ms
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Add event listeners for the arrow buttons to
  // scroll the carousel left and right
  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });
});
