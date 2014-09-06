var app = angular.module('FlashQuizApp', ['ngResource', 'ui.bootstrap']);

app.config(['$httpProvider', function($httpProvider) {
	var authToken = angular.element('meta[name=\"csrf-token\"]').attr('content');
	var defaults = $httpProvider.defaults.headers;

	defaults.common['X-CSRF-TOKEN'] = authToken;
	defaults.patch = defaults.patch || {};
	defaults.patch['Content-Type'] = 'application/json';
	defaults.common['Accept'] = 'application/json';
}]);

app.factory('Card', ['$resource', function($resource) {
	return $resource('/decks/:deckId/cards/:id',
		{ deckId: '@deckId',
			id: '@id'
		},
		{ }
	);
}]);

app.factory('Deck', ['$resource', function($resource) {
	return $resource('/decks/:id',
		{ id: '@id' },
		{ }
	);
}]);

app.factory('PublicDeck', ['$resource', function($resource) {
	return $resource('/publicdecks/',
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

app.factory('CurrentUser', ['$resource', function($resource) {
	return $resource('/currentuser',
		{ },
		{ 
			'addCard': { method: 'POST', url: 'user/addcard' },
			'postScore': { method: 'POST', url: 'user/postscore' }
		}
	);
}]);

app.controller('MainController', ['$scope', '$timeout', '$http', '$location', 'Card', 'Score', 'CurrentUser', 'Deck', 'PublicDeck',
	function($scope, $timeout, $http, $location, Card, Score, CurrentUser, Deck, PublicDeck) {

		$scope.name = "Paul";
		$scope.currentCard;
		$scope.triesRemaining = 3;
		$scope.timer = 0;
		// $scope.totalScore = 0;
		$scope.ready = false;
		$scope.finished = false;
		var maxScorePerCard;
		var currentTimeout;

		// NOT FULLPROOF!! 
		var deckId = $location.absUrl().split('/').pop();

		Card.query({ deckId:deckId }, function(cards) {
			$scope.deck = cards;
			maxScorePerCard = 100 / $scope.deck.length;
			console.log($scope.deck);
		});

		Deck.query(function(decks) {
			$scope.decks = decks;
			console.log("XXXXXX");
			console.log($scope.decks);
		});

		
		PublicDeck.query(function(decks) {
			$scope.publicDecks = decks;
			
			console.log($scope.publicDecks);
			// $scope.totalScore = new Score({ points:0, username: $scope.currentUser.username });
		});

		Score.query(function(scores) {
			$scope.highScores = scores;
			// console.log($scope.scores);
		});

		CurrentUser.get(function(user) {
			$scope.currentUser = user;
			console.log($scope.currentUser);
			$scope.totalScore = new Score({ points:0, username: $scope.currentUser.username });
		});

		
		$scope.newDeck = new Deck();
		// $scope.currentDeck = $scope.decks;
		$scope.newCard = new Card({deckId:deckId});

		

		
		

		$scope.toggleReady = function() {
			$scope.ready = $scope.ready ? false : true;
			getNewCard();
		};

		$scope.createDeck = function() {
			$scope.newDeck.$save(function(deck) {
				$scope.decks.push(deck);
				$scope.newDeck = new Deck;
			});
		};

		$scope.createCard = function() {
			$scope.newCard.$save(
				function(card) {
				$scope.deck.push(card);
				$scope.newCard = new Card({deckId:deckId});
			});
		};

		$scope.deleteCard = function(card) {
			card.$delete({deckId:deckId, id: card.id}, function() {
				var position = $scope.deck.indexOf(card);
				console.log($scope.deck);
				$scope.deck.splice(position, 1);
				console.log($scope.deck);
			});
		};

		$scope.deleteDeck = function(deck) {
			deck.$delete({id:deck.id}, function() {
				var position = $scope.decks.indexOf(deck);
				console.log($scope.decks);
				$scope.decks.splice(position, 1);
				console.log($scope.decks);
			});
		};

		// $scope.editCard = function(card) {
		// 	card.$delete(function() {
		// 		var position = $scope.deck.indexOf($scope.currentCard);
		// 		$scope.deck.splice(position, 1); 
		// 	});
		// };


		var getNewCard = function() {
			$scope.currentCard = $scope.deck[Math.floor(Math.random() * $scope.deck.length)];
			startTimer();
		};

		var removeCard = function() {
			var position = $scope.deck.indexOf($scope.currentCard);
			$scope.deck.splice(position, 1);
		};

		var postScore = function() {
			$scope.totalScore.$save(function() {
				console.log("Saved!");
				$scope.highScores.push($scope.totalScore);
				console.log($scope.highScores);
			});
			// $scope.currentUser.$postScore($scope.totalScore);
			
		};

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
					postScore();
				}

			} else {
				$scope.triesRemaining--;
				if ($scope.triesRemaining === 0) {
					addScore();
					removeCard();
					getNewCard();
					resetTimer();
					$scope.triesRemaining = 3;
					if ($scope.deck.length === 0) {
						$scope.finished = true;
						postScore();
					}
				}
			}

			$scope.answer = "";
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
			$scope.totalScore.points += score;
		};

		// TIMER
		var tick = function() {
			$scope.timer += 0.1;
			currentTimeout = $timeout(tick, 100);
		};
		var startTimer = function() {
			$timeout(tick, 100);
		};
		var stopTimer = function() {
			$timeout.cancel(currentTimeout);
		};
		var resetTimer = function() {
			$timeout.cancel(currentTimeout);
			$scope.timer = 0;
		};



	}]);