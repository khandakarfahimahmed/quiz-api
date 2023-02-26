//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql");



const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
///////Database connection///////////
const db = mysql.createConnection({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quizProject'
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('database connected');
});


///////////Create Quiz//////////////
app.route("/createquiz")
.get(function(req, res){
  let title = [];
  let question = [];
  let ans1 = [];
  let ans2 = [];
  let ans3 = [];
  db.query(
    `SELECT * FROM quiz `,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } 
      else{
        result.forEach(items => {
          title.push(items.title);
        });
        result.forEach(items => {
          question.push(items.question);
        });
        result.forEach(items => {
          ans1.push(items.answer1);
        });
        result.forEach(items => {
          ans2.push(items.answer2);
        });
        result.forEach(items => {
          ans3.push(items.answer3);
        });
        res.render('createquiz',{title, question, ans1, ans2, ans3});
        
      }
      
    }
  )
})
.post(function (req, res){
  let title = req.body.quizTitle;
  let text = req.body.question;
  let ques = req.body.ques;
  let ans = req.body.newAns;
  console.log(ques);
  console.log(ans);
  db.query(
    `INSERT INTO quiz (title, question) VALUES (?,?)`,
    [title, text],
    (err, result) => {
      console.log(err);
    }
  )
  res.redirect('/createquiz');
});


//////////Quiz section///////////

app.route("/quizes")
.get(function(req, res){
  let title = [];
  let question = [];
  let ans1 = [];
  let ans2 = [];
  let ans3 = [];
  db.query(
    `SELECT * FROM quiz `,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } 
      else{
        result.forEach(items => {
          title.push(items.title);
        });
        result.forEach(items => {
          question.push(items.question);
        });
        result.forEach(items => {
          ans1.push(items.answer1);
        });
        result.forEach(items => {
          ans2.push(items.answer2);
        });
        result.forEach(items => {
          ans3.push(items.answer3);
        });
        res.render('quiz',{title, question, ans1, ans2, ans3});
      }
    }
  )
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  