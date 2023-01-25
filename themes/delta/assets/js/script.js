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

// on ready state
$(document).ready(function () {
  "use strict";

  // sidenav js
  const matches = document.querySelectorAll(
    `li[data-nav-id$="${window.location.pathname}"]`
  );
  if (matches.length > 0) {
    const menu = matches[0];
    menu.classList.add("active");

    let maxDepth = 10; // Avoid infinite loop !
    let nextAncestor = menu.closest("li[data-nav-id]");
    while (maxDepth-- >= 0 && nextAncestor !== null) {
      nextAncestor.classList.add("parent");
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
  if ($(".larning-center #TableOfContents li").length > 0) {
    new ScrollMenu(".larning-center #TableOfContents a", {
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
      $("#showVideo").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });
    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#showVideo").attr("src", $videoSrc);
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
            }
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
          "</a></li>"
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

  var $processItem = $(".process-item");
  $processItem.each(function () {
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
      $processItem.find(".image-block").removeClass("active");
    }
  });
});

//custom
//remove login and sign up button for platform
$(window).on("load", function () {
  if ($("div.navbar-right").hasClass("platform-button")) {
    $("#secondary-button").hide();
  }
});

$("#main-header").hover(
  function () {
    $("#secondary-header").addClass("header-sec");
  },
  function () {
    $("#secondary-header").removeClass("header-sec");
  }
);

//header on scroll changes
$(window).on("scroll", function () {
  var list, darkLogo, lightLogo;
  list = document.querySelectorAll("#nav-menu");
  darkLogo = document.querySelector("#logo-img-dark").getAttribute("src");
  lightLogo = document.querySelector("#logo-img-light").getAttribute("src");
  if ($(window).scrollTop() > 70) {
    //Add light section on down
    $("#main-header").removeClass("dark-bar");
    $("#main-header").addClass("light-bar");
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.remove("nav-menu-text");
    }
    //add dark logo on down
    document.getElementById("logo-img").src = darkLogo;
    //show second header button and hide main
    $("#secondary-button").show();
    $("#main-button").hide();
    $("#main-navbar").addClass("no-bottom");
  } else {
    //Add dark section on up
    $("#main-header").removeClass("light-bar");
    $("#main-header").addClass("dark-bar");
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.add("nav-menu-text");
    }
    //add light logo on up
    document.getElementById("logo-img").src = lightLogo;
    //show main header button and hide second
    $("#secondary-button").hide();
    $("#main-button").show();
    $("#main-navbar").removeClass("no-bottom");
  }
});
