// server.js

const express = require('express')
const bodyParser= require('body-parser')
const app = express()

const connectionString = 'mongodb+srv://AnhVy:Vy0935036595@cluster0.vudsi.mongodb.net/Database-Asm2-1644?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient


MongoClient.connect(connectionString, { useUnifiedTopology: true })
	.then(client => {
		console.log('Connected to Database')
    
		const db = client.db('Database-Asm2-1644')
		const productsCollection = db.collection('Product')

		// Make sure you place body-parser before your CRUD handlers!
		app.use(bodyParser.urlencoded({ extended: true }))


		//app.get('/', (req, res) => {
		//res.sendFile(__dirname + '/index.html')
			// Note: __dirname is directory current directory you're in. Try logging it and see what you get!
			// Mine was '/Users/zellwk/Projects/demo-repos/crud-expressmongo' for this app.
		//})

		// get <form action="/quotes" method="POST"> from index.html after submission
		app.post('/AddProduct', (req, res) => {
		  productsCollection.insertOne(req.body)
			.then(result => {
			  res.redirect('/')
			})
			.catch(error => console.error(error))
		})
		
		app.set('view engine', 'ejs')
		app.get('/', (req, res) => {
			db.collection('Product').find().toArray()
			.then(results => {
				res.render('index.ejs', { Product: results })
			})			
			.catch(error => console.error(error))
			
			// ...
			//res.sendFile(__dirname + '/index.html')
		})


		app.listen(process.env.PORT || 3000, function() {
			console.log('listening on 3000')
		})

	
	})
	.catch(error => console.error(error))