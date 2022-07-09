const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        version: "1.0.0",
        title: "Mohamed Naish Develab API",
        description: "API for the assessment using NodeJS."
    },
    basePath: "/",
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "User",
            "description": "User endpoints"
        },
     
    ],
    definitions: {
        RegisterModel: {
        $name: "Administrator",
        $email: "naaixh@gmail.com",
        $password: "Password123#",
        $address1: "Test Address 123",
        $address2: "Test Address 123 more info",
        $city: "Male",
        $state: "Male",
        $country: "Maldives"
        },
        UpdateUserModel: {
            $id: "sd",
            $name: "Yong Jin Lim",
        },
       
    }


};

const outputFile = "./swagger_output.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require("./index");
});