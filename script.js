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

formTag.addEventListener('submit', function(event) { //event listener to get user input
    event.preventDefault();
    let userResponse = search.value.toLowerCase(); //gets team name, conver toLowerCase
    let normalizeResponse = modifyUserResponse(userResponse); //use lookUp object to convert to integer
    //=========== asynchronous code ========================//
    // asynchronous ajax method using settings as parameter to get data from fantasydata.net
    let getResponse = $.ajax(settings) //jQuery call to pull data with varible settings
        .done(function(response) {
            console.log(response);
            let teamStats = getResponse['responseJSON'];
            let projectedWins = getTeamWins(teamStats, normalizeResponse);

        }); // stop for .done function
    // stop for let getResponse indent lines. that just annoys me.
}) // end of addEventListener function

//=== convert user response with lookup object to an integer ===//
function modifyUserResponse(userResponse) {
    console.log("In modifyUserResponse");
    console.log(userResponse);
    var lookUp = {
        cardinals: 0,
        arizona: 0,
        falcons: 1,
        atlanta: 1,
        ravens: 2,
        baltimore: 2,
        bills: 3,
        buffalo: 3,
        panthers: 4,
        bears: 5,
        chicago: 5,
        bengals: 6,
        cincinnati: 6,
        browns: 7,
        cleveland: 7,
        cowboys: 8,
        dallas: 8,
        broncos: 9,
        denver: 9,
        lions: 10,
        detriot: 10,
        packers: 11,
        texans: 12,
        colts: 13,
        jaguars: 14,
        chiefs: 15,
        'kansas city': 15,
        rams: 16,
        'st. louis': 16,
        dolphins: 17,
        vikings: 18,
        patriots: 19,
        saints: 20,
        giants: 21,
        jets: 22,
        raiders: 23,
        oakland: 23,
        eagles: 24,
        steelers: 25,
        pittsburgh: 25,
        chargers: 26,
        'san diego': 26,
        seahawks: 27,
        seattle: 27,
        '49ers': 28,
        49: 28,
        'san francisco': 28,
        buccaneers: 29,
        titans: 30,
        redskins: 31
    };
    return lookUp[userResponse];
}

//this function calculates team wins for next season
function getTeamWins(teamStats, normalizeResponse) {
    let pointsScored = teamStats[normalizeResponse]["Score"];
    let pointsScoredAgainst = teamStats[normalizeResponse]["OpponentScore"];
    // console.log(pointsScored);
    // console.log(pointsScoredAgainst);
    let homeTeamScores = Math.pow(pointsScored, 1 / 2.37);
    // console.log(homeTeamScores);
    let awayTeamScores = Math.pow(pointsScoredAgainst, 1 / 2.37)
    // console.log(awayTeamScores);
    let teamWinPercentage = (homeTeamScores / (homeTeamScores + awayTeamScores));
    // console.log(teamWinPercentage);
    let projWins = Math.ceil(teamWinPercentage * 16);
    console.log('This is projected team wins: ' + projWins);
    return projWins;
}



// append a table that will appear on the HTML page
// $('#tr').append('<td>' + projected + '</div>')

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
