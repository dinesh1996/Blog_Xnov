"use strict";


const Category = require('../models/Category');
const Article = require('../models/Article');
const session = require('./Users');

let sess;
const Categories = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    getCategory: function (req, res) {
      sess = req.session.regenerate(function(err){if(err)throw err;});
      if(sess.name == null || sess.name == "undefined"){
        res.redirect('/users/login');
      }
        Category.find({activated: true}, function (err, categories) {
            Article.find({id: categories.articles}, function (err, article) {


                if (err) throw err;
                res.render('articles/NewArticleCreate', {
                    title: "Create Article ",
                    categories: categories,
                    userStatus: sess.status,
                    article
                });
            });

        });

    },


    index: function (req, res) {

      sess = req.session.regenerate(function(err){if(err)throw err;});

        Category.find({}, function (err, categories) {
            if (categories.articles != null) {


                if (err) throw err;

                console.log(categories);
                const Q = [];


                for (let i = 0; i < categories.length; i++) {

                    for (let y = 0; y < categories[i].articles.length; y++) {


                        console.log(i);


                        console.log("finalé" + categories[i].articles[y]);


                        console.log("les categorie " + categories[i] + " ezihgozihgoiezhgoihzeiohghioezezgioh");
                        console.log(" les articles frere" + categories[i].articles[y] + " 22222222222222");


                        Q.push(new Promise((resolve, reject) => {

                            Article.findById(categories[i].articles[y], function (err, a) {
                                if (err) throw err;
                                categories[i].articles[y] = a;
                                console.log("final" + categories[i].articles[y]);
                                resolve(categories[i].articles);


                            });
                        }));


                    }
                }


                Promise.all(Q).then(data => {

                    res.render('categories/', {
                        title: "categories", data: data,userStatus:sess.status
                    });
                });
            } else {

                res.render('categories/', {
                    title: "categories", data: categories,userStatus:sess.status

                });
            }
        }).sort({_id: -1});
    },


    read: function (req, res) {

        Category.findById(req.params.id, function (err, cat) {


            if (err) throw err;

            console.log(cat);
            const Q = [];


            for (let i = 0; i < cat.articles.length; i++) {


                Q.push(new Promise((resolve, reject) => {

                    Article.findById(cat.articles[i], function (err, a) {

                        if (err) throw err;

                        cat.articles[i] = a;

                        resolve(cat.articles[i]);


                    });
                }));


            }


            Promise.all(Q).then(datae => {

                res.render('categories/ReadCategory', {
                    title: "Reading Category", cat: cat
                });
            });

        }).sort({_id: -1});
    },


    create: function (req, res) {
      sess = req.session.regenerate(function(err){if(err)throw err;});
      if(sess.name == null || sess.name == "undefined" && sess.status != true){
        res.redirect('/users/login');
      }
        let category = new Category({
            title: req.body.title,


            createdOn: new Date(),
            changeOn: new Date(),
            activated: true


        });
        console.log(category);
        category.save(function (err) {
            if (err) {
                throw err;
            }
            ;
            console.log('Category inserted');

            res.redirect('/admin/categories/');

        });


    },


    preupdate: function (req, res) {
        sess = req.session.regenerate(function(err){if(err)throw err;});
        if(sess.name == null || sess.name == "undefined" && sess.status != true){
          res.redirect('/users/login');
        }
        Category.findById(req.params.id, function (err, category) {
            res.render('categories/UpdateCategory', {title: "category", category: category});
            if (err) throw err;
        });

    },

    update: function (req, res) {

        sess = req.session.regenerate(function(err){if(err)throw err;});
        if(sess == null || sess == "undefined" && sess.status != true){
          res.redirect('/users/login');
        }
        Category.findById(req.params.id, function (err, category) {
            if (err) throw err;


            console.log(category);

            // change the category location
            category.title = req.body.title;
            category.changeOn = new Date();


            //req.body.map(v => req.session.flash('', v));
            // save the category
            category.save(function (err) {
                if (err) throw err;
                console.log('Categories successfully updated!');
                res.redirect("/admin/categories/");
            });

        });


    },


    predelete: function (req, res) {

      sess = req.session.regenerate(function(err){if(err)throw err;});
      if(sess.name == null || sess.name == "undefined" && sess.status != true){
        res.redirect('/login');
      }
        Category.findById(req.params.id, function (err, category) {
            res.render('categories/DeleteCategory', {title: "category", category: category});
            if (err) throw err;
        });
    },


    delete: function (req, res) {

        Category.findById(req.params.id, function (err, category) {
            if (err) throw err;

            // delete him
            category.activated = false;


            category.save(function (err) {
                if (err) {
                    throw err;
                }
                ;
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
            category.activated = true;
            category.save(function (err) {
                if (err) {
                    throw err;
                }
                console.log('Category successfully activation!');
                console.log(category);
                res.redirect('/admin/categories/');
            });

        });


    }
};

module.exports = Categories;
