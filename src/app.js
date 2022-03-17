const express = require("express");
require("../src/db/conn");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const MensRanking = require("../src/models/mens")
app.post("/mens", async (req, res) => {
    try {
        const addingMen = new MensRanking(req.body)
        // console.log(req.body);
        const insertMen = await addingMen.save();
        return res.status(200).json({
            message: "User Created Successfully!"
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
});
app.get("/mens", async (req, res) => {
    try {
        const getMens = await MensRanking.find({}).sort({ "ranking": 1 });
        res.send(getMens);
    } catch (e) {
        {
            return res.status(408).json({
                message: "Request Time Out"
            });
        }
    }
})

app.get("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await MensRanking.findById(_id)
        res.send(getMen);
    } catch (e) {
        res.status(400).send(e);
    }
})
app.patch("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await MensRanking.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(getMen);
    } catch (e) {
        res.status(500).send("invalid request");
    }
})
app.delete("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await MensRanking.findByIdAndDelete(_id);
        res.send(getMen);
    } catch (e) {
        {
            return res.status(408).json({
                message: "Bad request"
            });
        }
    }
})
app.get("/", async (req, res) => {
    res.send("hello from Nishant");
})
app.listen(port, () => {
    console.log("connection is live at", port);
})