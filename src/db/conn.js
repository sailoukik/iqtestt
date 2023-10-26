const  mongoose = require("mongoose");
//mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost:27017/youtubeRegistration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Use this option for createIndexes
}).then(() => {
    console.log("Connection successful");
}).catch((error) => {
    console.error("Connection failed:", error);
});
