let teamStats = [];

let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.fantasydata.net/v3/nfl/scores/JSON/TeamSeasonStats/2016",
    "method": "GET",
    "headers": { // var mykey = config.["ocp-apim-subscription-key"],
        "ocp-apim-subscription-key": "764e9d4db7704785a669236d07701c24",
        "cache-control": "no-cache",
        "postman-token": "23c9385d-0beb-5b6c-09c8-67be488c4063"
    }
}

let searchForm = document.getElementById("search");
let formTag = document.getElementsByTagName('form')[0];
let tableBody = document.getElementById("table");

formTag.addEventListener('submit', function(event) {

    event.preventDefault();

    let userResponse = search.value.toLowerCase(); //gets team name, conver toLowerCase
    // console.log('img src="https://en.wikipedia.org/wiki/Oakland_Raiders#/media/File:Oakland_Raiders.svg"');
    console.log('<img src="https://en.wikipedia.org/wiki/Oakland_Raiders#/media/File:Oakland_Raiders.svg">');
    let normalizeResponse = modifyUserResponse(userResponse); //use lookUp object to convert to integer
    let clear = clearSearchField();
    // asynchronous ajax method using settings as parameter to get data from fantasydata.net
    let getResponse = $.ajax(settings) //jQuery call to pull data with varible settings
        .done(function(response) {
            // console.log(response);
            let teamStats = getResponse['responseJSON'];
            let projectedWins = getTeamWins(teamStats, normalizeResponse);
            // console.log(projectedWins);
            let teamName = getTeamName(teamStats, normalizeResponse);
            let displayResults = updateTable(projectedWins, teamName);

        });
    tableBody.innerHTML = ''; //clears table
}) // end of addEventListener function

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
    console.log('This is projected team wins: ' + projWins);
    return projWins;
}

//determine season outcome
function seasonOutcome(projectedWins) {
    let x = projectedWins;
    let outcome1 = "One the Clock";
    let outcome2 = "Mediocrity";
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
    return name;
}

//displays projected results to user using a table
function updateTable(projectedWins, teamName) {
    let selectRow = document.createElement('tr');
    let selectRow2 = document.createElement('tr');
    let selectRow3 = document.createElement('tr');
    let selectRow4 = document.createElement('tr');
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

function showImage() {
    let firstRow = document.getElementById("table").rows[0];
    let x = firstRow.insertCell(-1);
    x.innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/en/c/c5/Atlanta_Falcons_logo.svg' alt='logo'>";
}

// reset search field
function clearSearchField() {
    document.getElementById("inputForm").reset();
}

// document.body.style.backgroundImage = "url('images/logo1.jpeg')"
// document.body.style.backgroundColor = "lightblue";
