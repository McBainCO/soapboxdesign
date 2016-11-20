
// switches logo for devices
var width = $(window).width();

if (width < 749) {
    $('.logo').attr('src', '../assets/logo-words.png');

}

// adds class to current page
$(document).ready(function() {
    $("nav a").each(function() {
        if (this.href == window.location.href) {
            $(this).addClass("current-page");
        }
    });
});

// makes services page panels mobile compatible
$('.panel').on('click', function() {
    $(this).children('.primary').toggleClass('opac')
    $(this).children('secondary').toggleClass('solid')
})


//slideshow action
$('.carousel').children(":first").addClass('isActive');

function rotateClass() {
    $('.carousel > *.isActive').appendTo('.carousel').removeClass('isActive');
    $('.carousel').children(":first").addClass('isActive');
}

setInterval(function() {
    rotateClass();
}, 5000);
