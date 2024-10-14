// Budget API

const express = require('express');
const cors = require('cors');
//const fs = require('fs');
const app = express();
const port = 3000;
const mongoose = require("mongoose")
const budgetModel = require("./models/myBudget_schema")


app.use(cors());
app.use(express.json());

let url = 'mongodb://localhost:27017/Budget';

mongoose.connect(url)
        .then(() =>{
            console.log("Connected to the database")
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })


//let budget;

// Read budget data from the JSON file
// fs.readFile('budget.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error("Error reading budget data:", err);
//         return;
//     }
//     budget = JSON.parse(data);
// });


app.get("/budget", async (req, res) => {
    budgetModel.find({})
    .then((data) => {
        res.json({myBudget: data});
    })
    .catch((connectionError) => {
        console.log(connectionError)
    })
});

app.post("/budget", async (req, res) => {
    const { title, budget, color } = req.body;

    if (!title || !budget || !color) {
        return res.status(400).json(error);
    }

    const otherPBudget = new budgetModel({ title, budget, color });

    otherPBudget.save()
        .then(() => {
            res.status(201).json({ message: "Budget entry added successfully", otherPBudget });
        })
        .catch((error) => {
            console.error("Error saving budget entry:", error);
            res.status(500).json({ message: "Error saving budget entry" });
        });
});

app.use('/', express.static('public'))



app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});