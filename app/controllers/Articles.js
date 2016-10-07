/**
 * Created by mac on 06/10/2016.
 */
"use strict";





const Article = require('../models/Article');


const Articles = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function (req, res) {

        Article.find({}, function (err, articles) {
            if (err) throw err;
            res.render('articles/index', {title: "articles", articles: articles});
        });


    },
    create: function (req, res) {



        let article = new Article({
            title: req.body.title,
            contents: req.body.contents,
            category: req.body.category,
            createdOn:  new Date(),
           // createdBy: req.session.createdBy



        });
        console.log(article);
        article.save(function (err) {
            if (err) {

                throw err;




            }
            console.log('Article added');

            res.redirect('/articles/');

        });


    },



    preupdate: function(req,res){


        Article.findById(req.params.id, function (err, article) {
            res.render('articles/UpdateArticle', {title: "article", article: article});
            if (err) throw err;
        });

    },


    update: function (req, res) {

        Article.findById(req.params.id, function (err, article) {
            if (err) throw err;


            console.log(article);

            // change values of Article
            article.title = req.body.title;
            article.contents =  req.body.contents;
            article.category =  req.body.category;
            article.pseudo =req.body.pseudo;
            article.adress =  req.body.adress;
            article.changeOn = new Date();





            // save the Aricles
            article.save(function (err) {
                if (err) throw err;
                console.log(article);
                console.log('Article successfully updated!');

                res.redirect("/articles/");
            });

        });


    },


    predelete: function(req,res) {


        Article.findById(req.params.id, function (err, article) {
            res.render('articles/DeleteArticle', {title: "article", article: article});
            if (err) throw err;
        });
    },



    delete: function (req, res) {

        Article.findById(req.params.id, function (err, article) {
            if (err) throw err;

            // delete him
            article.activated= false;




            article.save(function (err) {
                if (err) {

                    throw err;


                }


                console.log('Article successfully deleted!');
                console.log(article);
                res.redirect('/articles/');


            });


        });

    }
};

module.exports = Articles;