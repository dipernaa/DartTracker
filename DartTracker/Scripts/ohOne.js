$().ready(function () {
    var GameViewModel = function () {
        var self = this;
        self.firstPlayerScore = ko.observable(0);
        self.secondPlayerScore = ko.observable(0);

        self.gameModes = ko.observableArray([301, 501, 701]);
        self.selectedGameMode = ko.observableArray([301]);

        self.startGame = function () {
            $("#gameSelector").attr("disabled", true);
            self.firstPlayerScore(self.selectedGameMode())
            self.secondPlayerScore(self.selectedGameMode())
        }
    }

    ko.applyBindings(new GameViewModel());
})