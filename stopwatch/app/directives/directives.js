console.log('directive call');

var sideBarDirective = angular.module('sideBarDirective', []);

sideBarDirective.directive('itemInfo', function() {
	return { 
		restrict: 'E', 
		scope: {
			info: '=' 
		}, 
		templateUrl: 'app/directives/item-info.html' 
	}; 
});

sideBarDirective.directive('btnState', function() { 
  return { 
    restrict: 'E', 
    scope: {}, 
    templateUrl: 'app/directives/btn-state.html',
    link: function(scope, element, attrs) { 
      	scope.buttonText = "X", 
        scope.installed = false, 

        scope.state = function() { 
        element.toggleClass('btn-active'); 
        if(scope.installed) { 
          scope.buttonText = "X"; 
          scope.installed = false; 
        } else { 
          scope.buttonText = "Open"; 
          scope.installed = true; 
        } 
      } 
    }    
  }; 
});