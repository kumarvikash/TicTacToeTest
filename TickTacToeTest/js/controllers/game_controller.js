'use strict';

var app = angular.module('starter.gamecontrollers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})
.controller('TicTacToeCtrl', function ($scope, $stateParams, game, grid_size) {
    $scope.grid = new Array(grid_size);
    $scope.status_message = "";
    $scope.computer_first = false;
    $scope.game_over = false;

    $scope.startGame = function () {
        $scope.status_message = "";
        $scope.game_over = false;
        game.start($scope.grid.length, $scope.computer_first);
        $scope.status_message = "game started";
    }

    $scope.makeMove = function (col, row) {
        var boardIndex, symbol, winner;
        boardIndex = (row * grid_size) + col;
        if (game.board && game.board.canMove(boardIndex) && !game.winner && !game.tie) {
            // make move
            game.move(boardIndex);

            // check winner
            if (game.winner) {
                if (game.winner === game.board.X) $scope.status_message = "you lose!";
                if (game.winner === game.board.O) $scope.status_message = "you win!";
                $scope.game_over = true;
            }

            // check tie
            if (game.tie) {
                $scope.status_message = "tie! no one wins!";
                $scope.game_over = true;
            }
        }
    }

    $scope.getSquareSymbol = function (col, row) {
        var boardIndex = (row * grid_size) + col;
        return game.board ? game.board.renderSquare(boardIndex) : "";
    }

    $scope.isSquareInWinningCombo = function (col, row) {
        var boardIndex;
        if (game.board && game.winner && game.board.winning_combo) {
            boardIndex = (row * grid_size) + col;
            return game.board.winning_combo.indexOf(boardIndex) > -1;
        }
        return false;
    }
});

app.constant('grid_size', 3);

app.factory('game', function () {
    return new Game();
});