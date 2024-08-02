const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const contactSchema = new mongoose.Schema({
    Name: { type: String },
    Email: { type: String },
    Message: { type: String },
  });

mongoose.connect("mongodb+srv://dtdeveshtripathi:PASSWORD@contact.keug7iw.mongodb.net/Contact_Info");
const contact = mongoose.model("contact", contactSchema);


var error = "";
app.get("/", function (req, res) {
  res.render("index", { error });
});


app.post('/sub', async (req, res) => {
    try {
        const { Name, Email, Message } = req.body;

        const data = new contact({
            Name,
            Email,
            Message
        });

        await data.save();
        res.send('Thank you for your message!');
    } catch (error) {
        console.error('Error saving contact info:', error);
        res.status(500).send('There was an error saving your message.');
    }
});





app.listen(3000, function () {
    console.log("Server Started at port 3000.");
  });