/**
 * Created by mac on 06/10/2016.
 */
"use strict";





const Article = require('../models/Article');
const Category = require('../models/Category');


const Articles = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function (req, res) {

        Article.find({}, function (err, articles) {







            for(var i = 0; i < articles.length; i++) {

                console.log(articles);
               // console.log(articles[1].category);

            }


            //for(var category in articles){
          //      console.log(category+": category "+ articles[title]);
            //}

            //articles.forEach(function(title:) {
          //    console.log(title);
          /// });
            Category.find(articles.category, function (err, categories) {



                if (err) throw err;
                res.render('articles/index', {title: "articles", articles: articles, titleC: "categories", categories: categories});

            });
        });


    },
    create: function (req, res) {



        let categoryUsed =  req.body.category;

        Category.findOne({title:categoryUsed}, function (err, cat) {
            if (err) throw err;
            console.log(cat);

            let article = new Article({
                title: req.body.title,
                contents: req.body.contents,
                category: cat,
                createdOn: new Date(),
                changeOn: new Date()






            });
            // createdBy: req.session.createdBy




            console.log(article);
            article.save(function (err) {
                if (err)  err;
               console.log(article);

                cat.articles.push(article._id);



                cat.save(function (err) {

                if (err) throw err;
                });



            });



            console.log('Article added');
            res.redirect('/articles/');

        });


    },



    preupdate: function(req,res){


        Article.findById(req.params.id, function (err, article) {
            Category.find({}, function (err, categories) {

                res.render('articles/UpdateArticle', {titleC: "categories", categories: categories,titleA: "article", article: article});
                // console.log({titleC: "categories", categories: categories,titleA: "article", article: article});
                if (err) throw err;
                //console.log(category);

            });
            if (err) throw err;
            //console.log(article);

        });



    },


    update: function (req, res) {

        Article.findById(req.params.id, function (err, article) {
            if (err) throw err;

            let categoryUsed = req.body.category;
            Category.findOne({title: categoryUsed}, function (err, cat) {
                if (err) throw err;

                console.log(cat);
                // console.log("categoryrergeregrerg " + req.body.category._id);

                // change values of Article
                article.title = req.body.title;
                article.contents = req.body.contents;
                article.category = cat;
                article.pseudo = req.body.pseudo;
                article.adress = req.body.adress;
                article.changeOn = new Date();


                // save the Aricles
                console.log(article);
                article.save(function (err) {
                    if (err) throw err;
                });
                console.log(article);


                cat.articles.push(article._id);
                cat.save(function (err) {

                    if (err) throw err;
                });
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