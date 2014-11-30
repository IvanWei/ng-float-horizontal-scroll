(function() {
  var app;

  app = angular.module("floatHorizontalScroll", []);

  app.directive("floatHorizontalScroll", function() {
    return {
      restrict: "A",
      scope: "@",
      link: function(scope, element, attrs) {
        var browser, floatHorizontalScroll, newFloatScroll, windowDimensions;
        element = $(element);
        element.css("position", "relative");
        windowDimensions = $(window);
        browser = $(document);
        newFloatScroll = "<div style='top: 0; overflow: scroll; position:absolute;'><div style='height: 1px;'>1111111</div></div>";
        floatHorizontalScroll = $(newFloatScroll);
        element.append(floatHorizontalScroll);
        scope.getWindowDimensions = function() {
          return {
            h: windowDimensions.height(),
            w: windowDimensions.width()
          };
        };
        scope.getBrowserScroll = function() {
          return {
            top: browser.scrollTop(),
            left: browser.scrollLeft()
          };
        };
        scope.getTargetScroll = function() {
          return {
            top: element.scrollTop(),
            left: element.scrollLeft()
          };
        };
        scope.getFloatScroll = function() {
          return {
            top: floatHorizontalScroll.scrollTop(),
            left: floatHorizontalScroll.scrollLeft()
          };
        };
        scope.$watch(scope.getBrowserScroll, (function(newValue, oldValue) {
          var height;
          height = windowDimensions.height() - element.offset().top;
          if (newValue.top > 0) {
            height += newValue.top;
          }
          if (height >= element.children().height()) {
            floatHorizontalScroll.hide();
          } else {
            floatHorizontalScroll.show();
          }
          return floatHorizontalScroll.css("top", (height - 15) + "px");
        }), true);
        scope.$watch(scope.getTargetScroll, (function(newValue, oldValue) {
          return floatHorizontalScroll.css("left", newValue.left);
        }), true);
        windowDimensions.bind("resize", function() {
          return scope.$apply();
        });
        browser.bind("scroll", function() {
          floatHorizontalScroll.children().css("width", element.children().width() + "px");
          floatHorizontalScroll.css({
            "width": "100%",
            "top": (windowDimensions.height() - element.offset().top - 15) + "px"
          });
          return scope.$apply();
        });
        floatHorizontalScroll.bind("scroll", function() {
          element.scrollLeft(floatHorizontalScroll.scrollLeft());
          return scope.$apply();
        });
        return element.bind("scroll", function() {
          floatHorizontalScroll.scrollLeft(element.scrollLeft());
          return scope.$apply();
        });
      }
    };
  });

}).call(this);
