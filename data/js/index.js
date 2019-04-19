$(document).ready(function () {
  var url = window.location;
    // Will only work if string in href matches with location
  $('.nav-item a[href="' + url + '"]').parent().addClass('active');
    // Will also work for relative and absolute hrefs
  $('.nav-item a').filter(function () {
    return this.href == url;
  }).parent().addClass('active');
});
