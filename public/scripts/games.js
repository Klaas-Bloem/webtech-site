/* 
Script to 
- Implement listeners for the next games and scores buttons
- Load 10 more games when the next button has been clicked
*/


// local:  ""
// server: "/group15"
const ROOT_DIR = "";


// apply load more function depending on which button/file is active (games.pug or scores.pug)
document.addEventListener('DOMContentLoaded', () => {
  const nextGamesButton = document.getElementById("main__games-button");
  if (nextGamesButton) loadMoreGames("upcoming", "main__games-button", "main__games-table");

  const nextScoresButton = document.getElementById("main__scores-button");
  if (nextScoresButton) loadMoreGames("scores", "main__scores-button", "main__scores-table");
});


// function to load the next 10 games using fetch and create the rows in the table
function loadMoreGames(type, buttonId, tableId) {
  const nextButton = document.getElementById(buttonId);
  let offset = 10;

  // using fetch to retrieve next 10 games
  nextButton.addEventListener('click', () => {
    fetch(`${ROOT_DIR}/api/gameScores?&type=${type}&offset=${offset}&limit=10`)
      .then(res => res.json())
      .then(({ games, hasMore }) => {
        const table = document.getElementById(tableId);

        games.forEach(game => {
          table.appendChild(createNewRow(game));
        });

        offset += 10; // increase after every 10 newly created rows
        if (!hasMore) nextButton.style.display = 'none'; // hide next when there are no games left
      })
      .catch(error => console.log(error));
  });
};


// function to create new rows for the games or scores table
function createNewRow(game) {
  const tr = document.createElement('tr');
  tr.className = 'games-table__loaded-row';

  // highlight if it is the users favorite team
  if (userTeam && (game.team1 === userTeam || game.team2 === userTeam)) {
    tr.id = 'favorite-team';
  }

  // create all elements
  const colTitle = document.createElement('td');
  const colDate = document.createElement('td');
  const colTeam1 = document.createElement('td');
  const colScore = document.createElement('td');
  const colTeam2 = document.createElement('td');

  const team1Link = document.createElement('a');
  const team2Link = document.createElement('a');

  // make team names clickable
  team1Link.href = `${ROOT_DIR}/team/${game.team1}`;
  team1Link.textContent = game.team1;
  team2Link.href = `${ROOT_DIR}/team/${game.team2}`;
  team2Link.textContent = game.team2;

  colTitle.textContent = game.tournamentTitle;
  colDate.textContent = game.gameDate;

  // if the user is an admin it should be able to adjust the scores
  if (isAdmin) {
    colScore.innerHTML = `
      <label>${game.team1Score ?? ''} - ${game.team2Score ?? ''}</label> 
      <input type="number" min="0" 
             name="score[id${game.id}][team1Score]" 
             value="${game.team1Score}">
      <span>-</span>
      <input type="number" min="0" 
             name="score[id${game.id}][team2Score]" 
             value="${game.team2Score}">
    `;
  } else { // else just scores or empty strings when there are no scores
    colScore.textContent = `${game.team1Score ?? ''} - ${game.team2Score ?? ''}`;
  }

  // append all elements to eachother
  colTeam1.append(team1Link);
  colTeam2.append(team2Link);

  tr.appendChild(colTitle);
  tr.appendChild(colDate);
  tr.appendChild(colTeam1);
  tr.appendChild(colScore);
  tr.appendChild(colTeam2);

  return tr
}