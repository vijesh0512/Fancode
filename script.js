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
        const matches = data.matches; // Extract matches array
        container.innerHTML = ""; // Clear existing data
        matches.forEach(item => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${item.Image}" alt="${item.MatchName}">
            <h2>${item.MatchName}</h2>
            <p>Status: ${item.status}</p>
          `;

          // Add click event for live matches
          if (item.status === "LIVE" && item.video_url) {
            card.addEventListener("click", () => {
              playMatch(item.MatchName, item.video_url);
            });
          } else {
            card.style.cursor = "default";
            card.title = "This match is not live yet.";
          }

          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error("Error fetching JSON data:", error);
        container.innerHTML = `<p>Error loading matches. Please try again later.</p>`;
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
