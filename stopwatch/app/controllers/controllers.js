var stopwatchControllers = angular.module('stopwatchControllers', []);

/*
controller: stopwatchCtrl
params:  $scope, $timeout, $initService
* handle toggling between modes
* binding data
*/

stopwatchControllers.controller('stopwatchCtrl', [
 	'$scope',
 	'$timeout',
 	'initService', 
 	function ($scope, $timeout, initService) {

 		var timeStart = 0;
 		var timeEnd = 0;
 		var lapNumber = 0;

 		var freeText = 'freeText';

		$scope.timeSchedule = initService.timeSchedule;
 		
 		$scope.mode = 'Play';
 		$scope.icon = 'icon-play';
 		$scope.timer = '00:00.00';


 		function checkTime(i) {
 			i = (i < 1) ? 0 : i;

 			/*add zero in front of numbers < 10*/
 			if (i < 10) i = '0' + i; 
 			return i;
 		}

		/*
		function: startTimer
		trigger timer to start recursive, call again when timer expires
		*/
		function startTimer() {
			/* toggle start\stop button */
			$scope.mode = 'Stop';
			$scope.icon = 'icon-stop';

			var h, m, s, ms, today = new Date();
			/* compute for the duration, normalize for the user */
			timeEnd = today.getTime();
			ms = Math.floor((timeEnd - timeStart) / 1000);
			h =  checkTime(Math.floor(ms / 3600));
			ms = Math.floor(ms % 3600);
			m = checkTime(Math.floor(ms / 60));
			ms = Math.floor(ms % 60);
			s = checkTime(Math.floor(ms));
			/* normalize time string */
			$scope.timer = h + ':' + m + '.' + s;

			/* timer expired, restart timer */
			tmPromise = $timeout(function () {
				startTimer();
			}, 500);
		}

		/*
		function: stopTimer
		handle end of timer
		*/
	   
		function stopTimer() {
			/* toggle start\stop button */
			$scope.mode = 'Play';
			$scope.icon = 'icon-play';

			/* stop timeout service */
			$timeout.cancel(tmPromise);
		}

		/*
		function: addlap
		handle adding lap to table
		*/
	   
		$scope.addLapToTable = function () {

			lapNumber = lapNumber + 1;
			// $scope.timeSchedule.history.push([timeEnd,freeText,lapNumber]);
			
			/* add to history */
			$scope.timeSchedule.history.push([timeEnd,freeText]);
			$scope.clearButtomState = true;

			/* localStorage: Storing the record */
			localStorage.setItem('$scope.timeSchedule.history',
			 JSON.stringify($scope.timeSchedule.history)
			 );
		}

		/*
		function: remove lap from table
		handle remove lap from table
		*/
	   
		$scope.removeLapFromTable = function (number) {
			/* remove from history */
			$scope.timeSchedule.history.pop([
				timeEnd,
				freeText,
				number
				]);
			
			lapNumber = lapNumber - 1;
		}

	   
		$scope.clearTable = function () {
			
			/* show/hide clear table button */			
			$scope.clearButtomState = false;

			/* clear history and reset */
			$scope.timeSchedule = initService.timeSchedule.history = [];
			$scope.timeSchedule = initService.timeSchedule;
			lapNumber = 0;

			/* localStorage: removing all the records */
			localStorage.removeItem('$scope.timeSchedule.history');

			console.log(lapNumber);
		}

		/*
		function: $scope.toggleTimer
		toggle between modes
		*/

		$scope.toggleTimer = function () {
			/* handle modes */
			if ($scope.mode === 'Play') {
				var today = new Date();
				timeStart = today.getTime();
				startTimer();
			} else {
				stopTimer();
			}
		};


}]);
