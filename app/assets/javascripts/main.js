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
		$scope.currentCard;
		$scope.triesRemaining = 3;

		Card.query(function(cards) {
			$scope.cards = cards;
			// console.log($scope.cards);
		});

		Score.query(function(scores) {
			$scope.scores = scores;
			// console.log($scope.scores);
		});

		$scope.newCard = new Card();

		$scope.createCard = function() {
			$scope.newCard.$save(function(card) {
				$scope.cards.push(card);
				// creating new card to clear fields
				$scope.newCard = new Card;
				// console.log($scope.cards);
			})
		};

		$scope.getNewCard = function() {
			$scope.currentCard = $scope.cards[Math.floor(Math.random() * $scope.cards.length)];
		};

		$scope.checkAnswer = function(answer) {
			if (answer === $scope.currentCard.answer) {
				console.log("Correct!");
				$scope.triesRemaining = 3;
			} else {
				console.log("Sorry. Try again.");
				$scope.triesRemaining--;
			}
		};

	}]);