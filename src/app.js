const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");


require("./db/conn");
require("./db/conn1");


const Register = require("./models/login1");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);


// Define a custom route for the root path ("/")
app.get("/", (req, res) => {
    res.render('welcome');
});

app.get("/login", (req, res) => {
    res.render('login');
});
app.get("/login1", (req, res) => {
    res.render('login1');
});

app.post("/register", async (req, res) => {
    try {
        // Check if a user with the same email already exists
        const existingUser = await Register.findOne({ email: req.body.email });

        if (existingUser) {
            // User with the same email already exists
            return res.status(409).send("Email is already registered.");
        }

        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });

        const registered = await registerEmployee.save();

        if (registered) {
            // Redirect to the "welcome" page after successful registration
            return res.render("welcome");
        } else {
            // Handle the case where registration failed
            return res.status(500).send("Registration failed");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).send("Registration failed: " + error.message);
    }
});
app.post("/login1", async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await Register.findOne({ email: email });
        
        if (user && user.password === password) {
            // Render the "taketest" page and pass the user's full name
            return res.status(201).render("taketest", { fullName: user.firstname + " " + user.lastname });
        } else {
            res.send("Invalid login");
        }
    } catch (error) {
        res.status(400).send("Invalid login details");
    }
});

app.get('/taketest', (req, res) => {
    res.render('taketest');
});
app.get("/generalized_iq_test", (req, res) => {
    res.render('generalized_iq_test'); // Render the corresponding HBS view
  });
  
  app.get("/ml_test", (req, res) => {
    res.render('ml_test');
  });
  
  app.get("/cs_test", (req, res) => {
    res.render('cs_test');
  });
  
  app.get("/med_test", (req, res) => {
    res.render('med_test');
  });

  app.get("/logout", (req, res) => {
    // Handle the sign-out logic here (e.g., clearing the session or user data)
    // Then, redirect to the home page
    res.redirect("/");
});

  // Call this function when the user finishes the quiz
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
