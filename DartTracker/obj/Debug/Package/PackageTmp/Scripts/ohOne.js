$().ready(function () {
    $("#errorMessage").hide();
    $("#playerTurn").hide();

    var DartBoardModel = function (array) {
        var self = this;
        self.numbers = ko.observableArray(array);
    }

    var GameViewModel = function () {
        var self = this;
        self.firstPlayerName = ko.observable("");
        self.secondPlayerName = ko.observable("");

        self.firstPlayerScore = ko.observable(0);
        self.secondPlayerScore = ko.observable(0);

        self.gameModes = ko.observableArray([301, 501, 701]);
        self.selectedGameMode = ko.observableArray([301]);

        self.dartNumbers = ko.observableArray();

        var i;
        for (i = 1; i <= 20; i = i + 4) {
            self.dartNumbers.push(new DartBoardModel([i, i + 1, i + 2, i + 3]));
        }

        //self.handleClick = function () {
        //    $("td").css("background-color", "blue");
        //}

        self.startGame = function () {
            if (checkNames(self.firstPlayerName(), self.secondPlayerName())) {
                $("#gameSelector").attr("disabled", true);
                $("#startGameButton").attr("disabled", true);
                $("#firstPlayer").html(self.firstPlayerName());
                $("#secondPlayer").html(self.secondPlayerName());
                self.firstPlayerScore(self.selectedGameMode())
                self.secondPlayerScore(self.selectedGameMode())
                $("#errorMessage").hide();
                $("#playerTurn").show();
            } else {
                $("#errorMessage").show();
            }
        }
    }

    ko.applyBindings(new GameViewModel());
})

/**
* Checks the entered names to make sure they aren't white space or entered
* @param firstPlayerName - first player's name
* @param secondPlayerName - second player's name
*/
function checkNames(firstPlayerName, secondPlayerName) {
    var isGood = false;
    if (firstPlayerName.trim() !== "" && secondPlayerName.trim() !== "") {
        isGood = true;
    }
    return isGood;
}