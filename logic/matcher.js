module.exports = function(user, friends){
    var friends = JSON.parse(JSON.stringify(friends));
   var bestie = null;
   for(let i = 0; i <friends.length; i++){
        let difference = 0;
        for(let j = 0; j < user.scores.length; j++){
            difference += Math.abs(user.scores[j] - friends[i].scores[j]);
        }
        friends[i].difference = difference;
        if(bestie === null){
            bestie = friends[i];
        }
        else {
            if(friends[i].difference < bestie.difference){
                bestie = friends[i];
            }
        }
   }
   return bestie;
}
