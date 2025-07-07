$(function () {
  $("#menu").slicknav({
    label: "",
    brand: "TK",
    closeOnClick: true
  });
});


$(document).ready(function () {
  $(".skitter-large").skitter({
    theme: "default",
    numbers: false,
    navigation: false,
    dots: false,
  });
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 100,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },

      1000: {
        items: 5,
      },
    },
  });
});

$(document).ready(function () {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 150,
      modifier: 1.5,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    spaceBetween: 20,
    breakpoints: {
      640: {
        coverflowEffect: {
          rotate: 15,
          depth: 100,
        },
      },
    },
  });
});

// Swiper and Skitter Initialization
$(document).ready(function () {
  $("#menu").slicknav();
  $(".skitter-large").skitter();
  new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 150,
      modifier: 1.5,
      slideShadows: true,
    },
  });
});

// Local Canvas Animation for Lower Section
$(document).ready(function () {
  const $canvas = $("#canvas-lower")[0]; // jQuery object to DOM element
  const ctx = $canvas.getContext("2d");

  function resizeCanvas() {
    $canvas.width = $($canvas).width();
    $canvas.height = $($canvas).height();
  }

  let time = 0;
  const colors = [
    { r: 255, g: 0, b: 255 },
    { r: 0, g: 255, b: 255 },
    { r: 255, g: 255, b: 0 },
  ];

  function animate() {
    time += 0.005;
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, $canvas.height / 2);

      for (let x = 0; x < $canvas.width; x++) {
        const y =
          $canvas.height / 2 +
          Math.sin(x * 0.01 + time + i * 2) * 30 +
          Math.sin(time * 0.7 + i) * 20;
        ctx.lineTo(x, y);
      }

      ctx.lineTo($canvas.width, $canvas.height);
      ctx.lineTo(0, $canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, $canvas.width, 0);
      gradient.addColorStop(
        0,
        `rgba(${colors[i].r}, ${colors[i].g}, ${colors[i].b}, 0.1)`
      );
      gradient.addColorStop(
        1,
        `rgba(${colors[i].r}, ${colors[i].g}, ${colors[i].b}, 0.3)`
      );

      ctx.fillStyle = gradient;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  animate();

  $(window).on("resize", resizeCanvas);

  // Floating Orbs
  const $orbContainer = $("#orb-container-lower");

  for (let i = 0; i < 5; i++) {
    const $orb = $("<div>").addClass("orb");
    const size = 100 + Math.random() * 200;
    $orb.css({
      width: size + "px",
      height: size + "px",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      background:
        i % 2 === 0
          ? "radial-gradient(circle, rgba(255,0,255,0.8) 0%, rgba(255,0,255,0) 70%)"
          : "radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(0,255,255,0) 70%)",
      animationDuration: `${10 + Math.random() * 20}s`,
    });

    $orbContainer.append($orb);
  }
});



$(document).ready(function () {
  const $footer = $("#shutter-footer");
  let ticking = false;

  function updateFooterVisibility() {
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();

    // Calculate scroll percentage (0 to 1)
    const scrollPercent = scrollPosition / (documentHeight - windowHeight);

    // Only activate footer when scrolled 95% down
    if (scrollPercent > 0.95) {
      $footer.addClass("active");
    } else {
      $footer.removeClass("active");
    }

    ticking = false;
  }

  $(window).on("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateFooterVisibility);
      ticking = true;
    }
  });

  // Initial check
  updateFooterVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main-container"),
    smooth: true,
    lerp: 0.1,
  });

  // Footer reveal effect
  const footer = document.getElementById("shutter-footer");
  let lastScrollPosition = 0;
  let ticking = false;

  function updateFooterVisibility() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    // Calculate scroll percentage (0 to 1)
    const scrollPercent = scrollPosition / (documentHeight - windowHeight);

    // Only start showing footer when scrolled 90% down
    if (scrollPercent > 0.9) {
      const progress = (scrollPercent - 0.9) / 0.1; // Normalize to 0-1
      footer.style.opacity = Math.min(progress, 1);
      footer.style.transform = `translateY(${(1 - progress) * 100}px)`;
    } else {
      footer.style.opacity = 0;
      footer.style.transform = "translateY(100px)";
    }

    lastScrollPosition = scrollPosition;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateFooterVisibility);
      ticking = true;
    }
  });

  // Initial check
  updateFooterVisibility();
});

$(document).ready(function () {
  // Project card animation on scroll
  const projectCards = $(".project-card");

  function checkProjects() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    projectCards.each(function () {
      const cardTop = $(this).offset().top;

      if (cardTop < windowBottom - 100) {
        $(this).addClass("visible");
      }
    });
  }

  // Initial check
  checkProjects();

  // Check on scroll
  $(window).on("scroll", checkProjects);

  // Add click effect to project cards
  $(".project-card").on("click", function () {
    // You can add functionality here, like opening a modal
    // with more project details
    console.log("Project clicked:", $(this).find("h3").text());
  });
});


// Initialize other plugins

$(document).ready(function () {
  // Add premium animation styles
  $("<style>")
    .text(
      `
      /* Base brand styling */
      #brand-naam, .slicknav_brand {
        display: inline-block;
        position: relative;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        letter-spacing: 1px;
        transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      /* Text element with 3D effect */
      .brand-text {
        display: inline-block;
        position: relative;
        z-index: 3;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: all 0.6s ease;
      }
      
      /* Elegant background highlight */
      .brand-highlight {
        position: absolute;
        top: -4px;
        left: -8px;
        right: -8px;
        bottom: -4px;
        background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%);
        border-radius: 4px;
        z-index: 2;
        opacity: 0;
        transform: scaleX(0.9);
        transform-origin: left center;
        transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      /* Sophisticated underline effect */
      .brand-underline {
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #4a00e0, #8e2de2);
        z-index: 1;
        transition: width 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      }
      
      /* Expanded state styles */
      .expanded .brand-text {
        color: #4a00e0;
        text-shadow: 0 4px 8px rgba(74,0,224,0.2);
      }
      
      .expanded .brand-highlight {
        opacity: 1;
        transform: scaleX(1);
      }
      
      .expanded .brand-underline {
        width: 100%;
      }
      
      /* Mobile menu specific adjustments */
      .slicknav_menu .brand-text {
        color: #4a00e0;
      }
      
      .slicknav_menu .brand-highlight {
        background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%);
      }
    `
    )
    .appendTo("head");

  // Initialize mobile menu with premium brand styling
  $("#menu").slicknav({
    label: "",
    prependTo: "#main",
    brand:
      '<span class="brand-text">TK</span><span class="brand-highlight"></span><span class="brand-underline"></span>',
    allowParentLinks: true,
    beforeOpen: function () {
      // Initialize mobile brand animation when menu opens
      $(".slicknav_brand").addClass("expanded");
    },
  });

  // Premium brand animation function
  function animatePremiumBrand(element, shortName, fullName) {
    // Create premium brand structure
    element.html(`
      <span class="brand-text">${shortName}</span>
      <span class="brand-highlight"></span>
      <span class="brand-underline"></span>
    `);

    const textElement = element.find(".brand-text");

    // Animation after 3 seconds
    setTimeout(function () {
      textElement.animate({ opacity: 0 }, 300, function () {
        textElement.text(fullName).css("opacity", 0);
        element.addClass("expanded");
        textElement.animate({ opacity: 1 }, 400);
      });
    }, 3000);

    // Desktop hover effects
    if ($(window).width() > 992) {
      element.hover(
        function () {
          if (!element.hasClass("expanded")) {
            textElement.animate({ opacity: 0 }, 200, function () {
              textElement.text(fullName).css("opacity", 0);
              element.addClass("expanded");
              textElement.animate({ opacity: 1 }, 300);
            });
          }
        },
        function () {
          if (element.hasClass("expanded")) {
            textElement.animate({ opacity: 0 }, 200, function () {
              textElement.text(shortName).css("opacity", 0);
              element.removeClass("expanded");
              textElement.animate({ opacity: 1 }, 300);
            });
          }
        }
      );
    }
  }

  // Initialize desktop brand animation
  animatePremiumBrand($("#brand-naam"), "TK", "TANISHK");

  // Initialize mobile brand animation
  setTimeout(function () {
    $(".slicknav_brand").each(function () {
      $(this)
        .html(
          `
        <span class="brand-text">TANISHK</span>
        <span class="brand-highlight"></span>
        <span class="brand-underline"></span>
      `
        )
        .addClass("expanded");
    });
  }, 3000);

  // Handle window resize
  $(window).resize(function () {
    if ($(window).width() <= 992) {
      $("#brand-naam").off("mouseenter mouseleave");
    } else {
      // Reinitialize hover effects for desktop
      $("#brand-naam").hover(
        function () {
          if (!$(this).hasClass("expanded")) {
            $(this)
              .find(".brand-text")
              .animate({ opacity: 0 }, 200, function () {
                $(this).text("TANISHK").css("opacity", 0);
                $(this).parent().addClass("expanded");
                $(this).animate({ opacity: 1 }, 300);
              });
          }
        },
        function () {
          if ($(this).hasClass("expanded")) {
            $(this)
              .find(".brand-text")
              .animate({ opacity: 0 }, 200, function () {
                $(this).text("TK").css("opacity", 0);
                $(this).parent().removeClass("expanded");
                $(this).animate({ opacity: 1 }, 300);
              });
          }
        }
      );
    }
  });

  // Initialize other plugins
  $(".skitter-large").skitter({
    theme: "default",
    numbers: false,
    navigation: false,
    dots: false,
  });

  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 150,
      modifier: 1.5,
      slideShadows: true,
    },
  });
});















// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ✅ Initialize EmailJS with your public key
  emailjs.init("_pCS0AFhxWxoB5a82"); // replace with your real public key

  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (!contactForm) {
    console.warn("Contact form not found");
    return;
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    // Disable the button and show "Sending..."
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Hide old messages
    formMessage.style.display = "none";
    formMessage.className = "";
    formMessage.textContent = "";

    // 🔃 Send form via EmailJS
    emailjs
      .sendForm(
        "service_sl8a059", // replace with your actual Service ID
        "template_augnloc", // replace with your actual Template ID
        contactForm
      )
      .then(function () {
  // ✅ Show success message
  formMessage.textContent = "✅ Message sent successfully!";
  formMessage.className = "success";
  formMessage.style.display = "block";

  // ⏱️ Hide message after 7 seconds (7000 milliseconds)
  setTimeout(() => {
    formMessage.style.opacity = "0";
    // Optional: fully hide and reset after fade out
    setTimeout(() => {
      formMessage.style.display = "none";
      formMessage.className = "";
      formMessage.textContent = "";
      formMessage.style.opacity = "1"; // Reset opacity for next time
    }, 500); // fade out duration
  }, 7000);

  contactForm.reset();
})

});

})



























window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.style.transition = "opacity 0.5s ease";
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  on: {
    slideChange: function () {
      document.querySelectorAll(".swiper-slide img").forEach((img) => {
        img.style.filter = "grayscale(100%)";
      });

      const activeSlide = this.slides[this.activeIndex];
      if (activeSlide) {
        const activeImg = activeSlide.querySelector("img");
        if (activeImg) {
          activeImg.style.filter = "grayscale(0%)";
        }
      }
    },

    init: function () {
      const activeSlide = this.slides[this.activeIndex];
      if (activeSlide) {
        const activeImg = activeSlide.querySelector("img");
        if (activeImg) {
          activeImg.style.filter = "grayscale(0%)";
        }
      }
    },
  },
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const fullscreenMenu = document.querySelector(".fullscreen-menu");
const closeMenu = document.querySelector(".close-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  fullscreenMenu.classList.toggle("active");
});

closeMenu.addEventListener("click", () => {
  menuToggle.classList.remove("active");
  fullscreenMenu.classList.remove("active");
});

// Close menu when clicking on a link
const menuLinks = document.querySelectorAll(".fullscreen-menu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    fullscreenMenu.classList.remove("active");
  });
});

// Typewriter effect
const typed = new Typed(".typewriter", {
  strings: [
    "Full Stack Developer",
    "Python Expert",
    "JavaScript Developer",
    "Problem Solver",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  showCursor: true,
  cursorChar: "|",
});

document.addEventListener("DOMContentLoaded", function () {
  const minimumShowTime = 3000;
  const startTime = Date.now();

  window.addEventListener("load", function () {
    const loadTime = Date.now() - startTime;
    const remainingTime = Math.max(minimumShowTime - loadTime, 0);

    setTimeout(function () {
      const preloader = document.querySelector(".preloader");

      preloader.style.transition = "opacity 1s ease";
      preloader.style.opacity = "0";

      setTimeout(function () {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
      }, 1000);
    }, remainingTime);
  });

  setTimeout(function () {
    const preloader = document.querySelector(".preloader");
    if (preloader && preloader.style.display !== "none") {
      preloader.style.transition = "opacity 1s ease";
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 1000);
    }
  }, 5000);
});
