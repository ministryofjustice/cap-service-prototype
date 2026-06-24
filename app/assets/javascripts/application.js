//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // --- 1. Variables ---
  const banner = document.querySelector("#cookie-banner");
  const question = document.querySelector("#cookie-question");
  const confirmation = document.querySelector("#cookie-confirmation");
  const actionText = document.querySelector("#cookie-action");

  // --- 2. Start Page Reset Logic ---
  // If we are on the homepage, forget the user has seen the banner before.
  // This allows the banner to always appear when starting a fresh test.
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index"
  ) {
    localStorage.removeItem("cookieBannerDismissed");
  }

  // --- 3. Initial Visibility Check ---
  // Check if already dismissed on a previous page during this session.
  if (localStorage.getItem("cookieBannerDismissed") === "true") {
    if (banner) banner.style.display = "none";
  }

  // --- 4. Accept / Reject Button Logic ---
  const cookieButtons = document.querySelectorAll(
    ".js-cookie-accept, .js-cookie-reject",
  );

  cookieButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update text in the confirmation message
      if (this.classList.contains("js-cookie-reject")) {
        if (actionText) actionText.innerText = "rejected";
      } else {
        if (actionText) actionText.innerText = "accepted";
      }

      // Hide the question block and show the confirmation block
      if (question) question.style.display = "none";
      if (confirmation) {
        confirmation.removeAttribute("hidden");
        confirmation.style.display = "block";
      }
    });
  });

  // --- 5. Hide Banner Entirely ---
  const hideButton = document.querySelector(".js-hide-banner");
  if (hideButton) {
    hideButton.addEventListener("click", function () {
      if (banner) banner.style.display = "none";
      // Remember this choice so it stays hidden on subsequent pages
      localStorage.setItem("cookieBannerDismissed", "true");
    });
  }

  // --- 6. "Change your cookie settings" Reset ---
  const settingsLink = document.querySelector(".js-cookie-settings");
  if (settingsLink) {
    settingsLink.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent page from jumping

      // Clear the saved preference
      localStorage.removeItem("cookieBannerDismissed");

      // Reset the visuals so the user can choose again
      if (question) question.style.display = "block";
      if (confirmation) {
        confirmation.style.display = "none";
        confirmation.setAttribute("hidden", "hidden");
      }
      if (banner) banner.style.display = "block";
    });
  }
});
