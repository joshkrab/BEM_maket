var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
if (isMobile.any()) {
}

if (location.hash) {
  var hsh = location.hash.replace("#", "");
  if ($(".popup-" + hsh).length > 0) {
    popupOpen(hsh);
  } else if ($("div." + hsh).length > 0) {
    $("body,html").animate(
      { scrollTop: $("div." + hsh).offset().top },
      500,
      function () {}
    );
  }
}
$(".wrapper").addClass("loaded");

var act = "click";
if (isMobile.iOS()) {
  var act = "touchstart";
}

$(".header-menu__icon").click(function (event) {
  $(this).toggleClass("active");
  $(".header-menu").toggleClass("active");
  if ($(this).hasClass("active")) {
    $("body").data("scroll", $(window).scrollTop());
  }
  $("body").toggleClass("lock");
  if (!$(this).hasClass("active")) {
    $("body,html").scrollTop(parseInt($("body").data("scroll")));
  }
});

//ZOOM
if ($(".gallery").length > 0) {
  baguetteBox.run(".gallery", {
    // Custom options
  });
}
/*
CLOUD-ZOOM
<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
	<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
</a>
*/

//POPUP
$(".pl").click(function (event) {
  var pl = $(this).attr("href").replace("#", "");
  var v = $(this).data("vid");
  popupOpen(pl, v);
  return false;
});
function popupOpen(pl, v) {
  $(".popup").removeClass("active").hide();
  if (!$(".header-menu").hasClass("active")) {
    $("body").data("scroll", $(window).scrollTop());
  }
  if (!isMobile.any()) {
    $("body")
      .css({
        paddingRight: $(window).outerWidth() - $(".wrapper").outerWidth(),
      })
      .addClass("lock");
    $(".pdb").css({
      paddingRight: $(window).outerWidth() - $(".wrapper").outerWidth(),
    });
  } else {
    setTimeout(function () {
      $("body").addClass("lock");
    }, 300);
  }
  history.pushState("", "", "#" + pl);
  if (v != "" && v != null) {
    $(".popup-" + pl + " .popup-video__value").html(
      '<iframe src="https://www.youtube.com/embed/' +
        v +
        '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    );
  }
  $(".popup-" + pl)
    .fadeIn(300)
    .delay(300)
    .addClass("active");

  if ($(".popup-" + pl).find(".slick-slider").length > 0) {
    $(".popup-" + pl)
      .find(".slick-slider")
      .slick("setPosition");
  }
}
function openPopupById(popup_id) {
  $("#" + popup_id)
    .fadeIn(300)
    .delay(300)
    .addClass("active");
}
function popupClose() {
  $(".popup").removeClass("active").fadeOut(300);
  if (!$(".header-menu").hasClass("active")) {
    if (!isMobile.any()) {
      setTimeout(function () {
        $("body").css({ paddingRight: 0 });
        $(".pdb").css({ paddingRight: 0 });
      }, 200);
      setTimeout(function () {
        $("body").removeClass("lock");
        $("body,html").scrollTop(parseInt($("body").data("scroll")));
      }, 200);
    } else {
      $("body").removeClass("lock");
      $("body,html").scrollTop(parseInt($("body").data("scroll")));
    }
  }
  $(".popup-video__value").html("");

  history.pushState("", "", window.location.href.split("#")[0]);
}
$(".popup-close,.popup__close").click(function (event) {
  popupClose();
  return false;
});
$(".popup").click(function (e) {
  if (
    !$(e.target).is(".popup>.popup-table>.cell *") ||
    $(e.target).is(".popup-close") ||
    $(e.target).is(".popup__close")
  ) {
    popupClose();
    return false;
  }
});
$(document).on("keydown", function (e) {
  if (e.which == 27) {
    popupClose();
  }
});

$(".goto").click(function () {
  var el = $(this).attr("href").replace("#", "");
  var offset = 0;
  $("body,html").animate(
    { scrollTop: $("." + el).offset().top + offset },
    500,
    function () {}
  );

  if ($(".header-menu").hasClass("active")) {
    $(".header-menu,.header-menu__icon").removeClass("active");
    $("body").removeClass("lock");
  }
  return false;
});

function ibg() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css(
        "background-image",
        'url("' + $(this).find("img").attr("src") + '")'
      );
    }
  });
}
ibg();

//Клик вне области
$(document).on("click touchstart", function (e) {
  if (!$(e.target).is(".select *")) {
    $(".select").removeClass("active");
  }
});

//UP
$(window).scroll(function () {
  var w = $(window).width();
  if ($(window).scrollTop() > 50) {
    $("#up").fadeIn(300);
  } else {
    $("#up").fadeOut(300);
  }
});
$("#up").click(function (event) {
  $("body,html").animate({ scrollTop: 0 }, 300);
});

$("body").on("click", ".tab__navitem", function (event) {
  var eq = $(this).index();
  if ($(this).hasClass("parent")) {
    var eq = $(this).parent().index();
  }
  if (!$(this).hasClass("active")) {
    $(this).closest(".tabs").find(".tab__navitem").removeClass("active");
    $(this).addClass("active");
    $(this)
      .closest(".tabs")
      .find(".tab__item")
      .removeClass("active")
      .eq(eq)
      .addClass("active");
    if ($(this).closest(".tabs").find(".slick-slider").length > 0) {
      $(this).closest(".tabs").find(".slick-slider").slick("setPosition");
    }
  }
});
$.each($(".spoller.active"), function (index, val) {
  $(this).next().show();
});
$("body").on("click", ".spoller", function (event) {
  if ($(this).hasClass("mob") && !isMobile.any()) {
    return false;
  }
  if ($(this).hasClass("closeall") && !$(this).hasClass("active")) {
    $.each(
      $(this).closest(".spollers").find(".spoller"),
      function (index, val) {
        $(this).removeClass("active");
        $(this).next().slideUp(300);
      }
    );
  }
  $(this)
    .toggleClass("active")
    .next()
    .slideToggle(300, function (index, val) {
      if ($(this).parent().find(".slick-slider").length > 0) {
        $(this).parent().find(".slick-slider").slick("setPosition");
      }
    });
  return false;
});

function scrolloptions() {
  var scs = 100;
  var mss = 50;
  var bns = false;
  if (isMobile.any()) {
    scs = 10;
    mss = 1;
    bns = true;
  }
  var opt = {
    cursorcolor: "#fff",
    cursorwidth: "4px",
    background: "",
    autohidemode: true,
    cursoropacitymax: 0.4,
    bouncescroll: bns,
    cursorborderradius: "0px",
    scrollspeed: scs,
    mousescrollstep: mss,
    directionlockdeadzone: 0,
    cursorborder: "0px solid #fff",
  };
  return opt;
}
function scroll() {
  $(".scroll-body").niceScroll(".scroll-list", scrolloptions());
}
if (navigator.appVersion.indexOf("Mac") != -1) {
} else {
  if ($(".scroll-body").length > 0) {
    scroll();
  }
}

if ($(".t,.tip").length > 0) {
  tip();
}
function tip() {
  $(".t,.tip")
    .webuiPopover({
      placement: "top",
      trigger: "hover",
      backdrop: false,
      //selector:true,
      animation: "fade",
      dismissible: true,
      padding: false,
      //hideEmpty: true
      onShow: function ($element) {},
      onHide: function ($element) {},
    })
    .on("show.webui.popover hide.webui.popover", function (e) {
      $(this).toggleClass("active");
    });
}

$(window).resize(function (event) {
  mainblock();
});
function mainblock() {
  var h = $(window).outerHeight();
  $(".mainblock").css("min-height", h);
}
mainblock();

// При клике на filter__item переменной i присваиваем значение data-filter
$('.filter__item').click(function(event) {
		var i=$(this).data('filter');
    // При значении 1 показываются все классы portfolio__column
	if (i==1) {
		$('.portfolio__column').show();
	}else{
    // иначе классы скрываются, но показываются с классом f-'+i
		$('.portfolio__column').hide();
		$('.portfolio__column.f-'+i).show();
	}
  // удалить клас active, но добавить его при нажатии конкретному элементу:
	$('.filter__item').removeClass('active');
	$(this).addClass('active');

	return false;
});

$(window).scroll(function(event) {
		var s=0-$(this).scrollTop()/3;
	$('.mainblock__image').css('transform','translate3d(0, '+s+'px, 0)');
});

