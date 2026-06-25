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
  const courtorder = request.session.data["courtorder"];

  if (courtorder === "yes") {
    // Redirect needs full path
    response.redirect("/public-beta-1/existing-court-order");
  } else if (courtorder === "no") {
    response.redirect("/public-beta-1/number-of-children");
  }
});

// Mask my file path and use the clean URL
// GET Route: Displays the page layout
router.get(
  "/public-beta-1/living-and-visiting/where-will-the-children-mostly-live",
  function (req, res) {
    res.render("public-beta-1/where-will-the-children-mostly-live");
  },
);

// NEW POST Route: Intercepts the form submission and redirects the user
router.post(
  "/public-beta-1/living-and-visiting/where-will-the-children-mostly-live",
  function (req, res) {
    const wherechildrenlive = req.session.data["wherechildrenlive"];

    if (wherechildrenlive === "name1") {
      res.redirect("/public-beta-1/living-and-visiting/will-overnights-happen");
    } else if (wherechildrenlive === "name2") {
      res.redirect("/public-beta-1/living-and-visiting/will-overnights-happen");
    } else if (wherechildrenlive === "split") {
      res.redirect("/public-beta-1/living-and-visiting/which-schedule-is-best"); // Update with actual next route
    } else if (wherechildrenlive === "another") {
      res.redirect("/public-beta-1/living-and-visiting/describe-schedule"); // Update with actual next route
    } else {
      // If nothing is selected, reload the current page
      res.redirect(
        "/public-beta-1/living-and-visiting/where-will-the-children-mostly-live",
      );
    }
  },
);

// GET Route: Displays the next overnights question page
router.get(
  "/public-beta-1/living-and-visiting/will-overnights-happen",
  function (req, res) {
    res.render("public-beta-1/will-overnights-happen");
  },
);

// GET Route: Displays the next which days overnights question page
router.get(
  "/public-beta-1/living-and-visiting/which-days-overnight",
  function (req, res) {
    res.render("public-beta-1/which-days-overnight");
  },
);

// NEW POST Route: Intercepts the form submission and redirects the user
router.post(
  "/public-beta-1/living-and-visiting/will-overnights-happen",
  function (req, res) {
    const overnight = req.session.data["overnight"];

    if (overnight === "yes") {
      // Redirect needs full path
      res.redirect("/public-beta-1/living-and-visiting/which-days-overnight");
    } else if (overnight === "no") {
      res.redirect(
        "/public-beta-1/living-and-visiting/will-daytime-visits-happen",
      );
    }
  },
);

// GET Route: Displays which schedule is best page
router.get(
  "/public-beta-1/living-and-visiting/which-schedule-is-best",
  function (req, res) {
    res.render("public-beta-1/which-schedule-is-best");
  },
);

// Export the router module
module.exports = router;
