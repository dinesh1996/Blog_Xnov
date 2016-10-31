"use strict";



const Category = require('../models/Category');
const Article = require('../models/Article');


const Categories = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */



    getCategory: function (req, res) {

    Category.find({activated: true}, function (err, categories) {
        Article.find({id: categories.articles}, function(err, article) {


        if (err) throw err;
        res.render('articles/NewArticleCreate',{title: "categories", categories: categories,titleA: "articles", article});
    });

    });

},


    index: function (req, res) {

        Category.find({}, function (err, categories) {
            if (err) throw err;





           // Virus.findById(id, function (err, virus) {
             //   console.log(virus.name);     // name is required
           //     console.log(virus.taxonomy); // taxonomy is not
            //});



            res.render('categories/index', {title: "categories", categories:categories, titlea: "article", article: categories.articles});

           // console.log(categories);
        });


    },
    create: function (req, res) {


        let category = new Category({
            title: req.body.title,


            createdOn: new Date(),
            activated: true




        });
        console.log(category);
        category.save(function (err) {
            if (err) {

                throw err;




            };
            console.log('Category inserted');

            res.redirect('/admin/categories/');

        });


    },



    preupdate: function(req,res){


        Category.findById(req.params.id, function (err, category) {
            res.render('categories/UpdateCategory',   {title: "category", category: category});
            if (err) throw err;
        });

    },

    update: function (req, res) {

        Category.findById(req.params.id, function (err, category) {
            if (err) throw err;


            console.log(category);

            // change the category location
            category.title = req.body.title;
            category.changeOn =  new Date();



//req.body.map(v => req.session.flash('', v));
            // save the category
            category.save(function (err) {
                if (err) throw err;

                console.log('Categories successfully updated!');

                res.redirect("/admin/categories/");
            });

        });


    },


    predelete: function(req,res) {


        Category.findById(req.params.id, function (err, category) {
            res.render('categories/DeleteCategory', {title: "category", category: category});
            if (err) throw err;
        });
    },



    delete: function (req, res) {

        Category.findById(req.params.id, function (err, category) {
            if (err) throw err;

            // delete him
            category.activated= false;




            category.save(function (err) {
                if (err) {

                    throw err;


                };


                console.log('Category successfully deleted!');
                console.log(category);
                res.redirect('/admin/categories/');


            });


        });

    },
    reactive: function (req, res) {

        Category.findById(req.params.id, function (err, category) {
            if (err) throw err;

            // reactive him
            category.activated= true;




            category.save(function (err) {
                if (err) {

                    throw err;


                };


                console.log('Category successfully deleted!');
                console.log(category);
                res.redirect('/admin/categories/');


            });


        });



    }
};

module.exports = Categories;