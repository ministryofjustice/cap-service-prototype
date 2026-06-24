const govukPrototypeKit = require("govuk-prototype-kit");
// Use the Kit's setupRouter method to create a modular router instance
const router = govukPrototypeKit.requests.setupRouter();

// Route for 'safety-check' branching
router.post("/safety-check", function (request, response) {
  const safety = request.session.data["safety"];

  if (safety === "yes") {
    // Redirect needs full path
    response.redirect("/public-beta-1/children-safety-check");
  } else if (safety === "no") {
    response.redirect("/public-beta-1/not-safe");
  }
});

// Route for 'children-not-safe' branching
router.post("/children-not-safe", function (request, response) {
  const childrenSafetyCheck = request.session.data["childrenSafetyCheck"];

  if (childrenSafetyCheck === "yes") {
    // Redirect needs full path
    response.redirect("/public-beta-1/children-not-safe");
  } else if (childrenSafetyCheck === "no") {
    response.redirect("/public-beta-1/do-whats-best");
  } else if (childrenSafetyCheck === "not-sure") {
    response.redirect("/public-beta-1/children-not-safe");
  }
});

// Export the router module
module.exports = router;
