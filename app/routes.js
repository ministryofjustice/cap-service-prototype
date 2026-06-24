//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

// 1. Import your modular router files
// Ensure the paths below are correct relative to app/routes.js
const publicbeta1Routes = require("./routes/public-beta-1-routes");

// 2. Attach the modular routers to their base paths using router.use()
// This is the key step that makes the routes in round-2-routes.js accessible
// via the /round-2 URL prefix.

// Routes in public-beta-1-routes.js are prefixed with /public-beta-1
router.use("/public-beta-1", publicbeta1Routes);

// Example homepage route:
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
