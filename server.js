//All Imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
// const fsevents = require('fsevents');



// const stop = fsevents.watch(__dirname, (path, flags, id) => {
//   const info = fsevents.getInfo(path, flags, id);
// }); // To start observation
// stop(); // To end observation

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

//Connection to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(
    URL,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connection successful with mongoDB.");
    }
);


//Define Path 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

//Listen Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is runnig on ${port}`);
});