import axios from 'axios';
import express from 'express';

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/"

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/anime", (req, res) => {
    res.render("anime.ejs");
})

app.post("/anime", async (req, res) => {
    try {
        var genreString = req.body.genre[0];
        if(req.body.genre.length > 1) {
            genreString = req.body.genre.join(",");
        }
        const response = await axios.get(`${API_URL}anime?page=1&order_by=popularity&limit=10&genres=${genreString}`);
        const result = response.data.data;
        res.render("anime.ejs", {data: result});

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: 'There were no shows matching that query :(',
    });
    }
})
app.listen(port, () => {
    console.log("Listening on port " + port);
})
