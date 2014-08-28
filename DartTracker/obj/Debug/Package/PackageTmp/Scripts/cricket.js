$().ready(function () {
    var CricketLine = function (pointValue) {
        var self = this;
        self.firstPlayerHits = ko.observable("");
        self.secondPlayerHits = ko.observable("");

        self.firstImageSrc = ko.observable("/Assets/blank.png");
        self.secondImageSrc = ko.observable("/Assets/blank.png");

        self.firstPlayerScore = ko.observable(0);
        self.secondPlayerScore = ko.observable(0);

        self.points = ko.observable(pointValue);

        self.firstPlayerHit = function () {
            if (self.firstPlayerHits() !== "///") {
                self.firstPlayerHits(self.firstPlayerHits() + "/");
            } else if (self.secondPlayerHits() !== "///") {
                self.firstPlayerScore(self.firstPlayerScore() + getPointValue(self.points()));
            }
            self.firstImageSrc(getImageSrc(self.firstPlayerHits()));
        };

        self.secondPlayerHit = function () {
            if (self.secondPlayerHits() !== "///") {
                self.secondPlayerHits(self.secondPlayerHits() + "/");
            } else if (self.firstPlayerHits() !== "///") {
                self.secondPlayerScore(self.secondPlayerScore() + getPointValue(self.points()));
            }
            self.secondImageSrc(getImageSrc(self.secondPlayerHits()));
        };
    };

    var GameViewModel = function () {
        var self = this;
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

        self.firstHit = function (line) {
            line.firstPlayerHit();
            self.gameChecker();
        }

        self.secondHit = function (line) {
            line.secondPlayerHit();
            self.gameChecker();
        }

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
            } else if (secondPlayerDone && self.secondPlayerScore() > self.firstPlayerScore()) {
                alert("Second player wins with a score of " + self.secondPlayerScore() + ".");
                cleanCells();
            } else if (firstPlayerDone && secondPlayerDone) {
                alert("Tie game with a score of " + self.firstPlayerScore() + ".");
                cleanCells();
            }
        }
    };

    ko.applyBindings(new GameViewModel());
});

function cleanCells() {
    var i;
    var cells = document.getElementsByClassName("hitsCell");
    for (i = 0; i < cells.length; i = i + 1) {
        ko.cleanNode(cells[i]);
    }
}

function getPointValue(points) {
    return (points === "B" ? 25 : parseInt(points));
}

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