//using fetch instead of $.ajax()
// trying promise.all

let teamStats = [];
let teamInfo = [];
let url = `https://api.fantasydata.net/v3/nfl/scores/JSON/TeamSeasonStats/2016`;
let url2 =`https://api.fantasydata.net/v3/nfl/scores/JSON/Teams`
let mykey1 = config.key1;
let mykey2 = config.key2;

let settings = {
    "async": true,
    "crossDomain": true,
    "method": "GET",
    "headers": {
        "ocp-apim-subscription-key": mykey1,
        "cache-control": "no-cache",
        "postman-token": mykey2
    }
}

let searchForm = document.getElementById("search");
let formTag = document.getElementsByTagName('form')[0];
let tableBody = document.getElementById("table");

formTag.addEventListener('submit', function(event) {
    event.preventDefault();
    let userResponse = search.value.toLowerCase(); //gets team name, conver toLowerCase
    let normalizeResponse = modifyUserResponse(userResponse); //use lookUp object to convert to integer
    let workHorse = getPromises(url, url2, settings, normalizeResponse);
    let clear = clearSearchField();     //resets search field
    tableBody.innerHTML = ''; //clears table
}) // end of addEventListener function

function getPromises(url, url2, settings, normalizeResponse) {
let promise1 = fetch(url, settings);
let promise2 = fetch(url2, settings);
let promiseKeeper = [];
promiseKeeper.push(promise1);
promiseKeeper.push(promise2);
  Promise.all(promiseKeeper)
  .then(function(valuesArray){
    valuesArray[0].json().then(function(jsonResponse){
      let teamStats = jsonResponse;
      let projectedWins = getTeamWins(teamStats, normalizeResponse);
      let teamName = getTeamName(teamStats, normalizeResponse);
      let displayResults = updateTable(projectedWins, teamName);
    })

    valuesArray[1].json().then(function(jsonResponse){
      console.log(jsonResponse);
      let teamInfo = jsonResponse;
      let logo = getLogo(teamInfo, normalizeResponse);
      console.log(logo);
    })

  })
  .catch(function(err){
    console.log(err);
  })

}


// convert user response with lookUp object to an integer
function modifyUserResponse(userResponse) {
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
    let homeTeamScores = Math.pow(pointsScored, 1 / 2.37);
    let awayTeamScores = Math.pow(pointsScoredAgainst, 1 / 2.37)
    let teamWinPercentage = (homeTeamScores / (homeTeamScores + awayTeamScores));
    let projWins = Math.ceil(teamWinPercentage * 16);
    return projWins;
}

//determine season outcome
function seasonOutcome(projectedWins) {
    let x = projectedWins;
    let outcome1 = "On the Clock";
    let outcome2 = "Factory of Sadness";
    let outcome3 = "Wildcard Round of Playoffs";
    let outcome4 = "Division Round of Playoffs";
    let outcome5 = "Superbowl!";
    if (x <= 4) {
        return outcome1;
    } else if (x >= 5 && x <= 7) {
        return outcome2;
    } else if (x >= 8 && x <= 9) {
        return outcome3;
    } else if (x >= 10 && x <= 12) {
        return outcome4;
    } else if (x >= 13) {
        return outcome5;
    }
}

//determine whether to buy tickets
function buyTickets(projectedWins) {
    let y = projectedWins;
    let buyChoice1 = "No";
    let buyChoice2 = "Yes";
    if (y < 8) {
        return buyChoice1;
    } else return buyChoice2;
}

//getting team name from the data
function getTeamName(teamStats, normalizeResponse) {
    let name = teamStats[normalizeResponse]["TeamName"];
    // console.log(name);
    return name;
}

// get url to team logo
function getLogo(teamInfo, normalizeResponse) {
  let teamLogo = teamInfo[normalizeResponse]["WikipediaLogoUrl"];
  console.log(teamLogo);
  return teamLogo;
}

//display team logo
function showLogo(teamLogo) {
  let img = document.createElement('img');
  img.src = teamLogo;
  let src = document.getElementsByClassName("card-image");
  src.appendChild(img);
}

//displays projected results to user using a table
function updateTable(projectedWins, teamName) {
    let selectRow = document.createElement('tr');
    let selectRow2 = document.createElement('tr');
    let selectRow3 = document.createElement('tr');
    let selectRow4 = document.createElement('tr');
    let showLogo = document.createElement('td');
    let showName = document.createElement('td');
    let selectCell = document.createElement('td');
    let showOutcome = document.createElement('td');
    let showBuyChoice = document.createElement('td');
    let purchase = buyTickets(projectedWins);
    let playoffs = seasonOutcome(projectedWins);
    showName.innerText = teamName;
    selectCell.innerText = "The projected team wins for next season is: " + projectedWins; //refers to name in eventListener
    showOutcome.innerText = "The projected season outcome is: " + playoffs;
    showBuyChoice.innerText = "Should you buy tickets:  " + purchase;
    selectRow.appendChild(showName);
    selectRow2.appendChild(selectCell);
    selectRow3.appendChild(showOutcome);
    selectRow4.appendChild(showBuyChoice);
    tableBody.appendChild(selectRow);
    tableBody.appendChild(selectRow2);
    tableBody.appendChild(selectRow3);
    tableBody.appendChild(selectRow4);
}

// reset search field
function clearSearchField() {
    document.getElementById("inputForm").reset();
}

// document.body.style.backgroundImage = "url('images/logo1.jpeg')"
// document.body.style.backgroundColor = "lightblue";
