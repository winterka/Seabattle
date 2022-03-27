$(document).ready(() => {
  // Emoji
  /*
	$(".control__input").emojioneArea({
        pickerPosition: 'bottom',
        search: false,
        recentEmojis: false,
        shortcuts: false,
        tones: false,
    });*/

  // Опускаем чат в самый низ
  var chat = $(".chat__messages");
  chat.scrollTop(chat.prop("scrollHeight"));

  $('input[type="tel"]').mask("+7 (999) 999-99-99");

  // $("form").submit(function (event) {
  //     event.preventDefault();
  //     if($(this).hasClass('registration__form')) {
  //         window.location.href = '/info1.html';
  //     }
  // });

  /** * Replace all SVG images with inline SVG */
  $("img.img-svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  // Слайдер
  $(".ratings__slider")
    .slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: true,
      prevArrow: ".ratings__arrow.left",
      nextArrow: ".ratings__arrow.right",
      dots: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    })
    .on("afterChange", function (event, slick, currentSlide, nextSlide) {
      slidesCount = slick.slideCount - 1;
      if (currentSlide == 0) {
        $(".ratings__arrow.left").addClass("hide");
      } else {
        $(".ratings__arrow.left").removeClass("hide");
      }

      if (currentSlide == slidesCount) {
        $(".ratings__arrow.right").addClass("hide");
      } else {
        $(".ratings__arrow.right").removeClass("hide");
      }
    });

  $(".regulations__title").on("click", function () {
    $(this).toggleClass("hide");
    $(".regulations__box").slideToggle();
  });
});

// Таймер
$(function () {
  function timer(settings) {
    var config = {
      endDate: "2022-03-01 12:00",
      timeZone: "Europe/Kiev",
      hours: $("#hours"),
      minutes: $("#minutes"),
      seconds: $("#seconds"),
      newSubMessage: "and should be back online in a few minutes...",
    };
    function prependZero(number) {
      return number < 10 ? "0" + number : number;
    }
    $.extend(true, config, settings || {});
    var currentTime = moment();
    var endDate = moment.tz(config.endDate, config.timeZone);
    var diffTime = endDate.valueOf() - currentTime.valueOf();
    var duration = moment.duration(diffTime, "milliseconds");
    var days = duration.days();
    var interval = 1000;
    var subMessage = $(".sub-message");
    var clock = $(".clock");
    if (diffTime < 0) {
      endEvent(subMessage, config.newSubMessage, clock);
      return;
    }
    if (days > 0) {
      $("#days").text(prependZero(days));
    }
    var intervalID = setInterval(function () {
      duration = moment.duration(duration - interval, "milliseconds");
      var hours = duration.hours(),
        minutes = duration.minutes(),
        seconds = duration.seconds();
      days = duration.days();
      if (hours <= 0 && minutes <= 0 && seconds <= 0 && days <= 0) {
        clearInterval(intervalID);
        endEvent(subMessage, config.newSubMessage, clock);
        window.location.reload();
      }
      $("#days").text(prependZero(days));
      config.hours.text(prependZero(hours));
      config.minutes.text(prependZero(minutes));
      config.seconds.text(prependZero(seconds));
    }, interval);
  }
  function endEvent($el, newText, hideEl) {
    $el.text(newText);
    hideEl.hide();
  }
  timer();
});
