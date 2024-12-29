document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("data-container");
  const playerContainer = document.getElementById("player-container");
  const videoPlayer = document.getElementById("video-player");
  const matchTitle = document.getElementById("match-title");

  // Function to fetch and display match details
  const fetchAndDisplayMatches = () => {
    fetch("https://darshan.freewebhostmost.com/TAPMAD/tapmad_fixtures.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch JSON data");
        }
        return response.json();
      })
      .then(data => {
        container.innerHTML = ""; // Clear existing data
        data.forEach(item => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h2>${item.matchName || "No Match Name"}</h2>
            <p>Date: ${item.date || "No Date"}</p>
            <p>Teams: ${item.team1 || "Team 1"} vs ${item.team2 || "Team 2"}</p>
          `;
          card.addEventListener("click", () => {
            playMatch(item.matchName, item.link);
          });
          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Error fetching JSON data:", error);
        container.innerHTML = `<p>Error loading data. Please try again later.</p>`;
      });
  };

  // Function to play a match
  const playMatch = (title, link) => {
    matchTitle.textContent = title;
    videoPlayer.src = link;
    playerContainer.style.display = "block";
    videoPlayer.play();
  };

  // Fetch and display matches on page load
  fetchAndDisplayMatches();
});
