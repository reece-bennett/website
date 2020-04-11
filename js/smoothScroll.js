/*
* Smooth scrolling when clicking on same-page links
* Adapted from: https://stackoverflow.com/a/39494245
*/

function getElementY(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top - headerHeight;
}

function doScrolling(element, duration) {
  var startingY = window.pageYOffset
  var elementY = getElementY(element)
  // If element is close to page's bottom then window will scroll only to some position above the element.
  var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
  var diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  var easing = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }
  var start

  if (!diff) return

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - start
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

// Find all inner-page links and add event listener
var reURL = new RegExp(window.location.host);
var reID = /#.+/;
var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
  const l = links[i];
  if (reURL.test(l.href) && l.href.match(reID)) {
    l.addEventListener("click", () => {
      doScrolling(l.href.match(reID)[0], 1500);
      // Close the navigation links after navigating
      header.classList.remove("open");
    });
  }
}
