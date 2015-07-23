module.exports =
class Common
  constructor: ->
    @server = window.CLOSEHEAT_SERVER
    @slug = window.CLOSEHEAT_SLUG

  init: ->
    @isAuthedForApp (resp) =>
      @appendButton()

      return if resp.tour_of_edit_button_finished
      @loadTour(resp.tour_css)

  isAuthedForApp: (callback) ->
    xhr = new XMLHttpRequest()

    xhr.onreadystatechange = ->
      if xhr.readyState == XMLHttpRequest.DONE
        if xhr.status == 200
          resp = JSON.parse(xhr.responseText)

          if resp.belongs_to_user
            callback(resp)
        else if xhr.status == 400
          console.log('There was an error 400')
        else
          console.log('something else other than 200 was returned')

    xhr.withCredentials = true
    xhr.open('GET', @server + '/common?slug=' + @slug, true)

    xhr.send()

  appendButton: ->
    img = document.createElement('img')
    img.src = @server + '/logo-square.png'
    img.width = 30
    img.height = 35

    link = document.createElement('a')
    link.href = @server + '/apps/' + @slug + '/live_edit'
    link.id = 'closeheat-common'
    link.innerHTML = img.outerHTML

    link.style.position = 'fixed'
    link.style.bottom = '10px'
    link.style.right = '10px'

    document.body.appendChild(link)

  loadTour: (tour_css) ->
    @load 'link', @server + tour_css, =>
      @startTour()

  startTour: ->
    div = document.createElement('div')
    div.innerHTML = 'Click the logo to edit your landing page'
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
