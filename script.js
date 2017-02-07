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
    console.log(userResponse);

    modifyResponse(userResponse);
    // return userResponse;


    //=========== asynchronous code ========================//
    //asynchronous ajax method using settings as parameter to get data from fantasydata.net
    let getResponse = $.ajax(settings) //jQuery call to pull data with varible settings
        .done(function(response) {

            //=== convert user response with lookup object ========//
            function modifyResponse(userResponse) {
                console.log("In modifyResponse function");
                console.log(userResponse);
                var lookUp = {
                    Cardinals: 0,
                    cardinals: 0,
                    Arizona: 0,
                    arizona: 0,
                    Falcons: 1,
                    falcons: 1,
                    Atlanta: 1,
                    atlanta: 1,
                    Ravens: 2,
                    Bills: 3,
                    Panthers: 4,
                    Bears: 5,
                    Bengals: 6,
                    Browns: 7,
                    Cowboys: 8,
                    Broncos: 9,
                    broncos: 9,
                    Denver: 9,
                    denver: 9,
                    Lions: 10,
                    Packers: 11,
                    Texans: 12,
                    Colts: 13,
                    Jaguars: 14,
                    Chiefs: 15,
                    chiefs: 15,
                    'Kansas City': 15,
                    'kansas city': 15,
                    Rams: 16,
                    rams: 16,
                    'St. Louis': 16,
                    'st. louis': 16,
                    Dolphins: 17,
                    Vikings: 18,
                    Patriots: 19,
                    Saints: 20,
                    Giants: 21,
                    Jets: 22,
                    Raiders: 23,
                    raiders: 23,
                    Oakland: 23,
                    oakland: 23,
                    Eagles: 24,
                    Steelers: 25,
                    Chargers: 26,
                    chargers: 26,
                    'San Diego': 26,
                    'san diego': 26,
                    Seahawks: 27,
                    seahawks: 27,
                    Seattle: 27,
                    seattle: 27,
                    '49ers': 28,
                    49: 28,
                    'San Francisco': 28,
                    'san francisco': 28,
                    Buccaneers: 29,
                    Titans: 30,
                    Redskins: 31
                };
                return lookUp[userResponse];
            }

            var modifiedUserResponse = modifyResponse(userResponse);

            function modifyResponse(userResponse) {
                // console.log(getResponse); //single object response NOT a promise object
                // console.log(getResponse.responseJSON); //an array of 32 objects
                teamStats = getResponse['responseJSON'];
                console.log(teamStats);
                let pointsScored = teamStats[modifiedUserResponse]["Score"];
                let pointsScoredAgainst = teamStats[modifiedUserResponse]["OpponentScore"];
                console.log(pointsScored);
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
                // teamWinCalculator(teamStats);
                // console.log(teamWinCalculator(teamStats));
            }
        }); // stop for .done function

    // stop for indent lines. that just annoys me.


}) // end of addEventListener function





// $('#tr').append('<td>' + projected + '</div>')


//asynchronous ajax method using settings as parameter to get data from fantasydata.net
// let getResponse = $.ajax(settings) //jQuery call to pull data with varible settings
//     .done(function(response) {
//         // console.log(getResponse); //single object response NOT a promise object
//         // console.log(getResponse.responseJSON); //an array of 32 objects
//         teamStats = getResponse['responseJSON'];
//         console.log(teamStats);
//         let pointsScored = teamStats[modifiedUserResponse]["Score"];
//         let pointsScoredAgainst = teamStats[modifiedUserResponse]["OpponentScore"];
//         // console.log(pointsScored);
//         // console.log(pointsScoredAgainst);
//         let homeTeamScores = Math.pow(pointsScored, 1 / 2.37);
//         // console.log(homeTeamScores);
//         let awayTeamScores = Math.pow(pointsScoredAgainst, 1 / 2.37)
//         // console.log(awayTeamScores);
//         let teamWinPercentage = (homeTeamScores / (homeTeamScores + awayTeamScores));
//         // console.log(teamWinPercentage);
//         let projWins = (teamWinPercentage * 16).toFixed(2);
//         console.log('This is projected team wins: ' + projWins);
//         return projWins;
//         // teamWinCalculator(teamStats);
//         // console.log(teamWinCalculator(teamStats));
//     });
// stop for indent lines. that just annoys me.

// convert userResponse, which is a string (team name),
// to an integer for use in teamStats array
//NOTE: this is NOT team ID, this is the team order in the array.
// function modifyResponse(userResponse) {
//     console.log("In modifyResponse function");
//     console.log(userResponse);
//     let modifiedUserResponse = 0;
//     if (userResponse === 'Cardinals') {
//         modifiedUserResponse = 0;
//     } else if (userResponse === 'Falcons') {
//         modifiedUserResponse = 1;
//     } else if (userResponse === 'Ravens') {
//         modifiedUserResponse = 2;
//     } else if (userResponse === 'Bills') {
//         modifiedUserResponse = 3;
//     } else if (userResponse === 'Panthers') {
//         modifiedUserResponse = 4;
//     } else if (userResponse === 'Bears') {
//         modifiedUserResponse = 5;
//     } else if (userResponse === 'Bengals') {
//         modifiedUserResponse = 6;
//     } else if (userResponse === 'Browns') {
//         modifiedUserResponse = 7;
//     } else if (userResponse === 'Cowboys') {
//         modifiedUserResponse = 8;
//     } else if (userResponse === 'Broncos') {
//         modifiedUserResponse = 9;
//     } else if (userResponse === 'Lions') {
//         modifiedUserResponse = 10;
//     } else if (userResponse === 'Packers') {
//         modifiedUserResponse = 11;
//     } else if (userResponse === 'Texans') {
//         modifiedUserResponse = 12;
//     } else if (userResponse === 'Colts') {
//         modifiedUserResponse = 13;
//     } else if (userResponse === 'Jaguars') {
//         modifiedUserResponse = 14;
//     } else if (userResponse === 'Chiefs') {
//         modifiedUserResponse = 15;
//     } else if (userResponse === 'Rams') {
//         modifiedUserResponse = 16;
//     } else if (userResponse === 'Dolphins') {
//         modifiedUserResponse = 17;
//     } else if (userResponse === 'Vikings') {
//         modifiedUserResponse = 18;
//     } else if (userResponse === 'Patriots') {
//         modifiedUserResponse = 19;
//     } else if (userResponse === 'Saints') {
//         modifiedUserResponse = 20;
//     } else if (userResponse === 'Giants') {
//         modifiedUserResponse = 21;
//     } else if (userResponse === 'Jets') {
//         modifiedUserResponse = 22
//     } else if (userResponse === 'Raiders') {
//         modifiedUserResponse = 23;
//     } else if (userResponse === 'Eagles') {
//         modifiedUserResponse = 24;
//     } else if (userResponse === 'Steelers') {
//         modifiedUserResponse = 25;
//     } else if (userResponse === 'Chargers') {
//         modifiedUserResponse = 26;
//     } else if (userResponse === 'Seahawks') {
//         modifiedUserResponse = 27;
//     } else if (userResponse === '49ers') {
//         modifiedUserResponse = 28;
//     } else if (userResponse === 'Buccaneers') {
//         modifiedUserResponse = 29;
//     } else if (userResponse === 'Titans') {
//         modifiedUserResponse = 30;
//     } else if (userResponse === 'Redskins') {
//         modifiedUserResponse = 31;
//     }
//     console.log(modifiedUserResponse);
//     return modifiedUserResponse;
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
