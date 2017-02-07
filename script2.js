let teamStats = [];

let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.fantasydata.net/v3/nfl/scores/JSON/TeamSeasonStats/2016",
    "method": "GET",
    "headers": {
        "ocp-apim-subscription-key": "",
        "cache-control": "no-cache",
        "postman-token": ""
    }
}

let searchForm = document.getElementById("search");
let formTag = document.getElementsByTagName('form')[0];
//event listener to get user input
formTag.addEventListener('submit', function(event) {
    event.preventDefault();
    // console.log(formTag);
    let userResponse = search.value; //gets team name
    // console.log(userResponse);
    modifyResponse(userResponse);
    return userResponse;


})


// convert userResponse which is a string (team name)
// to an integer for use in teamStats array
function modifyResponse(userResponse) {
    console.log("In modifyResponse function");
    console.log(userResponse);
    let modifiedUserResponse = 0;
    if (userResponse === 'Cardinals') {
        modifiedUserResponse = 0;
    } else if (userResponse === 'Falcons') {
        modifiedUserResponse = 1;
    } else if (userResponse === 'Ravens') {
        modifiedUserResponse = 2;
    } else if (userResponse === 'Bills') {
        modifiedUserResponse = 3;
    }
    console.log(modifiedUserResponse);
    return modifiedUserResponse;
}


//asynchronous ajax method using settings as parameter to get data from fantasydata.net
let getResponse = $.ajax(settings) //jQuery call to pull data with varible settings
    .done(function(response) {
        // console.log(getResponse); //single object response NOT a promise object
        // console.log(getResponse.responseJSON); //an array of 32 objects
        teamStats = getResponse['responseJSON'];
        console.log(teamStats);
        let pointsScored = teamStats[modifiedUserResponse]["Score"];
        let pointsScoredAgainst = teamStats[modifiedUserResponse]["OpponentScore"];
        // console.log(pointsScored);
        // console.log(pointsScoredAgainst);
        let homeTeamScores = Math.pow(pointsScored, 1 / 2.37);
        // console.log(homeTeamScores);
        let awayTeamScores = Math.pow(pointsScoredAgainst, 1 / 2.37)
        // console.log(awayTeamScores);
        let teamWinPercentage = (homeTeamScores / (homeTeamScores + awayTeamScores));
        // console.log(teamWinPercentage);
        let projWins = (teamWinPercentage * 16).toFixed(2);
        console.log('This is projected team wins: ' + projWins);
        return projWins;
        // teamWinCalculator(teamStats);
        // console.log(teamWinCalculator(teamStats));
    });

// keep getting Uncaught Type Error: Cannot read property of 'Score' of undefined or 'modifiedUserResponse' of undefined
// function teamWinCalculator(teamStats) {
//     let pointsScored = teamStats[modifiedUserResponse]["Score"];
//     let pointsScoredAgainst = teamStats[modifiedUserResponse]["OpponentScore"];
//     // console.log(pointsScored);
//     // console.log(pointsScoredAgainst);
//     let homeTeamScores = Math.pow(pointsScored, 1 / 2.37);
//     // console.log(homeTeamScores);
//     let awayTeamScores = Math.pow(pointsScoredAgainst, 1 / 2.37)
//     // console.log(awayTeamScores);
//     let teamWinPercentage = (homeTeamScores / (homeTeamScores + awayTeamScores));
//     // console.log(teamWinPercentage);
//     let projWins = teamWinPercentage * 16;
//     // console.log(projWins);
//     return projWins;
// }



// reset team name search field
// function clearSearchField() {
//     document.getElementById("search").reset();
// }


//  for later, convert code to use fetch()
// function getStats(){
//   let url = 'https://api.fantasydata.net/v3/nfl/scores/JSON/TeamSeasonStats/2016' //team stats 2015 season
//   return fetch(url)
//   .then(function(response){
//
//   })
// }
// }
