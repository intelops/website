// Links Page Animation
anime
  .timeline()
  .add({
    targets: [".links-page-image img"],
    opacity: [0, 1],
    translateY: [50, 0],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 100 * (i + 1),
  })
  .add(
    {
      targets: [".links-page-title p"],
      opacity: [0, 1],
      translateY: [50, 0],
      rotate: ["3deg", "0deg"],
      skewX: ["-13deg", "0deg"],
      easing: "easeOutExpo",
      duration: 1400,
      delay: (el, i) => 100 * (i + 1),
    },
    "-=1200",
  );

ScrollReveal().reveal(".link", {
  duration: 300,
});
ScrollReveal().reveal(".link-item", {
  duration: 600,
});

// Passive event listeners
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    "use strict";
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    "use strict";
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};

// Preloader js
$(window).on("load", function () {
  "use strict";
  $(".preloader").fadeOut(250);
  setTimeout(() => {
    $(".preloader").remove();
  }, 500);
});

// Code Copy
// ----------------------------------------
let blocks = document.querySelectorAll("pre");
blocks.forEach((block) => {
  if (navigator.clipboard) {
    let button = document.createElement("span");
    button.innerText = "copy";
    button.className = "copy-to-clipboard";
    block.appendChild(button);
    button.addEventListener("click", async () => {
      await copyCode(block, button);
    });
  }
});
async function copyCode(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  button.innerText = "copied";
  setTimeout(() => {
    button.innerText = "copy";
  }, 700);
}

// on ready state
$(document).ready(function () {
  "use strict";

  const scrolledPopup = document.querySelector(".scrolledPopup");
  if (scrolledPopup) {
    let contentBlock = document.querySelector(".get-content-block-height");
    let contentBlockHeight = contentBlock.scrollHeight;

    $(window).scroll(function () {
      if ($(window).scrollTop() >= contentBlockHeight * 0.85) {
        if (sessionStorage.getItem("blogScrolledPopupHide") != "true") {
          $(".blog-popup").addClass("show");
        }
        if (sessionStorage.getItem("learningScrolledPopupHide") != "true") {
          $(".learning-center-popup").addClass("show");
        }
      }
    });

    $('[data-hide="scrolledPopup"').click(function () {
      scrolledPopup.remove();
    });

    $('.blog-popup [data-hide="scrolledPopup"]').click(function () {
      sessionStorage.setItem("blogScrolledPopupHide", "true");
    });
    $('.learning-center-popup [data-hide="scrolledPopup"]').click(function () {
      sessionStorage.setItem("learningScrolledPopupHide", "true");
    });
  }

  $('[data-bs-toggle="collapse"]').on("click", function () {
    if (!$(this).hasClass("accordion-button")) {
      if ($(this).attr("aria-expanded") == "true") {
        $("body").addClass("overflow-hidden");
      } else {
        $("body").removeClass("overflow-hidden");
      }
    }
  });

  // sidenav js
  const matches = document.querySelectorAll(
    `li[data-nav-id$="${window.location.pathname}"]`,
  );
  if (matches.length > 0) {
    const menu = matches[0];
    menu.classList.add("active");

    let maxDepth = 10; // Avoid infinite loop !
    let nextAncestor = menu.closest("li[data-nav-id]");
    while (maxDepth-- >= 0 && nextAncestor !== null) {
      nextAncestor.classList.add("parent");
      nextAncestor.parentNode.style.display = "block";
      let icon = nextAncestor.querySelector(".category-icon");
      if (icon !== null) {
        icon.classList.remove("icon-right");
        icon.classList.add("icon-down");
      }
      nextAncestor = nextAncestor.parentNode.closest("li[data-nav-id]");
    }
  }
  $(".sidenav .category-icon").on("click", function () {
    $(this).toggleClass("icon-down icon-right");
    $(this).parent().parent().children("ul").slideToggle(200);
    return false;
  });

  $('[data-toggle="sidebar"]').on("click", function () {
    $(".sidenav").toggleClass("show");
  });

  $(".sidenav").on("click", ".sidenav-toggler", function () {
    $(".sidenav").toggleClass("sidenav-hidden");
    $("body").toggleClass("sidenav-invisible");
    $(".content-block").toggleClass("mx-auto");
    localStorage.setItem("sidenav", "hidden");
    return false;
  });
  if (localStorage.getItem("sidenav") == "hidden") {
    $(".sidenav").addClass("sidenav-hidden");
    $("body").addClass("sidenav-invisible");
    $(".content-block").addClass("mx-auto");
    $(".sidenav").on("click", ".sidenav-toggler", function () {
      localStorage.removeItem("sidenav");
    });
  }

  // table of content
  if ($(".scrollmenu #TableOfContents li").length > 0) {
    new ScrollMenu(".scrollmenu #TableOfContents a", {
      duration: 400,
      activeOffset: 40,
      scrollOffset: 10,
    });
  }

  // table of content
  if ($(".blog-sidebar #TableOfContents li").length > 0) {
    new ScrollMenu(".blog-sidebar #TableOfContents a", {
      duration: 400,
      activeOffset: 200,
      scrollOffset: 80,
    });
  }

  // dropdown height fix
  function dropdownHeightFix() {
    var width = $(window).width();
    if (width > 1200) {
      $(".navbar-nav")
        .find(".dropdown-menu")
        .each(function (idx, item) {
          $(this).height($(this).height());
        });
    }
    if (width < 1200) {
      $(".navbar-nav")
        .find(".dropdown-menu")
        .each(function (idx, item) {
          $(this).css("height", "auto");
        });
    }
  }
  dropdownHeightFix();
  $(window).resize(function () {
    dropdownHeightFix();
  });

  // menuHumBurger icon toggle Init
  function menuHumBurgerIcon() {
    $(".navbar-toggler").on("click", function () {
      $(this).children("i").toggleClass("d-inline d-none");
    });
  }
  menuHumBurgerIcon();

  // videoPopupInit
  if ($('[data-bs-target="#videoModal"]').length !== 0) {
    var $videoSrc;
    $('[data-bs-target="#videoModal"]').click(function () {
      $videoSrc = $(this).data("src");
    });
    $("#videoModal").on("shown.bs.modal", function (e) {
      $(e.target)
        .find("iframe")
        .attr("src", $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
      $("#showVideo").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0",
      );
    });
    $("#videoModal").on("hidden.bs.modal", function (e) {
      $("#showVideo").attr("src", "");
    });
  }

  // counterUp
  if ($(".counter").length !== 0) {
    var a = 0;
    $(window).scroll(function () {
      var oTop = $(".counter").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-count");
          $({
            countNum: $this.text(),
          }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 850,
              easing: "swing",
              step: function () {
                $this.text(Math.ceil(this.countNum).toLocaleString("en"));
              },
              complete: function () {
                $this.text(Math.ceil(this.countNum).toLocaleString("en"));
              },
            },
          );
        });
        a = 1;
      }
    });
  }

  // brandCarousel fix
  if ($(".brand-carousel").length !== 0) {
    new Swiper(".brand-carousel.swiper-container", {
      speed: 400,
      loop: true,
      grabCursor: true,
      autoplay: true,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 4,
        },
        991: {
          slidesPerView: 5,
        },
      },
    });
  }

  // tab
  $(".tab-content")
    .find(".tab-pane")
    .each(function (idx, item) {
      var navTabs = $(this).closest(".code-tabs").find(".nav-tabs"),
        title = $(this).attr("title");
      navTabs.append(
        '<li class="nav-item"><a class="nav-link" href="#">' +
          title +
          "</a></li>",
      );
    });

  $(".code-tabs ul.nav-tabs").each(function () {
    $(this).find("li:first").addClass("active");
  });

  $(".code-tabs .tab-content").each(function () {
    $(this).find("div:first").addClass("active");
  });

  $(".nav-tabs a").click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest(".code-tabs"),
      tabPane = tabPanel.find(".tab-pane").eq(tabIndex);
    tabPanel.find(".active").removeClass("active");
    tab.addClass("active");
    tabPane.addClass("active");
  });

  // Accordions
  $(".collapse")
    .on("shown.bs.collapse", function () {
      $(this)
        .parent()
        .find(".fas fa-plus")
        .removeClass("fas fa-plus")
        .addClass("fas fa-minus");
    })
    .on("hidden.bs.collapse", function () {
      $(this)
        .parent()
        .find(".fas fa-minus")
        .removeClass("fas fa-minus")
        .addClass("fas fa-plus");
    });

  //post carousel
  new Swiper(".post-carousel.swiper-container", {
    speed: 400,
    slidesPerView: 1,
    autoplay: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  //testiminials carousel
  new Swiper(".testimonials-carousel.swiper-container", {
    speed: 400,
    loop: true,
    grabCursor: true,
    autoHeight: true,
    autoplay: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  var processItem = $(".process-item");
  processItem.each(function () {
    var $this = $(this);
    $(window).on("scroll", function () {
      if (
        $this.offset().top - $(window).scrollTop() <
        $(window).outerHeight() - 250
      ) {
        $this.find(".image-block").addClass("active");
      }
    });
  });
  $(window).on("scroll", function () {
    if ($(window).scrollTop() === 0) {
      processItem.find(".image-block").removeClass("active");
    }
  });

  $(".infinite-scroll").infiniteScroll({
    // options
    path: ".nextpage",
    append: ".blog-card",
    history: false,
    status: ".page-load-status",
  });
});

//custom
//remove login and sign up button for platform
$(window).on("load", function () {
  if ($("div.navbar-right").hasClass("platform-button")) {
    $("#secondary-button").hide();
  }
});

if ($(".navigation-alt").length !== 0) {
  let navigationAlt = $(".navigation-alt");
  let navigationBottom = $(".navigation-bottom");

  let navigationAltHeight = navigationAlt.outerHeight();
  let navigationBottomHeight = navigationBottom.outerHeight();

  if (navigationBottom) {
    $(window).on("scroll", function () {
      if (
        $(window).scrollTop() >
        (navigationAltHeight + navigationBottomHeight) * 2
      ) {
        navigationBottom.addClass("sticky");
        navigationBottom.css("top", 0 - navigationBottomHeight + "px");
      } else {
        navigationBottom.removeClass("sticky");
        navigationBottom.css("top", "unset");
      }
    });
  }

  //header on scroll changes
  // $(window).on("scroll", function () {
  //   var list, darkLogo, lightLogo;
  //   list = document.querySelectorAll("#nav-menu");
  //   darkLogo = document.querySelector("#logo-img-dark").getAttribute("src");
  //   lightLogo = document.querySelector("#logo-img-light").getAttribute("src");
  //   if ($(window).scrollTop() > 70) {
  //     //Add light section on down
  //     $(".navigation-alt").removeClass("dark-bar");
  //     for (var i = 0; i < list.length; ++i) {
  //       list[i].classList.remove("nav-menu-text");
  //     }
  //     //add dark logo on down
  //     document.getElementById("logo-img").src = darkLogo;
  //     //show second header button and hide main
  //     $("#secondary-button").show();
  //     $("#main-button").hide();
  //     $("#main-navbar").addClass("no-bottom");
  //   } else {
  //     //Add dark section on up
  //     $(".navigation-alt").addClass("dark-bar");
  //     for (var i = 0; i < list.length; ++i) {
  //       list[i].classList.add("nav-menu-text");
  //     }
  //     //add light logo on up
  //     document.getElementById("logo-img").src = lightLogo;
  //     //show main header button and hide second
  //     $("#secondary-button").hide();
  //     $("#main-button").show();
  //     $("#main-navbar").removeClass("no-bottom");
  //   }
  // });
}

function setRequired(form) {
  /**
   * Remove required attribute for hidden elements for accessibility purpose & chromium based browser bug
   */
  document.querySelectorAll("[conditional-element]").forEach((element) => {
    // Check if element is hidden
    if (
      element.style.getPropertyValue("display") === "none" ||
      element.style.getPropertyValue("display") === ""
    ) {
      element.querySelectorAll("[data-name]").forEach((element) => {
        // Don't submit form element value if its hidden
        element.removeAttribute("name");

        // Remove required attribute from hidden elements
        element.removeAttribute("required");
      });
    }
    // Check if element is visible
    else if (element.style.getPropertyValue("display") === "block") {
      element.querySelectorAll("[data-name]").forEach((element) => {
        // Add name attribute to visible elements
        const name = element.getAttribute("data-name");
        if (name) {
          element.setAttribute("name", name);
        }

        // Add required attribute to visible elements
        if (element.getAttribute("data-required") === "true") {
          element.setAttribute("required", "");
        }
      });
    }
  });
}

function conditionalForm() {
  document.querySelectorAll("[conditional-form]").forEach((form) => {
    let previous = null;

    form.onsubmit = function (e) {
      e.preventDefault(); // Prevent the form from submitting the traditional way

      console.log("Form submitted");

      const formData = new FormData(this);
      const entries = formData.entries();

      for (const [name, value] of entries) {
        console.log(`${name}: ${value}`);
      }
    };

    // Initially Check condition of all select element of form
    form.querySelectorAll("select").forEach((element) => {
      conditionChecker(element);
    });

    // Set previous element value for radio in order to unchecked all others radio with same name attribute except current checked one
    form.querySelectorAll("[data-name]").forEach((element) => {
      element.addEventListener("blur", function (e) {
        if (e.target.type === "radio" && e.target.checked) {
          previous = e.target;
        }
      });
    });

    form.addEventListener("change", function (e) {
      const condition = e.target.getAttribute("condition");
      const type = e.target.getAttribute("type");
      const tagName = e.target.tagName;

      if (
        (tagName === "INPUT" || tagName === "TEXTAREA") &&
        type !== "checkbox" &&
        type !== "radio" &&
        type !== "file" &&
        type !== "submit" &&
        type !== "reset" &&
        type !== "button" &&
        type !== "image" &&
        type !== "hidden" &&
        type !== "password" &&
        type !== "search"
      ) {
        if (condition) {
          conditionChecker(e.target);
        }
      }

      if (type === "radio") {
        const name = e.target.getAttribute("name");
        const checked = e.target.getAttribute("checked");

        isNestedElem(previous, e.target);
        conditionChecker(e.target);
      }

      if (tagName === "SELECT") {
        conditionChecker(e.target);
      }

      setRequired();
    });

    /**
     * Function to hide element with same name attribute value
     * @param {*} form - form element
     * @param {*} name - name attribute value
     */
    function hideTargetElements(form, name) {
      const elements = form.querySelectorAll('[data-name="' + name + '"]');

      elements.forEach((element) => {
        const condition = element.getAttribute("condition");
        if (condition) {
          const [conditionType, conditionValue] = condition.split(":");
          const targetElement = form.querySelector(`#${conditionValue}`);

          if (targetElement) targetElement.style.display = "none";
        }
      });
    }

    // function nested(element, prev) {
    //   const condition = element.getAttribute("condition");

    //   if (condition) {
    //     const [conditionType, conditionValue] = element
    //       .getAttribute("condition")
    //       .split(":");
    //     const targetElement = form.querySelector(`#${conditionValue}`);

    //     if (targetElement) {
    //       const nestedElements = targetElement?.querySelectorAll("[data-name]");

    //       // if have nested elementes
    //       nestedElements.forEach((element) => {
    //         // Check if the target element child has nested elements
    //         if (element.getAttribute("condition")) {
    //           nested(element);
    //           if (prev) {
    //             conditionChecker(element, true);
    //           } else {
    //             conditionChecker(element);
    //           }
    //         }
    //       });

    //       if (!(nestedElements && nestedElements.length >= 0)) {
    //         nested(targetElement);
    //       }
    //     }
    //   }
    // }

    /**
     * Function to check condition and show or hide target element based on condition value
     * @param {*} element
     */
    function conditionChecker(element) {
      const condition = element.getAttribute("condition");
      const currentFormElementNameAttr = element.getAttribute("name");

      if (condition) {
        const [conditionType, conditionValue] = condition.split(":");
        const targetElement =
          conditionType === "checked" &&
          form.querySelector(`#${conditionValue}`);

        // Initially hide all radio input target elements
        currentFormElementNameAttr &&
          hideTargetElements(form, currentFormElementNameAttr);

        // For radio input based on checked value
        if (conditionType === "checked" && element.checked) {
          showElement(targetElement);
        }

        // Check Matching Condition like action based on input or select value
        else if (conditionType.startsWith("match/")) {
          // If have multiple match condition. example - "match/14:adult-only;match/16:adult-only"
          const conditions = condition.split(";");
          const value = removeSpaces(element.value);
          if (conditions && conditions.length > 1) {
            const matchingCondition = conditions.filter((condition) =>
              condition.includes(value),
            )[0];
            const targetElementId = matchingCondition?.split(":")[1];

            // Initially hide all target elements
            conditions.forEach((condition) => {
              const targetElementId = condition?.split(":")[1];
              if (targetElementId) {
                const targetElement = form.querySelector(`#${targetElementId}`);
                hideElement(targetElement);
              }
            });

            if (targetElementId) {
              const [conditionType, matchingWord] = matchingCondition
                ?.split(":")[0]
                .split("/");
              const targetElement = form.querySelector(`#${targetElementId}`);

              if (
                targetElement &&
                !targetElement.disabled &&
                matchingWord &&
                element.value.includes(matchingWord)
              ) {
                showElement(targetElement);
              }
            }
          }

          // If only one match condition. example - "match/located:location"
          else {
            const matchingWord = conditionType?.split("/")[1];
            if (
              targetElement &&
              !targetElement.disabled &&
              matchingWord &&
              value.includes(matchingWord)
            ) {
              showElement(targetElement);
            } else {
              hideElement(targetElement);
            }
          }
        } else {
          hideElement(targetElement);
        }
      } else {
        currentFormElementNameAttr &&
          hideTargetElements(form, currentFormElementNameAttr);
      }
    }

    function isNestedElem(prev, current) {
      if (prev && current) {
        if (prev.getAttribute("condition")) {
          const [conditionType, conditionValue] = prev
            .getAttribute("condition")
            .split(":");
          const prevTargetElement = form.querySelector(`#${conditionValue}`);
          const currentElemId = current.getAttribute("id");

          if (prevTargetElement) {
            const currElemExistInPrev = prevTargetElement.querySelector(
              `#${currentElemId}`,
            );

            if (!currElemExistInPrev) {
              prev.checked = false;
              prevTargetElement.style.display = "none";
            } else {
              prevTargetElement.style.display = "block";
            }
          }
        } else {
          const parentElem = prev.closest("[conditional-element]");
          if (parentElem) {
            prev.checked = false;
            parentElem.style.display = "none";
          }
        }
      }
    }

    // Function to hide an element
    function hideElement(element) {
      if (element) {
        element.style.display = "none";
      }
    }

    // Function to show an element
    function showElement(element) {
      if (element) {
        element.style.display = "block";
      }
    }

    //
    function removeSpaces(string) {
      return string.trim().replace(/\s\s+/g, " ");
    }
  });
}
conditionalForm();

// Initially check for required attributes
setRequired();
