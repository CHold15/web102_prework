/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);

/*************************************************************************************
/*************************************************************************************
 * Challenge 4: Summary statistics
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// total contributions (sum of backers)
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// total raised (sum of pledged)
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// number of games
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Filter functions + event listeners
*/

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  addGamesToPage(unfundedGames);

  console.log("Unfunded games:", unfundedGames.length);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  addGamesToPage(fundedGames);

  console.log("Funded games:", fundedGames.length);
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more info at the top (ternary + template literal)
*/

const descriptionContainer = document.getElementById("description-container");

const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const numUnfunded = unfundedGames.length;

const description = `We have raised $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded.`;

const newParagraph = document.createElement("p");
newParagraph.innerHTML = description;
descriptionContainer.appendChild(newParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
const [topGame, runnerUp, ...others] = sortedGames;
const topGameName = document.createElement("p");
topGameName.textContent = topGame.name;
firstGameContainer.appendChild(topGameName);

const runnerUpName = document.createElement("p");
runnerUpName.textContent = runnerUp.name;
secondGameContainer.appendChild(runnerUpName);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item