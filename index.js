// HINTS:
// 1. Import express and axios
import express from 'express';
import axios from "axios";
// 2. Create an express app and set the port number.
const app = express()
const port = 3000
const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "7393eaf7-0c77-47e7-b5ae-b320d2ae18f8";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get('/', async(req, res)=> {
    const result = await axios.get(API_URL + `/random`);
    let {secret,username}=result.data;
    res.render("index.ejs", { secret: secret, user:username });
});

app.get('/get-more', async (req, res) => {
    try {
        const result = await axios.get(API_URL + `/random`, config);
        let { secret, username } = result.data;
        res.render("index.ejs", { secret: secret, user: username });
    } catch (error) {
        res.render("index.ejs", { secret: "Error al obtener el secreto", user: null });
    }
})

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})