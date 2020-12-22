const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
products=Object.values(products)
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visited =[]
		let insale =[]
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.forEach(product => {
			if(product.category === "visited"){
				visited.push(product)
			}else if(product.category === "in-sale"){
				insale.push(product)
			}
		})
		res.render('index',{'visited':visited,'insale':insale})
	},
	search: (req, res) => {
		let product=products.filter(producto => {
			let name=producto.name;
			name =name.toLowerCase();
			return (req.body.keywords== name|| name.indexOf(req.body.keywords.toLowerCase())!=-1)
		})

		console.log(product)
		res.render('results',{'product':product[0]} )
	},
};

module.exports = controller;
