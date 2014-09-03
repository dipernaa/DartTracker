$().ready(function () {
    function LeaderboardViewModel() {
        var self = this;
        self.scores = ko.observableArray(JSON.parse($("#scores").val()).SCORES);
    }

    ko.applyBindings(new LeaderboardViewModel());
    setDataTable();
});

function setDataTable() {
    $("#leaderboardTable").DataTable({
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    });
}