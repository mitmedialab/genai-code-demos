// app.js
var response
var story
var name = "#FFFFFF"
var grammarfixed = ""

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// you can hard-code it in here if you'd like
// const configuration = new Configuration({
//   apiKey: "your-key-here",
// });

const openai = new OpenAIApi(configuration);
//express
const express = require("express")
const path = require('path')
const bodyParser = require('body-parser');
const app = express();

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/openai/dist')))

app.engine('html', require('ejs').renderFile);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
  //this sent data alright
  // res.render(__dirname + "/views/index.html", {name:response.data.choices[0].text});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/view", (req, res) => {
  story = req.body.id;

  (async () => {
    response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "The CSS code for a color like " + story + ":\n\nbackground-color: ",
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [";"],
  });

    res.render(__dirname + "/views/index.html", {name:response.data.choices[0].text});

  })()

  // These send fine
  // console.log(response.data.choices[0].text);

});

app.listen(3000, () => {
  console.log('Listening on port ' + 3000);
});

