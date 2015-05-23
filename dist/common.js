var Common;

module.exports = Common = (function() {
  function Common() {}

  Common.prototype.init = function() {
    if ('has_cookie_for_closeheat_and_is_authed') {
      this.appendButton();
      return this.loadTour();
    }
  };

  Common.prototype.appendButton = function() {
    var img, link;
    img = document.createElement('img');
    img.src = 'http://localhost:4000/assets/logo-square.png';
    img.width = 20;
    img.height = 23;
    link = document.createElement('a');
    link.href = 'http://staging.closeheat.com/apps/damp-dew-994/live_edit';
    link.id = 'closeheat-common';
    link.innerHTML = img.outerHTML;
    link.style.position = 'fixed';
    link.style.bottom = 10;
    link.style.right = 10;
    return document.body.appendChild(link);
  };

  Common.prototype.loadTour = function() {
    return this.load('link', 'css/tour.css', (function(_this) {
      return function() {
        return _this.startTour();
      };
    })(this));
  };

  Common.prototype.startTour = function() {
    var div;
    div = document.createElement('div');
    div.innerHTML = 'Click the logo to edit your website';
    div.className = 'closeheat-common-logo-guide';
    return document.body.appendChild(div);
  };

  Common.prototype.load = function(tag, url, callback) {
    var done, element;
    done = false;
    element = document.createElement(tag);
    if (tag === 'link') {
      element.href = url;
      element.rel = "stylesheet";
      element.type = "text/css";
    } else {
      element.src = url;
    }
    element.onload = element.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
        done = true;
        return typeof callback === "function" ? callback() : void 0;
      }
    };
    return document.getElementsByTagName('head')[0].appendChild(element);
  };

  return Common;

})();

new Common().init();
