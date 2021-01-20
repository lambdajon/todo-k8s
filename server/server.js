const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
let Todo = require('./todo.model');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`;

console.log("DATABASE URL:")
console.log(db)
console.log("DATABASE URL:")

mongoose.connect(db, {
	autoIndex: false,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000,
});
const connection = mongoose.connection;


// Once the connection is established, callback 
// mongodb://localhost:27017/myapp
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
});

todoRoutes.route('/').get((req, res) => {
	Todo.find((err, todos) => {
		if (err)
			console.log(err);
		else {
			res.json(todos);
		}
	});
});

todoRoutes.route('/:id').get((req, res) => {
	const id = req.params.id;
	Todo.findById(id, (err, todo) => {
		res.json(todo);
	});
});

todoRoutes.route('/add').post((req, res) => {
	const todo = new Todo(req.body);
	todo.save()
		.then(todo => {
			res.status(200).json({ 'todo': 'todo added successfully' });
		})
		.catch(err => {
			res.status(400).send('adding new todo failed');
		});
});

todoRoutes.route('/update/:id').post((req, res) => {
	Todo.findById(req.params.id, (err, todo) => {
		if (!todo)
			res.status(404).send('Data is not found');
		else {
			todo.todo_description = req.body.todo_description;
			todo.todo_responsible = req.body.todo_responsible;
			todo.todo_priority = req.body.todo_priority;
			todo.todo_completed = req.body.todo_completed;
			todo.save().then(todo => {
				res.json('Todo updated');
			})
				.catch(err => {
					res.status(400).send("Update not possible");
				});
		}
	});
});

app.use('/todos', todoRoutes);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
