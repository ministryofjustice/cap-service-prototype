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
      res.redirect("/public-beta-1/make-a-plan"); // Update with actual next route
    } else {
      // If nothing is selected, reload the current page
      res.redirect(
        "/public-beta-1/living-and-visiting/where-will-the-children-mostly-live",
      );
    }
  },
);

// GET Route: Displays the next will overnights happen question page
router.get(
  "/public-beta-1/handover-and-holidays/where-handover",
  function (req, res) {
    res.render("public-beta-1/where-handover");
  },
);

// Mask my file path and use the clean URL for get-between-households
// GET Route: Displays the page layout
router.get(
  "/public-beta-1/handover-and-holidays/get-between-households",
  function (req, res) {
    res.render("public-beta-1/get-between-households");
  },
);

// GET Route: Displays will-change-during-school-holidays question page
router.get(
  "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
  function (req, res) {
    res.render("public-beta-1/will-change-during-school-holidays");
  },
);

// GET Route: Displays how-change-during-school-holidays question page
router.get(
  "/public-beta-1/handover-and-holidays/how-change-during-school-holidays",
  function (req, res) {
    // Added the missing folder path 'handover-and-holidays/'
    res.render("public-beta-1/how-change-during-school-holidays");
  },
);

// GET Route: Displays items-for-changeover question page
router.get(
  "/public-beta-1/handover-and-holidays/items-for-changeover",
  function (req, res) {
    // Added the missing folder path 'handover-and-holidays/'
    res.render("public-beta-1/items-for-changeover");
  },
);

// Route for 'will-change-during-school-holidays' branching
router.post(
  "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
  function (request, response) {
    // CHANGE THIS: Ensure 'howchangedschoolholidays' matches the exact name attribute used on your radio button page
    const willchangedschoolholidays =
      request.session.data["willchangedschoolholidays"];

    if (willchangedschoolholidays === "yes") {
      response.redirect(
        "/public-beta-1/handover-and-holidays/how-change-during-school-holidays",
      );
    } else if (willchangedschoolholidays === "no") {
      // If 'no', they shouldn't explain *how* it changes. Redirect them to the next step instead:
      response.redirect(
        "/public-beta-1/handover-and-holidays/items-for-changeover",
      );
    } else {
      // Fallback if they click continue without selecting an option
      response.redirect(
        "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
      );
    }
  },
);

// NEW POST Route: Intercepts the form get-between-householdssubmission and redirects the user
router.post(
  "/public-beta-1/handover-and-holidays/get-between-households",
  function (req, res) {
    const getbetweenhouseholds = req.session.data["getbetweenhouseholds"];
    if (getbetweenhouseholds === "name1") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    } else if (getbetweenhouseholds === "name2") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    } else if (getbetweenhouseholds === "split") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover"); // Update with actual next route
    } else if (getbetweenhouseholds === "another") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover"); // Update with actual next route
    } else {
      // If nothing is selected, reload the current page
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    }
  },
);

// NEW POST Route: Intercepts the form where-handover submission and redirects the user
router.post(
  "/public-beta-1/handover-and-holidays/where-handover",
  function (req, res) {
    // Turn checkboxes into an array safely
    const wherehandover = [].concat(req.session.data["wherehandover"] || []);

    // 1. Check for 'neutral'
    if (wherehandover.includes("neutral")) {
      res.redirect(
        "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
      );
    }
    // 2. Check for 'initial-adult'
    else if (wherehandover.includes("initial-adult")) {
      res.redirect(
        "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
      ); // Change this path
    }
    // 3. Check for 'secondary-adult'
    else if (wherehandover.includes("secondary-adult")) {
      res.redirect(
        "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
      ); // Change this path
    }
    // 4. Check for 'school'
    else if (wherehandover.includes("school")) {
      res.redirect(
        "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
      ); // Change this path
    }
    // 5. Check for 'other'
    else if (wherehandover.includes("other")) {
      res.redirect(
        "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
      ); // Change this path
    }
    // 6. If nothing is selected, reload the current page
    else {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
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

// GET Route: Displays the next will overnights happen question page
router.get(
  "/public-beta-1/living-and-visiting/will-overnights-happen",
  function (req, res) {
    res.render("public-beta-1/will-overnights-happen");
  },
);

// GET Route: Displays the next which days overnights question page
router.get(
  "/public-beta-1/living-and-visiting/which-days-daytime-visits",
  function (req, res) {
    res.render("public-beta-1/which-days-daytime-visits");
  },
);

// GET Route: Displays the next will day time visits happen question page
router.get(
  "/public-beta-1/living-and-visiting/will-daytime-visits-happen",
  function (req, res) {
    res.render("public-beta-1/will-daytime-visits-happen");
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

// NEW POST Route: Safely handles checkbox validation and redirection
router.post(
  "/public-beta-1/living-and-visiting/which-days-overnight",
  function (req, res) {
    const daysovernight = req.session.data["daysovernight"];

    // If the user selected at least one checkbox, proceed to the next step
    if (daysovernight && daysovernight.length > 0) {
      res.redirect(
        "/public-beta-1/living-and-visiting/will-daytime-visits-happen",
      );
    } else {
      // If nothing is selected, reload the page (or handle error layout)
      res.redirect("/public-beta-1/living-and-visiting/which-days-overnight");
    }
  },
);

// NEW POST Route: Intercepts the form submission and redirects the user
router.post(
  "/public-beta-1/living-and-visiting/will-daytime-visits-happen",
  function (req, res) {
    const daytime = req.session.data["daytime"];

    if (daytime === "yes") {
      // Redirect needs full path
      res.redirect(
        "/public-beta-1/living-and-visiting/which-days-daytime-visits",
      );
    } else if (daytime === "no") {
      res.redirect("/public-beta-1/make-a-plan");
    }
  },
);

// NEW POST Route: Safely handles checkbox validation and redirection
router.post(
  "/public-beta-1/living-and-visiting/which-days-daytime-visits",
  function (req, res) {
    const daysdaytime = req.session.data["daysdaytime"];

    // If the user selected at least one checkbox, proceed to the next step
    if (daysdaytime && daysdaytime.length > 0) {
      res.redirect("/public-beta-1/make-a-plan");
    } else {
      // If nothing is selected, reload the page (or handle error layout)
      res.redirect(
        "/public-beta-1/living-and-visiting/which-days-daytime-visits",
      );
    }
  },
);

// Export the router module
module.exports = router;
