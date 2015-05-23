module.exports =
class Common
  constructor: ->

  init: ->
    if 'has_cookie_for_closeheat_and_is_authed'
      @appendButton()
      @loadTour()

  appendButton: ->
    img = document.createElement('img')
    img.src = 'http://localhost:4000/assets/logo-square.png'
    img.width = 20
    img.height = 23

    link = document.createElement('a')
    link.href = 'http://staging.closeheat.com/apps/damp-dew-994/live_edit'
    link.id = 'closeheat-common'
    link.innerHTML = img.outerHTML

    link.style.position = 'fixed'
    link.style.bottom = 10
    link.style.right = 10

    document.body.appendChild(link)

  loadTour: ->
    @load 'link', 'css/tour.css', =>
      @startTour()

  startTour: ->
    div = document.createElement('div')
    div.innerHTML = 'Click the logo to edit your website'
    div.className = 'closeheat-common-logo-guide'
    document.body.appendChild(div)

  load: (tag, url, callback) ->
    done = false
    element = document.createElement(tag)

    if tag == 'link'
      element.href = url
      element.rel = "stylesheet"
      element.type = "text/css"
    else
      element.src = url

    element.onload = element.onreadystatechange = ->
      if !done && (!@readyState || @readyState == "loaded" || @readyState == "complete")
        done = true
        callback?()

    document.getElementsByTagName('head')[0].appendChild(element)

new Common().init()
