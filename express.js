const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors())
//connect to the database

const mysql = require('mysql')

var con = mysql.createConnection({
  host: "mysql.razs.me",
  user: "twitter_db_user",
  password: "swEqodl2aP_PrUrU0AkA",
  database: "angular_twitter"
})

con.connect(function (err) {
  if (err) throw err;
  console.log("connected")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//read data
app.get('/users', (req, res) => {

  let sqlQuery = "SELECT * FROM `nagagalaksmi_new`"
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.send(result)
  })
})
// post data

app.post('/users', (req, res) => {
  //save this data in DB
  let data = req.body;
  let sqlQuery = `INSERT INTO nagagalaksmi_new ( name, email, password, mobile) VALUES ('${data.name}', '${data.email}','${data.password}', '${data.mobile}');`
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    if (result.insertId)
      res.send({ userId: result.insertId, message: "Registration is successful!" })
  });

})

//update data

app.patch('/users/:id', (req, res) => {
  let data = req.body;
  let sqlQuery = `UPDATE nagagalaksmi_new SET name = '${data.name}', email = '${data.email}', password = '${data.password}',  mobile = '${data.mobile}' WHERE nagagalaksmi_new.id = '${req.params.id}';`
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    if (result.affectedRows)
      res.send({ message: "Updated successful!" })
  })

})

//delete data

app.delete('/users/:id', (req, res) => {
  let sqlQuery = `DELETE FROM nagagalaksmi_new WHERE nagagalaksmi_new.id = '${req.params.id}';`
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    if (result.affectedRows)
      res.send({ message: "deleted succesfully" })
  })
})

// app.post('/users/login', (req, res) => {
//   let data = req.body;

//   let sqlQuery = `SELECT id, name, email, mobile FROM users WHERE email LIKE '${data.email}'AND password LIKE '${data.password}'`

//   con.query(sqlQuery, function (err, result) {

//     if (err) throw err;
//     if (result.length)
//       res.send(result[0])
//     else
//       res.send({ message: "Incorrect email/password" })
//   });
// })

// app.post('/profiles', (req, res) => {

//   let data = req.body
//   console.log(data);
//   let sqlQuery = `INSERT INTO users (name, email, mobile, address, qualification, status) VALUES ('${data.name}', '${data.email}', '${data.mobile}', '${data.address}', '${data.qualification}', '${data.status}');`


//   con.query(sqlQuery, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     if (result.affectedRows)
//       res.send({ id: result.insertId, message: "created successfully" })
//     else
//       res.send({ message: "something went wrong" })
//   })



// })

// app.get('/profiles/:id', (req,res) => {

//   let sqlQuery= "SELECT * FROM `profiles`"
//   con.query(sqlQuery, function(err, result){
//     if(err) throw err;
//    res.send(result)
// })
//  })
app.get('/users/:id', (req, res) => {
  let currenentid = req.params.id
  let sqlQuery = `SELECT * FROM  nagagalaksmi_new WHERE id = ${currenentid}`
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.send(result[0])
  })




})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})