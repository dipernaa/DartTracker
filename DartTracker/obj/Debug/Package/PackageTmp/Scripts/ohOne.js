$().ready(function () {
    $("#errorMessage").hide();
    $("#playerTurn").hide();

    var DartBoardModel = function (array) {
        var self = this;
        self.numbers = ko.observableArray(array);
    }

    var GameViewModel = function () {
        var count = 0;
        var total = 0;
        var multiplyer = 1;
        var namesEntered = false;
        var activeMultiplyer = false;
        var firstPlayerTurn = true;

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

        self.handleClick = function (item, event) {
            if (namesEntered) {
                if (count < 3) {
                    $(event.target).css("background-color", "#808080");
                    count = count + 1;
                    total = total + (getPointValue($(event.target).html()) * multiplyer);
                    multiplyer = 1;
                    $(".multiplyerCell").css("background-color", "#497959");
                    activeMultiplyer = false;
                }
            } else {
                $("#errorMessage").show();
            }
        }

        self.doubleClick = function (item, event) {
            if (namesEntered) {
                if (!activeMultiplyer) {
                    $(event.target).css("background-color", "#bada55");
                    multiplyer = 2;
                    activeMultiplyer = true;
                }
            } else {
                $("#errorMessage").show();
            }
        }

        self.tripleClick = function (item, event) {
            if (namesEntered) {
                if (!activeMultiplyer) {
                    $(event.target).css("background-color", "#bada55");
                    multiplyer = 3;
                    activeMultiplyer = true;
                }
            } else {
                $("#errorMessage").show();
            }
        }

        self.submitTurn = function () {
            if (namesEntered) {
                if (firstPlayerTurn) {
                    if (self.firstPlayerScore() - total >= 0) {
                        self.firstPlayerScore(self.firstPlayerScore() - total);
                        if (self.firstPlayerScore() === 0) {
                            alert("game over")
                            cleanCells();
                            $("#playerTurn").html("First Player Wins!");
                        } else {
                            $("#playerTurn").html("Second Player's Turn");
                        }
                    } else {
                        alert("over");
                        $("#playerTurn").html("Second Player's Turn");
                    }
                } else {
                    if (self.secondPlayerScore() - total >= 0) {
                        self.secondPlayerScore(self.secondPlayerScore() - total);
                        if (self.secondPlayerScore() === 0) {
                            alert("game over")
                            cleanCells();
                            $("#playerTurn").html("Second Player Wins!");
                        } else {
                            $("#playerTurn").html("First Player's Turn");
                        }
                    } else {
                        alert("over");
                        $("#playerTurn").html("First Player's Turn");
                    }
                }
                count = 0;
                total = 0;
                multiplyer = 1;
                activeMultiplyer = false;
                $("td").css("background-color", "#497959");
                firstPlayerTurn = !firstPlayerTurn;
            } else {
                $("#errorMessage").show();
            }
        }

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
                namesEntered = true;
            } else {
                $("#errorMessage").show();
            }
        }
    }

    ko.applyBindings(new GameViewModel());
})

/**
* Removes the knockout bindings from each cell in the cricket table
*/
function cleanCells() {
    var i;
    var cells = document.getElementsByClassName("hitsCell");
    for (i = 0; i < cells.length; i = i + 1) {
        ko.cleanNode(cells[i]);
    }
    ko.cleanNode(document.getElementById("submitTurnButton"));
}

/**
* Gets the point value from the cricket number
* @param points - the point value from the cricket number
*/
function getPointValue(points) {
    return (points === "bull" ? 25 : parseInt(points));
}

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