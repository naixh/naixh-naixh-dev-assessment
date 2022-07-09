const router = require("express").Router();


const userRoutes = require("./user-routes");


router.use("/api", userRoutes);



module.exports = router;