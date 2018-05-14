var allPossibleFriends = require("app/data/friends.js");

module.exports = function(app) {

    var bestMatch = 0;

    app.get("api/friends", function(req, res) {
        res.json(allPossibleFriends[bestMatch]);
    });
    app.post("/api/friends", function(req, res) {

        var userScores = req.body.scores;
        var objectUserScore = [];
        var friendScoresArray = [];
        var objectFriendScore = [];

        function difference (arr) {

            var totalDifference = 0;

            for (i = 0; i < objectUserScore.length; i++){
                var absoluteValue = objectUserScore[i] - arr[i];
                totalDifference += Math.abs(absoluteValue);
            }
            return totalDifference;

        }

        for (i = 0; i < userScores.length; i++){
            objectUserScore.push(parseInt(userScores[i]));
        }

        for (i = 0; i < allPossibleFriends.length; i++){
            friendScoresArray.push(allPossibleFriends[i].scores); //check what scores is
        }

        for (i = 0; i < friendScoresArray.length; i++){
            objectFriendScore.push(friendScoresArray[i].map(num => parseInt(num, 10)));

        }

        var first = difference(objectFriendScore[0]);
        var second = difference (objectFriendScore[1]);
        var third = difference (objectFriendScore[2]);

        if (first < second && first < third){
            bestMatch = 0;
        }
        else if (second < first && second < third){
            bestMatch = 1;
        }

        else {
            bestMatch = 2;
        }

    });

};