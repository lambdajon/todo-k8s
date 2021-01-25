const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
var morgan = require('morgan')
let Todo = require('./todo.model');
require('dotenv').config();
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// cb(null, __dirname+'/../static/')
		cb(null, 'data/')
	},
	filename: function (req, file, cb) {
		const fileExt = (file.originalname.split('.'))[1]
		cb(null, `${file.fieldname}-${Date.now()}.${fileExt}`)
	}
})

const fileUpload = multer({
	// dest: '../static/',
	dest: './data/',
	// storage,
	// onFileUploadStart: function (file) {
	// 	console.log(file.originalname + ' is starting ...')
	// },
})
const app = express();

app.use(morgan('combined'))

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res, next) => {

	res.json({
		msg: "HELLO WORLD"
	});
})

let db = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`;

if (process.env.MONGO_AUTH_DISABLE) {
	db = 'mongodb://localhost:27017/todo-app'
}
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

todoRoutes.route('/').get(async (req, res, next) => {
	try {
		const data = await Todo.find();
		res.json(data)
	} catch (e) {
		next(e);
	}
});

todoRoutes.route('/:id').get(async (req, res, next) => {
	try {
		const id = req.params.id;
		const todo = await Todo.findById(id)
		res.json(todo)
	} catch (e) {
		next(e);
	}
});
todoRoutes.route('/').post(fileUpload.single('file'), async (req, res, next) => {
	try {
		console.log(req.file)
		const todo = new Todo(req.body);
		const data = await todo.save()
		res.json(data)
	} catch (e) {
		next(e);
		throw new Error(`todos create error: ${e}`)
	}
});

todoRoutes.route('/:id').put(async (req, res, next) => {
	try {
		const updated = await Todo.findByIdAndUpdate(req.params.id, req.body)
		res.json(updated);

	} catch (e) {
		next(e)
		throw new Error(`todos update error: ${e}`)
	}
});

app.use('/todos', todoRoutes);
app.use('/status', (req, res, next) => {

	res.json({
		msg: "OK"
	});
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
