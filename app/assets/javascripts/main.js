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
	return $resource('/cards/:id',
		{ id: '@id' },
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
		$scope.timer = 0;
		$scope.totalScore = 0;
		$scope.ready = false;
		$scope.finished = false;
		var maxScorePerCard;
		var currentTimeout;

		Card.query(function(cards) {
			$scope.deck = cards;
			maxScorePerCard = 100 / $scope.deck.length;
			// console.log($scope.cards);
		});

		Score.query(function(scores) {
			$scope.scores = scores;
			// console.log($scope.scores);
		});

		$scope.newCard = new Card();

		$scope.toggleReady = function() {
			$scope.ready = $scope.ready ? false : true;
			getNewCard();
		}

		$scope.createCard = function() {
			$scope.newCard.$save(function(card) {
				$scope.deck.push(card);
				// creating new card to clear fields
				$scope.newCard = new Card;
				// console.log($scope.cards);
			})
		};

		$scope.deleteCard = function(card) {
			card.$delete(function() {
				var position = $scope.deck.indexOf($scope.currentCard);
				$scope.deck.splice(position, 1); 
			})
		}

		var getNewCard = function() {
			$scope.currentCard = $scope.deck[Math.floor(Math.random() * $scope.deck.length)];
			startTimer();
		};

		var removeCard = function() {
			var position = $scope.deck.indexOf($scope.currentCard);
			$scope.deck.splice(position, 1);
		}

		$scope.checkAnswer = function(answer) {
			if (answer === $scope.currentCard.answer) {
				// console.log("Correct!");
				addScore();
				removeCard();
				getNewCard();
				resetTimer();
				$scope.triesRemaining = 3;
				if ($scope.deck.length === 0) {
					$scope.finished = true;
				}

			} else {
				// console.log("Sorry. Try again.");
				$scope.triesRemaining--;
			}
		};


		var addScore = function() {
			var multiplierA, multiplierB;

			if ($scope.timer <= 10) {
				multiplierA = 1;
			} else if ($scope.timer <= 20) {
				multiplierA = 0.9;
			} else if ($scope.timer <= 30) {
				multiplierA = 0.8;
			} else {
				multiplierA = 0.75;
			}

			if ($scope.triesRemaining === 3) {
				multiplierB = 1;
			} else if ($scope.triesRemaining === 2) {
				multiplierB = 0.75;
			} else if ($scope.triesRemaining === 1) {
				multiplierB = 0.5;
			} else {
				multiplierB = 0;
			}

			var score = maxScorePerCard * multiplierA * multiplierB;
			$scope.totalScore += score;
		}



		// TIMER
		var tick = function() {
			$scope.timer += 0.1;
			currentTimeout = $timeout(tick, 100);
		}
		var startTimer = function() {
			$timeout(tick, 100);
		}
		var stopTimer = function() {
			$timeout.cancel(currentTimeout);
		}
		var resetTimer = function() {
			$timeout.cancel(currentTimeout);
			$scope.timer = 0;
		}

	}]);