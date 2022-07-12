const router = require("express").Router();
const { register ,getAll, getOne, updateOne } = require("../controllers/user-controller");
const {validationRules, validate }  = require("../validations/update-user-validator");

router.post("/register", async(req, res) => { 
    /*  #swagger.tags = ['User']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */  

await register(req, res);
});

router.get("/users",  async(req, res) => {
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
            "Authorization": []
        }]
    */
    await getAll(req, res);
});

router.get("/users/:id",  async(req, res) => {

    /*
        #swagger.tags = ['User']

    */
    await getOne(req, res);
});



router.put("/users", validationRules(), validate, async (req, res) => {   
    /*  #swagger.tags = ['User']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/UpdateUserModel" }
    } */   
    
    await updateOne(req, res);
});


router.get("/seed", async(req, res) => { 
        //#swagger.tags = ['User'] 
    const admin = {
        name: "Administrator",
        email: "admin@gmail.com",
        password: "Password123#",
        address1: "Test Address 123",
        address2: "Test Address 123 more info",
        city: "Male'",
        state: "Male'",
        country: "Maldives"
     
    };

    await register(admin, res);
});

module.exports = router;
