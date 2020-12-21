const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products2 = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
products=Object.values(products2)


const productSkeleton={
	"id":0,
  	"name": "",
  	"price":"",
  	"discount":"",
  	"category": "",
  	"description": "",
  	"image": ""
}
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', products)
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product=products.find( product => {return req.params.id==product.id })
		res.render('detail', {'product':product})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct={...productSkeleton,...req.body}
		lastProduct =products.length-1
		if(lastProduct !== -1){
			let lastProduct= products[lastProduct]
			newProduct.id= lastProduct.id+1
		}
		products.push(newProduct)
		fs.appendFileSync(productsFilePath, JSON.stringify(newProduct))
		res.render("products.ejs",{'products':products})
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product=products.find( product => {return req.params.id==product.id })
		res.render('product-edit-form',{'product': product})
	},
	// Update - Method to update
	update: (req, res) => {
		let product=products.find( product => {return req.params.id==product.id })
		product.price=req.body.price
		product.discount=req.body.discount
		product.category=req.body.category
		product.description=req.body.description
		product.image=req.body.image
		fs.writeFileSync(productsFilePath, JSON.stringify(products))
		res.render("products.ejs",{'products':products})
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		products =products.filter(product => product.id !=req.params.id )
		fs.writeFileSync(productsFilePath, JSON.stringify(products))
		res.redirect('/')
	}
};

module.exports = controller;