/**
* Initializes the page and sets the knockout bindings to elements on the page
*/
$().ready(function () {
    $("#errorMessage").hide();

    /**
    * Represents a line in the the cricket table. Each line contains a hits cell for 
    * each player and a cell containing the value for the cricket number
    * @param pointValue - point value of the cricket number
    */
    var CricketLine = function (pointValue) {
        var self = this;
        self.firstPlayerHits = ko.observable("");
        self.secondPlayerHits = ko.observable("");

        self.firstImageSrc = ko.observable("/Assets/blank.png");
        self.secondImageSrc = ko.observable("/Assets/blank.png");

        self.firstPlayerScore = ko.observable(0);
        self.secondPlayerScore = ko.observable(0);

        self.points = ko.observable(pointValue);

        /**
        * Handles the hit for this specific line's cricket number for player one
        */
        self.firstPlayerHit = function () {
            if (self.firstPlayerHits() !== "///") {
                self.firstPlayerHits(self.firstPlayerHits() + "/");
            } else if (self.secondPlayerHits() !== "///") {
                self.firstPlayerScore(self.firstPlayerScore() + getPointValue(self.points()));
            }
            self.firstImageSrc(getImageSrc(self.firstPlayerHits()));
        };

        /**
        * Handles the hit for this specific line's cricket number for player two
        */
        self.secondPlayerHit = function () {
            if (self.secondPlayerHits() !== "///") {
                self.secondPlayerHits(self.secondPlayerHits() + "/");
            } else if (self.firstPlayerHits() !== "///") {
                self.secondPlayerScore(self.secondPlayerScore() + getPointValue(self.points()));
            }
            self.secondImageSrc(getImageSrc(self.secondPlayerHits()));
        };
    };

    /**
    * Represents the cricket table and handles the actions performed on the page
    */
    var GameViewModel = function () {
        var self = this;
        self.firstPlayerName = ko.observable("");
        self.secondPlayerName = ko.observable("");

        var namesEntered = false;

        /**
        * Starts the cricket game if there are names entered
        */
        self.startGame = function () {
            if (checkNames(self.firstPlayerName(), self.secondPlayerName())) {
                $("#startGameButton").attr("disabled", true);
                $("#firstPlayer").html(self.firstPlayerName());
                $("#secondPlayer").html(self.secondPlayerName());
                $("#errorMessage").hide();
                namesEntered = true;
            } else {
                $("#errorMessage").show();
            }
        }

        self.firstPlayerScore = ko.pureComputed(function () {
            var total = 0;
            $.each(self.lines(), function () { total += this.firstPlayerScore() })
            return total;
        });

        self.secondPlayerScore = ko.pureComputed(function () {
            var total = 0;
            $.each(self.lines(), function () { total += this.secondPlayerScore() })
            return total;
        });

        self.lines = ko.observableArray();

        var i;
        var cricketNumbers = ["20", "19", "18", "17", "16", "15", "B"];
        for (i = 0; i < cricketNumbers.length; i = i + 1) {
            self.lines.push(new CricketLine(cricketNumbers[i]));
        }

        /**
        * Registers a hit for the first player for this specific line
        * @param line - cricket line that was clicked on
        */
        self.firstHit = function (line) {
            if (namesEntered) {
                line.firstPlayerHit();
                self.gameChecker();
            } else {
                $("#errorMessage").show();
            }
        }

        /**
        * Registers a hit for the second player for this specific line
        * @param line - cricket line that was clicked on
        */
        self.secondHit = function (line) {
            if (namesEntered) {
                line.secondPlayerHit();
                self.gameChecker();
            } else {
                $("#errorMessage").show();
            }
        }

        /**
        * Checks the cricket game to see if it is finished
        */
        self.gameChecker = function () {
            var firstPlayerDone = true;
            var secondPlayerDone = true;
            $.each(self.lines(), function () {
                if (firstPlayerDone) { firstPlayerDone = (this.firstPlayerHits() === "///"); }
                if(secondPlayerDone) { secondPlayerDone = (this.secondPlayerHits() === "///"); }
            });

            if (firstPlayerDone && self.firstPlayerScore() > self.secondPlayerScore()) {
                alert("First player wins with a score of " + self.firstPlayerScore() + ".");
                cleanCells();
                if (checkNames(self.firstPlayerName(), self.secondPlayerName())) {
                    updateLeaderboard(self.firstPlayerName(), self.secondPlayerName(), self.firstPlayerScore() - self.secondPlayerScore());
                }
            } else if (secondPlayerDone && self.secondPlayerScore() > self.firstPlayerScore()) {
                alert("Second player wins with a score of " + self.secondPlayerScore() + ".");
                cleanCells();
                if (checkNames(self.firstPlayerName(), self.secondPlayerName())) {
                    updateLeaderboard(self.secondPlayerName(), self.firstPlayerName(), self.secondPlayerScore() - self.firstPlayerScore());
                }
            } else if (firstPlayerDone && secondPlayerDone) {
                alert("Tie game with a score of " + self.firstPlayerScore() + ".\nNo leaderboard entry.");
                cleanCells();
            }
        }
    };

    ko.applyBindings(new GameViewModel());
});

/**
* Removes the knockout bindings from each cell in the cricket table
*/
function cleanCells() {
    var i;
    var cells = document.getElementsByClassName("hitsCell");
    for (i = 0; i < cells.length; i = i + 1) {
        ko.cleanNode(cells[i]);
    }
}

/**
* Gets the point value from the cricket number
* @param points - the point value from the cricket number
*/
function getPointValue(points) {
    return (points === "B" ? 25 : parseInt(points));
}

/**
* Changes the image representing the number of hits based on the number of hits
* @param hits - number of hits for this specific cricket number
*/
function getImageSrc(hits) {
    switch (hits) {
        case "/":
            return "/Assets/one-white.png";
        case "//":
            return "/Assets/two-white.png";
        default:
            return "/Assets/three-white.png";
    }
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

/**
* Updates the leaderboard database with the newly finished game
* @param winner - winner of the cricket game
* @param loser - loser of cricket game
* @param spread - difference of winner's and loser's score
*/
function updateLeaderboard(winner, loser, spread) {
    var date = new Date()
    var dataJSON = {
        "ID": "Cricket", "DATE": "NULL", "WINNER": winner.toUpperCase(),
        "LOSER": loser.toUpperCase(), "SPREAD": spread
    };

    $.ajax({
        type: "POST",
        url: "../Cricket/Create",
        contentType: "application/json",
        data: JSON.stringify(dataJSON)
    }).success(function () {
        //alert("added");
    }).error(function () {
        alert("error saving score to leaderboard");
    });
}