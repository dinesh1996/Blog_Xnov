"use strict";

require('../models/Article');

const mongoose = require('mongoose'),
      Article = mongoose.model('Article');

const News = {
	create: function(req,res){
	if(req.body.title && req.body.category && req.body.content){
		let newArticle = new Article({

		});

		newArticle.save(function(err){
			if(!err){
				console.log('Création réussie');
			}
			res.render('news/list');
		});

	}else{
		console.log('Aucun champs rempli');
		res.redirect('news/create');
	}
	

	},
	read: function(req,res){
		
	},
	update: function(req,res){

	},
	delete: function(req,res){

	},
	getAll:function(req,res){

	},
};

module.exports = News;
