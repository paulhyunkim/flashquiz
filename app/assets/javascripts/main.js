var app = angular.module('FlashQuizApp', ['ngResource']);

app.config(['$httpProvider', function($httpProvider) {
	var authToken = angular.element('meta[name=\"csrf-token\"]').attr('content');
	var defaults = $httpProvider.defaults.headers;

	defaults.common['X-CSRF-TOKEN'] = authToken;
	defaults.patch = defaults.patch || {};
	defaults.patch['Content-Type'] = 'application/json';
	defaults.common['Accept'] = 'application/json';
}]);

app.factory('Card', ['$resource', function($resource) {
	return $resource('/cards',
		{ },
		{ }
	);
}]);

app.factory('Score', ['$resource', function($resource) {
	return $resource('/scores',
		{ },
		{ }
	);
}]);

app.controller('MainController', ['$scope', '$timeout', '$http', 'Card', 'Score',
	function($scope, $timeout, $http, Card, Score) {

		$scope.name = "Paul";

		Card.query(function(cards) {
			$scope.cards = cards;
			console.log($scope.cards);
		})

		Score.query(function(scores) {
			$scope.scores = scores;
			console.log($scope.scores);
		})

	}]);