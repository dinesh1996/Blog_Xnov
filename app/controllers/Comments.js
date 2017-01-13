"use strict";

const Comment = require('../models/Comment');
const Article = require('../models/Article');
const Category = require('../models/Category');
let sess;

const Comments = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */

    index: function (req, res) {
      sess = req.session.regenerate(function(err){if(err)throw err;});
      if(sess.name == null || sess.name == "undefined"){
        res.redirect('/login');
      }
      if(sess != null){
        Comment.find({}, function (err, comments) {
            console.log(comments);
            if (err) throw err;

            const Q = [];

            for (let i = 0; i < comments.length; i++) {
                Q.push(new Promise((resolve, reject) => {

                    Article.findById(comments[i].article, function (err, c) {
                        if (err) throw err;
                        comments[i].article = c;
                        //console.log(articles[i].category);
                        resolve(comments[i]);
                    });
                }));
            }

            Promise.all(Q).then(data => {
                res.render('users/comments/allcomments', {
                    title: "All Comments", data: data
                });
            });
        }).sort({_id: -1});
      }else{
        res.redirect('/login/');
      }

    },

    read: function (req, res) {
      if(sess != null){
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
      }else{
        res.redirect('/login');
      }
    },

    getNewCommentCreate:function(req,res){
      if(sess != null){
          res.render('users/comments/NewCommentCreate');
      }else {
          res.redirect('/login');
      }

    },

    create: function (req, res) {
      sess = req.session.regenerate(function(err){if(err)throw err;});
      if(sess.name == null || sess.name == "undefined" && sess.status != 1){
        res.redirect('/login');
      }
      if(sess != null){
        console.log("  Etape0");
        Article.findById(req.params.id, function (err, article) {
            console.log("  Etape1");

            if (err) throw err;
            console.log(article);

            let comment = new Comment({
                content : req.body.content,
                article: article,
                createdOn: new Date(),
                changeOn: new Date()
            });
            // createdBy: req.session.createdBy

            console.log("Etape2");
            console.log(comment);
            comment.save(function (err) {
                if (err) err;
                console.log(comment);
                article.comments.push(comment);
                article.save(function (err) {
                    if (err) throw err;
                });
            });
            console.log('Comment  added');
            res.redirect('/articles/');
        });

      }else{
        res.redirect('/login/');
      }
    },
/*

    preupdate: function (req, res) {


        Category.findById(req.params.id, function (err, category) {
            res.render('categories/UpdateCategory', {title: "category", category: category});
            if (err) throw err;
        });

    },

    update: function (req, res) {

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
                ;


                console.log('Category successfully activation!');
                console.log(category);
                res.redirect('/admin/categories/');


            });


        });


    }
    */
};

module.exports = Comments;
