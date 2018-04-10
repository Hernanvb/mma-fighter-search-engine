// Navigation Variables
// var caret = $(".fa.fa-caret-down");
var caret = $(".account");
var box = $(".account-box").hide();

var nav = $(".fa.fa-bars");
var menu = $(".menu").hide();
var selector = '.ul-menu li';

// Hide account box when clicking anywhere in the page
$('html').click(function() {
  //Hide the box if visible
  box.fadeOut();
});

// Trigger Click Event For Navigation
caret.click(function(e) {

  e.preventDefault();

  box.fadeToggle();
  event.stopPropagation();
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
});