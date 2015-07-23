(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Common;

module.exports = Common = (function() {
  function Common() {
    this.server = window.CLOSEHEAT_SERVER;
    this.slug = window.CLOSEHEAT_SLUG;
  }

  Common.prototype.init = function() {
    return this.isAuthedForApp((function(_this) {
      return function(resp) {
        _this.appendButton();
        if (resp.tour_of_edit_button_finished) {
          return;
        }
        return _this.loadTour(resp.tour_css);
      };
    })(this));
  };

  Common.prototype.isAuthedForApp = function(callback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      var resp;
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resp = JSON.parse(xhr.responseText);
          if (resp.belongs_to_user) {
            return callback(resp);
          }
        } else if (xhr.status === 400) {
          return console.log('There was an error 400');
        } else {
          return console.log('something else other than 200 was returned');
        }
      }
    };
    xhr.withCredentials = true;
    xhr.open('GET', this.server + '/common?slug=' + this.slug, true);
    return xhr.send();
  };

  Common.prototype.appendButton = function() {
    var img, link;
    img = document.createElement('img');
    img.src = this.server + '/logo-square.png';
    img.width = 30;
    img.height = 35;
    link = document.createElement('a');
    link.href = this.server + '/apps/' + this.slug + '/live_edit';
    link.id = 'closeheat-common';
    link.innerHTML = img.outerHTML;
    link.style.position = 'fixed';
    link.style.bottom = '10px';
    link.style.right = '10px';
    return document.body.appendChild(link);
  };

  Common.prototype.loadTour = function(tour_css) {
    return this.load('link', this.server + tour_css, (function(_this) {
      return function() {
        return _this.startTour();
      };
    })(this));
  };

  Common.prototype.startTour = function() {
    var div;
    div = document.createElement('div');
    div.innerHTML = 'Click the logo to edit your landing page';
    div.className = 'closeheat-tour-common-logo';
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

},{}]},{},[1]);
