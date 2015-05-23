var Core;

module.exports = Core = (function() {
  function Core() {}

  Core.prototype.init = function() {
    console.log('load');
    debugger;
  };

  return Core;

})();

$(function() {
  return new Core(GITHUB_TOKEN, GITHUB_NAME, GITHUB_REPO, APP_DOMAIN).init();
});
