// Navigation Variables
var caret = $(".fa.fa-caret-down");
var box = $(".account-box").hide();

var nav = $(".fa.fa-bars");
var menu = $(".menu").hide();
var selector = '.ul-menu li';

// Trigger Click Event For Navigation
caret.click(function(e) {

  e.preventDefault();

  box.fadeToggle();

});

nav.click(function() {

  menu.fadeToggle();

});

$(selector).on('click', function(){
    $(selector).removeClass('active');
    $(this).addClass('active');
});

$( function() {
  $( "#tabs" ).tabs();
});

$("#mobile-tabs").tabs({
    activate: function (event, ui) {
        var active = $('#mobile-tabs').tabs('option', 'active');
        menu.fadeToggle();
    }
});

$(document).ready(function() {
  $(".hidden").removeClass("hidden");
})