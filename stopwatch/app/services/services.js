var stopwatchServices = angular.module('stopwatchServices', []);

stopwatchServices.service('initService', [
	function () {
	  /* initialize schedule list */
	  this.timeSchedule = {
	  	history: []
	  };

	}]);
