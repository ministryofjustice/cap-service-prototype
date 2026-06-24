const govukPrototypeKit = require("govuk-prototype-kit");
// Use the Kit's setupRouter method to create a modular router instance
const router = govukPrototypeKit.requests.setupRouter();

// Route for 'children-safety-check' branching
router.post("/children-safety-check", function (request, response) {
  const childrensafetycheck = request.session.data["childrensafetycheck"];

  if (childrensafetycheck === "yes") {
    // Redirect needs full path
    response.redirect("/public-beta-1/children-not-safe");
  } else if (childrensafetycheck === "no") {
    response.redirect("/public-beta-1/safety-check");
  } else if (childrensafetycheck === "not-sure") {
    response.redirect("/public-beta-1/children-not-safe");
  }
});

// Route for 'safety-check' branching
router.post("/safety-check", function (request, response) {
  const safety = request.session.data["safety"];

  if (safety === "yes") {
    // Redirect needs full path
    response.redirect("/public-beta-1/not-safe");
  } else if (safety === "no") {
    response.redirect("/public-beta-1/do-whats-best");
  } else if (safety === "not-sure") {
    response.redirect("/public-beta-1/not-safe");
  }
});

// Route for 'court-order-check' branching
router.post("/court-order-check", function (request, response) {
  const safety = request.session.data["courtorder"];

  if (courtorder === "yes") {
    // Redirect needs full path
    response.redirect("/public-beta-1/existing-court-order");
  } else if (courtorder === "no") {
    response.redirect("/public-beta-1/number-of-children");
  }
});

// Export the router module
module.exports = router;
