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

/*******************************************************************************************
/************************** 🟢  START: LIVING AND VISITING SECTION *************************
/*******************************************************************************************/

// ▶️  START: where-will-the-children-mostly-live
//GET Route: Displays the page layout: Mask my file path and use the clean URL where-will-the-children-mostly-live
router.get(
  "/public-beta-1/living-and-visiting/where-will-the-children-mostly-live",
  function (req, res) {
    res.render("public-beta-1/where-will-the-children-mostly-live");
  },
);
// POST Route: Intercepts the form submission and redirects the user
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
// ◀️ END : where-will-the-children-mostly-live

// ▶️  START: will-overnights-happen
//GET Route: Displays the page layout: Mask my file path and use the clean URL will-overnights-happen
router.get(
  "/public-beta-1/living-and-visiting/will-overnights-happen",
  function (req, res) {
    res.render("public-beta-1/will-overnights-happen");
  },
);
// POST Route: Intercepts the form submission and redirects the user
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
// ◀️ END : will-overnights-happen

// ▶️  START: which-schedule-is-best
// GET Route: Displays which schedule is best page
router.get(
  "/public-beta-1/living-and-visiting/which-schedule-is-best",
  function (req, res) {
    res.render("public-beta-1/which-schedule-is-best");
  },
);
// POST Route: Intercepts the form submission and redirects the user
router.post(
  "/public-beta-1/living-and-visiting/which-schedule-is-best",
  function (request, response) {
    response.redirect("/public-beta-1/make-a-plan");
  },
);
// ◀️ END : which-schedule-is-best

// ▶️  START: which-days-daytime-visits
// GET Route: Displays which days are best for daytime visits
router.get(
  "/public-beta-1/living-and-visiting/which-days-daytime-visits",
  function (req, res) {
    res.render("public-beta-1/which-days-daytime-visits");
  },
);
// ◀️ END : which-days-daytime-visits

// ▶️  START: which-days-overnight
// GET Route: Displays the next which days overnights question page
router.get(
  "/public-beta-1/living-and-visiting/which-days-overnight",
  function (req, res) {
    res.render("public-beta-1/which-days-overnight");
  },
);
// POST Route: Safely handles checkbox validation and redirection
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
// ◀️ END : which-days-overnight

// ▶️  START: will-daytime-visits-happen
// GET Route: Displays the next which days overnights question page
router.get(
  "/public-beta-1/living-and-visiting/will-daytime-visits-happen",
  function (req, res) {
    res.render("public-beta-1/will-daytime-visits-happen");
  },
);
// POST Route: Intercepts the form submission and redirects the user
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
// ◀️ END : will-daytime-visits-happen

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
/*******************************************************************************************
/************************** 🔴   END: LIVING AND VISITING SECTION *************************
/*******************************************************************************************/

/*******************************************************************************************
/********************* 🟢  START: HANDOVER AND HOLIDAYS SECTION    **************************
/*******************************************************************************************/

// ▶️  START: get-between-households
// GET Route: Displays the page layout: Mask my file path and use the clean URL get-between-households
// Mask my file path and use the clean URL for get-between-households
router.get(
  "/public-beta-1/handover-and-holidays/get-between-households",
  function (req, res) {
    res.render("public-beta-1/get-between-households");
  },
);
// POST Route: Intercepts the form get-between-householdssubmission and redirects the user
router.post(
  "/public-beta-1/handover-and-holidays/get-between-households",
  function (req, res) {
    const getbetweenhouseholds = req.session.data["getbetweenhouseholds"];
    if (getbetweenhouseholds === "name1") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    } else if (getbetweenhouseholds === "name2") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    } else if (getbetweenhouseholds === "split") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    } else if (getbetweenhouseholds === "another") {
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    } else {
      // If nothing is selected, reload the current page
      res.redirect("/public-beta-1/handover-and-holidays/where-handover");
    }
  },
);
// ◀️ END :  get-between-households

// ▶️  START: where-handover
// GET Route: Displays the page layout: Mask my file path and use the clean URL where-handover
router.get(
  "/public-beta-1/handover-and-holidays/where-handover",
  function (req, res) {
    res.render("public-beta-1/where-handover");
  },
);
//POST Route: Intercepts the form where-handover submission and redirects the user
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
// ◀️ END : where-handover

// ▶️  START: how-change-during-school-holidays
// GET Route: Displays the page layout: Mask my file path and use the clean URL how-change-during-school-holidays
// Mask my file path and use the clean URL for how-change-during-school-holidays
router.get(
  "/public-beta-1/handover-and-holidays/how-change-during-school-holidays",
  function (req, res) {
    // Added the missing folder path 'handover-and-holidays/'
    res.render("public-beta-1/how-change-during-school-holidays");
  },
);
// ◀️ END: how-change-during-school-holidays

// ▶️  START: will-change-during-school-holidays
// GET Route: Displays the page layout: Mask my file path and use the clean URL will-change-during-school-holidays
// Mask my file path and use the clean URL for will-change-during-school-holidays
router.get(
  "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
  function (req, res) {
    res.render("public-beta-1/will-change-during-school-holidays");
  },
);
// Route: Intercepts the form will-change-during-school-holidays submission and redirects the user
router.post(
  "/handover-and-holidays/will-change-during-school-holidays",
  function (request, response) {
    // 1. Explicitly mark Task 3 as complete in the session data when submitted via Continue
    request.session.data["school-holidays-status"] = "complete";

    // 2. Extract the checked value to execute your branching rules
    const willchangedschoolholidays =
      request.session.data["willchangedschoolholidays"];

    if (willchangedschoolholidays === "yes") {
      // Redirect to the intermediate holidays planning details page
      response.redirect(
        "/public-beta-1/handover-and-holidays/how-change-during-school-holidays",
      );
    } else if (willchangedschoolholidays === "no") {
      // If 'no', cleanly bypass the details page and move to the final items step
      response.redirect(
        "/public-beta-1/handover-and-holidays/items-for-changeover",
      );
    } else {
      // Fallback if they click continue without selecting an option
      // Clear the completion flag since they haven't provided a valid answer yet
      delete request.session.data["school-holidays-status"];
      response.redirect(
        "/public-beta-1/handover-and-holidays/will-change-during-school-holidays",
      );
    }
  },
);

// ◀️ END: will-change-during-school-holidays

// ▶️  START: items-for-changeover
// GET Route: Displays the page layout: Mask my file path and use the clean URL items-for-changeover
// Mask my file path and use the clean URL for items-for-changeover
router.get(
  "/public-beta-1/handover-and-holidays/items-for-changeover",
  function (req, res) {
    // Added the missing folder path 'handover-and-holidays/'
    res.render("public-beta-1/items-for-changeover");
  },
);
// POST Route: Process items for items-for-changeover form submission
router.post(
  "/public-beta-1/handover-and-holidays/items-for-changeover",
  function (request, response) {
    // 1. Set the exact status tracker flag to complete so the tag updates
    request.session.data["items-between-households-status"] = "complete";

    // 2. Extract the text value typed by the user inside the textarea
    const itemschangeoverValue = request.session.data["itemschangeover"];

    // 3. Fallback: If they submitted a blank textarea, keep it incomplete if desired
    if (!itemschangeoverValue || itemschangeoverValue.trim() === "") {
      // Optional: uncomment below if you want empty answers to stay blue
      // delete request.session.data['items-between-households-status'];
    }

    // 4. Redirect the user directly back to the overview dashboard
    response.redirect("/public-beta-1/handover-and-holidays/travel-abroad");
  },
);
// ◀️ END: items-for-changeover

// ▶️  START: travel-abroad
// GET Route: Displays the page layout: Mask my file path and use the clean URL travel-abroad
// Mask my file path and use the clean URL for travel-abroad
router.get(
  "/public-beta-1/handover-and-holidays/travel-abroad",
  function (req, res) {
    // Added the missing folder path 'handover-and-holidays/'
    res.render("public-beta-1/travel-abroad");
  },
);
// POST Route:  Process items for travel-abroad form submission
router.post(
  "/handover-and-holidays/travel-abroad",
  function (request, response) {
    // Explicitly trigger status update to complete matching layout evaluation rules
    request.session.data["travel-abroad-status"] = "complete";

    // Return the user cleanly back to the task list view page
    response.redirect("/public-beta-1/make-a-plan");
  },
);
// ◀️ END : travel-abroad

/*******************************************************************************************
/********************* 🔴  END: HANDOVER AND HOLIDAYS SECTION    **************************
/*******************************************************************************************/

/*******************************************************************************************
/*************************** 🟢  START: EDUCATION SECTION    ********************************
/*******************************************************************************************/
// ▶️  START: school-information
// GET Route: Displays the page layout: Mask my file path and use the clean URL school-information
router.get("/public-beta-1/education/school-information", function (req, res) {
  res.render("public-beta-1/school-information");
});
// Education Section - Task 1 Form Handler
router.post("/education/school-information", function (request, response) {
  request.session.data["education-info-status"] = "complete";
  response.redirect("/public-beta-1/education/parents-involved");
});
// Education Section - Task 2 Form Handler
router.post("/education/parents-involved", function (request, response) {
  request.session.data["education-involved-status"] = "complete";
  response.redirect("/public-beta-1/make-a-plan");
});
// ◀️ END: school-information

// ▶️  START: parents-involved
// GET Route: Displays parents-involved question page
router.get("/public-beta-1/education/parents-involved", function (req, res) {
  // Added the missing folder path 'parents-involved'
  res.render("public-beta-1/parents-involved");
});
// ◀️ END: parents-involved
/*******************************************************************************************
/**************************** 🔴  END: EDUCATION SECTION    ********************************
/*******************************************************************************************/

/*******************************************************************************************
/***************************** 🟢  START: HEALTH SECTION    *********************************
/*******************************************************************************************/

// ▶️  START: health-decisions
// GET Route: Displays the page layout: Mask my file path and use the clean URL health-decisions
router.get("/public-beta-1/health/health-decisions", function (req, res) {
  // Added the missing folder path 'parents-involved'
  res.render("public-beta-1/health-decisions");
});
// Health Section - Task 1 Form Handler
router.post("/health/health-decisions", function (request, response) {
  request.session.data["health-decisions-status"] = "complete";
  response.redirect("/public-beta-1/health/health-needs");
});
// ◀️ END: health-decisions

// ▶️  START: health-needs
// GET Route: Displays the page layout: Mask my file path and use the clean URL health-needs
router.get("/public-beta-1/health/health-needs", function (req, res) {
  // Added the missing folder path 'parents-involved'
  res.render("public-beta-1/health-needs");
});
// Health Section - Task 2 Form Handler
router.post("/health/health-needs", function (request, response) {
  request.session.data["health-needs-status"] = "complete";
  response.redirect("/public-beta-1/make-a-plan");
});
// ◀️ END: health-needs

/*******************************************************************************************
/****************************** 🔴  END: HEALTH SECTION    **********************************
/*******************************************************************************************/

/*******************************************************************************************
/************************** 🟢  START: SPECIAL DAYS SECTION    ******************************
/*******************************************************************************************/
// ▶️  START: what-will-happen
// GET Route: Displays the page layout: Mask my file path and use the clean URL what-will-happen
router.get("/public-beta-1/special-days/what-will-happen", function (req, res) {
  res.render("public-beta-1/what-will-happen");
});
// Process special days what-will-happen form submission
router.post("/special-days/what-will-happen", function (request, response) {
  // 1. Explicitly mark the Special Days section as complete in the session data
  request.session.data["special-days-status"] = "complete";

  // 2. Redirect the user directly back to the overview dashboard
  response.redirect("/public-beta-1/make-a-plan");
});
// ◀️ END: what-will-happen
/*******************************************************************************************
/************************** 🔴  END: SPECIAL DAYS SECTION    *******************************
/*******************************************************************************************/

/*******************************************************************************************
/************************** 🟢  START: OTHER THINGS SECTION    ******************************
/*******************************************************************************************/
// ▶️  START: what-other-things-matter
// GET Route: Displays the page layout: Mask my file path and use the clean URL what-other-things-matter
router.get(
  "/public-beta-1/other-things/what-other-things-matter",
  function (req, res) {
    res.render("public-beta-1/what-other-things-matter");
  },
);
// Process what-other-things-matter form submission
router.post(
  "/other-things/what-other-things-matter",
  function (request, response) {
    // 1. Explicitly mark the Other Things section as complete in the session data
    request.session.data["other-things-status"] = "complete";
    // 2. Redirect the user directly back to the overview dashboard page
    response.redirect("/public-beta-1/make-a-plan");
  },
);
// ◀️ END: what-other-things-matter
/*******************************************************************************************
/*************************** 🔴 END: OTHER THINGS SECTION    *******************************
/*******************************************************************************************/

/*******************************************************************************************
/************************ 🟢  START: DECISION MAKING SECTION    ****************************
/*******************************************************************************************/
// ▶️  START: rules-behaviour
// GET Route: Displays the page layout: Mask my file path and use the clean URL rules-behaviour
router.get(
  "/public-beta-1/decision-making/rules-behaviour",
  function (req, res) {
    res.render("public-beta-1/rules-behaviour");
  },
);
// Decision Making - Task 1 Form Handler (Rules and behaviour)
router.post("/decision-making/rules-behaviour", function (request, response) {
  // Set the specific status flag for the first question
  request.session.data["rules-behaviour-status"] = "complete";
  // Redirect to the second question in the sequence
  response.redirect("/public-beta-1/decision-making/plan-last-minute-changes");
});
// ◀️ END:rules-behaviour

// ▶️  START: plan-last-minute-changes
// GET Route: Displays the page layout: Mask my file path and use the clean URL plan-last-minute-changes
router.get(
  "/public-beta-1/decision-making/plan-last-minute-changes",
  function (req, res) {
    res.render("public-beta-1/plan-last-minute-changes");
  },
);
// Decision Making - Task 2 Form Handler (Last-minute changes)
router.post(
  "/decision-making/plan-last-minute-changes",
  function (request, response) {
    // Set the specific status flag for the task list completion
    request.session.data["decision-last-minute-status"] = "complete";
    // Redirect to the next step in the sequence
    response.redirect("/public-beta-1/decision-making/plan-long-term-notice");
  },
);
// ◀️ END: plan-last-minute-changes

// ▶️  START: plan-long-term-notice
// GET Route: Displays the page layout: Mask my file path and use the clean URL plan-long-term-notice
router.get(
  "/public-beta-1/decision-making/plan-long-term-notice",
  function (req, res) {
    res.render("public-beta-1/plan-long-term-notice");
  },
);
// Decision Making - Task 3 Form Handler (Long-term notice)
router.post(
  "/decision-making/plan-long-term-notice",
  function (request, response) {
    request.session.data["decision-long-term-status"] = "complete";
    response.redirect("/public-beta-1/decision-making/plan-review");
  },
);
// ◀️ END: plan-long-term-notice

// ▶️  START: plan-review
// GET Route: Displays the page layout: Mask my file path and use the clean URL plan-review
router.get("/public-beta-1/decision-making/plan-review", function (req, res) {
  res.render("public-beta-1/plan-review");
});
// Decision Making - Task 4 Form Handler (Review the plan)
router.post("/decision-making/plan-review", function (request, response) {
  request.session.data["decision-review-status"] = "complete";
  response.redirect("/public-beta-1/make-a-plan");
});

// ◀️ END: plan-review

/*******************************************************************************************
/************************** 🔴 END: DECISION MAKING SECTION    *****************************
/*******************************************************************************************/

// Export the router module
module.exports = router;
