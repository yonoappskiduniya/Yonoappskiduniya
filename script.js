// ======================================
// YonoAppsKiDuniya Script.js - PART 1
// ======================================

// Elements
const searchInput = document.getElementById("searchInput");
const gamesContainer = document.getElementById("gamesContainer");
const visitorBox = document.getElementById("visitors");
const winnerPopup = document.getElementById("winner-popup");

// Banner Slider
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    if (slides.length) slides[index].classList.add("active");
}

function nextSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

if (slides.length) {
    showSlide(0);
    setInterval(nextSlide, 3000);
}

// Live Visitors
if (visitorBox) {
    let visitors = 1250;
    visitorBox.innerText = visitors;

    setInterval(() => {
        visitors += Math.floor(Math.random() * 5) + 1;
        visitorBox.innerText = visitors;
    }, 5000);
}

// ===============================
// Firebase Games
// ===============================

async function loadGames() {

    if (!gamesContainer) return;

    // Sirf Firebase wale cards remove honge
    document.querySelectorAll(".firebase-game").forEach(card => card.remove());

    const snapshot = await window.getDocs(
        window.collection(window.db, "games")
    );

    snapshot.forEach(doc => {

        const game = doc.data();

        const card = document.createElement("div");

        card.className = "game-card firebase-game";

        card.innerHTML = `
            <img src="${game.image}" alt="${game.name}" onerror="this.src='images/logo.png'">
            <h3>${game.name}</h3>
            <div class="rating">${game.rating || "⭐⭐⭐⭐⭐"}</div>
            <a href="${game.link}" target="_blank" class="install-btn">
                📲 INSTALL APP
            </a>
        `;

        gamesContainer.appendChild(card);

    });

}
// ======================================
// PART 2
// Search + Game Count + Init
// ======================================

function updateGameCount() {

    const gameCount = document.getElementById("gameCount");

    if (!gameCount) return;

    gameCount.innerText =
        document.querySelectorAll(".game-card").length +
        " Trusted Games Available";

}

function enableSearch() {

    if (!searchInput) return;

    searchInput.onkeyup = function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".game-card").forEach(card => {

            const title =
                card.querySelector("h3").innerText.toLowerCase();

            card.style.display =
                title.includes(value) ? "block" : "none";

        });

    };

}

// ===============================
// Initial Load (Sirf Ek Baar)
// ===============================

window.addEventListener("DOMContentLoaded", async () => {

    await loadGames();

    updateGameCount();

    enableSearch();

});
// ======================================
// PART 3
// Winner Popup + Button Effect + Image Fix
// ======================================

// Winner Popup
const winners = [
    "Rahul won ₹520",
    "Aman won ₹860",
    "Rohit won ₹1200",
    "Vikas won ₹750",
    "Sunny won ₹2000",
    "Riya won ₹980",
    "Ankit won ₹640",
    "Pooja won ₹1450"
];

function showWinner() {

    if (!winnerPopup) return;

    const randomWinner =
        winners[Math.floor(Math.random() * winners.length)];

    winnerPopup.innerHTML = "🎉 " + randomWinner;

    winnerPopup.style.display = "block";

    setTimeout(() => {
        winnerPopup.style.display = "none";
    }, 3000);

}

setInterval(showWinner, 8000);

// Install Button Animation
document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("install-btn")) return;

    const btn = e.target;
    const oldText = btn.innerHTML;

    btn.innerHTML = "⏳ Opening...";

    setTimeout(() => {
        btn.innerHTML = oldText;
    }, 1500);

});

// Image Error Fix
document.addEventListener("error", function (e) {

    if (e.target.tagName === "IMG") {
        e.target.src = "images/logo.png";
    }

}, true);

console.log("✅ YonoAppsKiDuniya Script Loaded");
