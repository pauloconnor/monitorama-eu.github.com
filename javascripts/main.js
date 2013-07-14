
// resize splash on load
var width = $(window).width();
var height = $(window).height();
console.log('setting width to ' + width + ' and height to ' + height);
$('div.splash').css('height', height);

// alert older MSIE browsers
if (($.browser.msie) && ($.browser.version <= 8.0)) {
  alert('Your browser does not support HTML5, which is required for this site.\nRedirecting you to the official Registration site now.')
  window.location.href = 'http://monitorama-eu.eventbrite.com/';
}

// render view according to hash
var setSection = function(name) {
  $('section').css('display', 'none').css('height', '0')
  $('header ul li a').removeClass('active');
  $('section.' + name).css('display', 'block').css('height', 'auto')
  $('header ul li a#' + name).addClass('active');
  window.location.hash = name;
  window.scrollTo(0,0);
}

// load view by click
$('header ul li').on('click', 'a', function() {
  var sid = ($(this).attr('id'));
  setSection(sid);
  return false;
});

// load view by anchor
if (window.location.hash.length !== 0) {
  setSection(window.location.hash.replace('#', ''));
}

var formHandler = function (url) {
  return function () {
    var data = {}
    var parent = $(this).parent()
    var inputs = parent.find('input, textarea')
    for (var i=0; i<inputs.length; i++) {
      data[inputs[i].name] = inputs[i].value;
    }
    $.post(url, data, function(response) {
      // Google Forms is returning 200 on missing inputs so look for it
      if (response.match(/Looks like you/)) {
        alert('Hmm, something went wrong. Please try again?');
      } else {
        parent.find('p, form').css('display', 'none');
        parent.append('<span class="success">Thanks for your submission!</span>');
      }
    }).fail(function() {
      alert('Hmm, something went wrong. Please try again?');
    })
    return false;
  }
}

// submit CFP form
$('.cfp .signup form').on('click', 'a', formHandler(
  'https://docs.google.com/a/dixongroup.net/spreadsheet/formResponse?formkey=dHFfbWZNNC1rRmF0ZWJuUVg2MmFvVFE6MQ&amp;embedded=true&amp;ifq'
));

// populate speakers
for (var i in speakers) {
  var image = '<img src="http://www.gravatar.com/avatar/' + speakers[i].hash + '" />';
  var name = '<span class="name">' + speakers[i].name + '</span>';
  var github = '';
  if (speakers[i].github.length > 0) {
    github = '<span class="github"><a href="https://github.com/' +
      speakers[i].github + '" target="_new">github</a></span>';
  }
  var twitter = '<span class="twitter"><a href="https://twitter.com/' +
    speakers[i].twitter + '" target="_new">twitter</a></span>';
  var bio = '<p class="bio">' + speakers[i].bio + '</p>';

  $('section.speakers ul').append('<li class="speaker">' + image + name + twitter + github + bio + '</li>');
}
