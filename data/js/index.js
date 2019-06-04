// $(document).ready(function () {
//   var url = window.location;
//     // Will only work if string in href matches with location
//   $('.nav-item a[href="' + url + '"]').parent().addClass('active');
//     // Will also work for relative and absolute hrefs
//   $('.nav-item a').filter(function () {
//     return this.href == url;
//   }).parent().addClass('active');
// });



$(document).scroll(function(){
  var scrollPos = $(document).scrollTop();
  $('a.nav-link[href^="#"]').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('.nav-link').parent().removeClass('active');
      currLink.parent().addClass("active");
    }
    else{
      currLink.parent().removeClass('active');
    }
  });
});


$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  $(document).off("scroll");
  
  $('a').each(function () {
      $(this).parent().removeClass('active');
  })
  $(this).parent().addClass('active');
  
  var target = this.hash,
      menu = target;
  $target = $(target);
  $('html, body').stop().animate({
      'scrollTop': $target.offset().top+2
  }, 800, 'swing', function () {
      window.location.hash = target;
  });
});



$(document).ready(function(){
  // Add smooth scrolling to all links
  $(".header-btn, .about-btn, .allFoodBtn").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});



$(function() {
  $('.button-like')
    .bind('click', function(event) {
      $(".button-like").toggleClass("liked");
    })
});


$(document).ready(function() {
  $('#filterOptions li button').click(function(e) {
    // fetch the class of the clicked item
    var ourClass = $(this).attr('class');
    // reset the active class on all the buttons
    $('#filterOptions li button').removeClass('activeFood');
    // update the active state on our clicked button
    $(this).addClass('activeFood');
    $(this).attr("disabled", true);
    if(ourClass == 'all') {
      // show all our items
      $('#ourHolder').children().children('div.item').fadeIn(500);
      $('#filterOptions li button').attr("disabled", false);
    }
    else {
      // hide all elements that don't share ourClass
      $('#ourHolder').children().children('div:not(.' + ourClass + ')').hide();
      $('#filterOptions li button').attr("disabled", false);
      $(this).attr("disabled", true);
      // show all elements that do share ourClass
      $('#ourHolder').children().children('div.' + ourClass).show();
    }
    return false;
  });
});



$(function(){
  $('input[id$="endTime"]').inputmask(
    "hh:mm", {
    placeholder: "HH:MM", 
    insertMode: false, 
    showMaskOnHover: false,
    hourFormat: 24
  }
  );
  $(":input").inputmask();

  // $("#date").inputmask("99/99/9999",{ "placeholder": "dd/mm/yyyy" });
  $("#phone").inputmask("(99) 999-99-99",{ showMaskOnFocus: false, showMaskOnHover: false });
  //email mask
  $("#email").inputmask({
    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    greedy: false,
    onBeforePaste: function (pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace("mailto:", "");
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
        cardinality: 1,
        casing: "lower"
      }
    }
  });
});

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [41.338651, 69.334776],
    zoom: 16,
    controls: ['searchControl', 'zoomControl']
  }, {
      searchControlProvider: 'yandex#search',
  }),
  
  // Создаем геообъект с типом геометрии "Точка".
  myGeoObject = new ymaps.GeoObject({
    // Описание геометрии.
    geometry: {
      type: "Point",
      coordinates: [41.338651, 69.334776]
      },
    }, {
      // Опции.
      // Иконка метки будет растягиваться под размер ее содержимого.
      preset: 'islands#redDotIcon',
      // Метку можно перемещать.
      draggable: false
    });
    myMap.geoObjects.add(myGeoObject);
    myMap.behaviors.disable('scrollZoom'); 
    myMap.behaviors.disable('drag');
    myMap.events.remove('click');
}