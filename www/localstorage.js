angular.module('starter.services', [])


angular.module('starter', ['ionic'])

.controller('TodoCtrl', function ($scope, $ionicModal, $ionicPopup) {


	$scope.saved = localStorage.getItem('grocery-bear0064');
	$scope.todos = (localStorage.getItem('grocery-bear0064') !== null) ? JSON.parse($scope.saved) : [{
		text: 'DrumSticks',
		done: false
    }, {
		text: 'CornBread',
		done: false
    }, {
		text: 'Peach Schnapps',
		done: false
    }, {
		text: 'Carrots',
		done: false
    }];
	localStorage.setItem('grocery-bear0064', JSON.stringify($scope.todos));

	$scope.addTodo = function () {
		$scope.todos.push({
			text: $scope.todoText,
			done: false
		});
		$scope.todoText = ''; //clear the input after adding
		localStorage.setItem('grocery-bear0064', JSON.stringify($scope.todos));
	};

	/*Delete Funtion*/
	$scope.archive = function () {

		var latch = false;
		var oldTodos = $scope.todos;

		angular.forEach(oldTodos, function (todo) {
			if (todo.done) {
				latch = true;
				//alert("latch open");
			}
		});




		//alert($scope.todos.length);
		if (latch) {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete',
				template: 'Are you sure?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					$scope.todos = [];

					angular.forEach(oldTodos, function (todo) {
						if (!todo.done)
							$scope.todos.push(todo);
					});
					localStorage.setItem('grocery-bear0064', JSON.stringify($scope.todos));
				} else {

				}
			});
		} else {


			var alertPopup = $ionicPopup.alert({
				title: 'Nothing Selected!',
				template: 'Please select an item.'
			});
			alertPopup.then(function (res) {});



		}

	}

	/*end Delete*/


});
