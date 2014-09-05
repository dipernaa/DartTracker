$().ready(function () {
    $(".gameTable").css({ "height" : $(".gameTable").width() + "px" });

    var TicTacToeLine = function (array) {
        var self = this;
        self.boxes = ko.observableArray();

        var i;
        for (i = 0; i < array.length; i = i + 1) {
            self.boxes.push(new TicTacToeBox(array[i]));
        }
    }

    var TicTacToeBox = function (number) {
        var self = this;
        self.imageSrc = ko.observable("../Assets/blank.png");
        self.number = ko.observable(number);
    }

    var GameViewModel = function () {
        var self = this;

        self.ticTacToeNumbers = ko.observableArray([
            new TicTacToeLine(["12", "20", "18"]),
            new TicTacToeLine(["11", "B", "6"]),
            new TicTacToeLine(["7", "3", "2"])]);

        self.handleClick = function (line) {
            line.imageSrc("../Assets/circle-white.png");
        }
    }

    ko.applyBindings(new GameViewModel());
})