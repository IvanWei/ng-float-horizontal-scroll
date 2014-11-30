app = angular.module("floatHorizontalScroll", [])

app.directive "floatHorizontalScroll", () ->

  return {
    restrict: "A"
    scope: "@"
    link: (scope, element, attrs) ->
      element = $(element)
      element.css "position", "relative"

      windowDimensions = $(window)
      browser = $(document)

      newFloatScroll = "<div style='top: 0; overflow: scroll; position:absolute;'><div style='height: 1px;'>1111111</div></div>"
      floatHorizontalScroll = $(newFloatScroll)

      element.append floatHorizontalScroll

      # get viewport's resize in browser
      scope.getWindowDimensions = ->
        h: windowDimensions.height()
        w: windowDimensions.width()

      # get browser's scroll position
      scope.getBrowserScroll = ->
        top: browser.scrollTop()
        left: browser.scrollLeft()
      
      # get target's position of horizontal scroll
      scope.getTargetScroll = ->
        top: element.scrollTop()
        left: element.scrollLeft()

      # get float's position of horizontal scroll
      scope.getFloatScroll = ->
        top: floatHorizontalScroll.scrollTop()
        left: floatHorizontalScroll.scrollLeft()


      scope.$watch scope.getBrowserScroll, ((newValue, oldValue) ->
        height = windowDimensions.height() - element.offset().top
        height += newValue.top if newValue.top > 0

        if height >= element.children().height()
          floatHorizontalScroll.hide()

        else
          floatHorizontalScroll.show()

        floatHorizontalScroll.css "top", ((height - 15) + "px")

      ), true

      scope.$watch scope.getTargetScroll, ((newValue, oldValue) ->
        floatHorizontalScroll.css "left", newValue.left # move floatHorizontalScroll's div x-axis

      ), true


      # bind
      windowDimensions.bind "resize", -> scope.$apply()

      browser.bind "scroll", ->
        floatHorizontalScroll.children().css "width", (element.children().width() + "px")
        floatHorizontalScroll.css {"width": "100%", "top": (windowDimensions.height() - element.offset().top - 15) + "px"}
        scope.$apply()

      floatHorizontalScroll.bind "scroll", ->
        element.scrollLeft floatHorizontalScroll.scrollLeft()
        scope.$apply()

      element.bind "scroll", ->
        floatHorizontalScroll.scrollLeft element.scrollLeft()
        scope.$apply()

  }
  