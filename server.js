//dependencies required for the app
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
//render css files
app.use(express.static("public"));

//the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//the completed task array with initial placeholders for removed task
var complete = ["finish jquery"];

app.engine('html', require('ejs').renderFile);
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//post route for adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
	//add the new task from the post route into the array
    task.push(newTask);
	//after adding to the array go back to the root route
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
     var completeTask = req.body.check;
	//check for the "typeof" the different completed task, then add into the complete task
	if (typeof completeTask === "string") {
		complete.push(completeTask);
		//check if the completed task already exist in the task when checked, then remove using the array splice method
		task.splice(task.indexOf(completeTask), 1);
	} else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {     complete.push(completeTask[i]);
    task.splice(task.indexOf(completeTask[i]), 1);
	}}
	res.redirect("/");
});

//render the ejs and display added task, task(index.ejs) = task(array)
app.get("/", function(req, res) {
    res.render("index.html", { task: task, complete: complete});
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

//the server is listening
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
module.exports = app ;
