"use strict";
const Article = require('../models/Article');
const Category = require('../models/Category');
let sess;

const Articles = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */

    index: function (req, res) {
        Article.find({}, function (err, articles) {
            if (err) throw err;

            const Q = [];

            for (let i = 0; i < articles.length; i++) {
                Q.push(new Promise((resolve, reject) => {

                    Category.findById(articles[i].category, function (err, c) {
                        if (err) throw err;
                        articles[i].category = c;
                        //console.log(articles[i].category);
                        resolve(articles[i]);

                    });
                }));
            }

            Promise.all(Q).then(data => {
                res.render('articles/index', {
                    title: "articles", data: data
                });
            });
        }).sort({_id: -1});
    },

    read: function (req, res) {


        Article.findById(req.params.id, function (err, article) {


            let pro = new Promise((resolve, reject) => {
                Category.findById(article.category, function (err, c) {
                    if (err) throw err;
                    article.category = c;
                    console.log(article.category);
                    resolve(article);
                });
            });
            pro.then(datatoread => {
                res.render('articles/ReadArticle', {
                    title: "Reading Article", datatoread: datatoread
                });
            });
        }).sort({_id: -1});
    },

    create: function (req, res) {
        sess = req.session.regenerate(function (err) {
            if (err)throw err;
        });
        if (sess.name == null || sess.name == "undefined") {
            res.redirect('/users/login');
        } else {
            let nb;
            Article.find({}, function (err, articlesTest) {
                if (err) throw err;
                if (req.body.category == undefined && req.body.contents == '' && req.body.title == '') {
                    console.log("case1");
                    nb = 1;
                } else {
                    console.log("testetstsetsetsetesteestsettes " + articlesTest);
                    console.log("  Etape2");
                    if (articlesTest == '') {
                        console.log("case2");
                        nb = 0;
                    }
                    for (let i = 0; i < articlesTest.length; i++) {
                        console.log("Etape3");
                        console.log(articlesTest[i].title);
                        if (req.body.title.toUpperCase() != articlesTest[i].title.toUpperCase()) {
                            console.log("  Etape4");
                            console.log("case2b");
                            nb = 0;
                        } else {
                            nb = 1;
                        }
                    }
                    switch (nb) {
                        case 1:
                            console.log('Article failed');
                            res.redirect('/articles/');
                            break;
                        case 0:
                            console.log("add");
                            let categoryUsed = req.body.category;

                            Category.findOne({title: categoryUsed}, function (err, cat) {
                                console.log("  Etape5");

                                if (err) throw err;
                                console.log(cat);

                                let article = new Article({
                                    title: req.body.title,
                                    contents: req.body.contents,
                                    category: cat,
                                    createdBy: sess.pseudo,
                                    createdOn: new Date(),
                                    changeOn: new Date()
                                });
                                // createdBy: req.session.createdBy

                                console.log("  Etape6");
                                console.log(article);
                                article.save(function (err) {
                                    if (err) err;
                                    console.log(article);

                                    cat.articles.push(article);

                                    cat.save(function (err) {
                                        if (err) throw err;
                                    });
                                });
                                console.log('Article added');
                                res.redirect('/articles/');
                            });
                            break;

                        default:
                            console.log('Article failed');
                            res.redirect('/articles/');
                            break;
                    }
                    ;
                }
              switch (nb) {
                  case 1:
                      console.log('Article failed');
                      res.redirect('/articles/');
                      break;
                  case 0:
                      console.log("add");
                      let categoryUsed = req.body.category;

                      Category.findOne({title: categoryUsed}, function (err, cat) {
                          console.log("  Etape5");

                          if (err) throw err;
                          console.log(cat);

                          let article = new Article({
                              title: req.body.title,
                              contents: req.body.contents,
                              category: cat,
                              createdBy: sess.pseudo,
                              createdOn: new Date(),
                              changeOn: new Date()
                          });
                          // createdBy: req.session.createdBy

                          console.log("  Etape6");
                          console.log(article);
                          article.save(function (err) {
                              if (err) err;
                              console.log(article);

                              cat.articles.push(article);

                              cat.save(function (err) {
                                  if (err) throw err;
                              });
                          });
                          console.log('Article added');
                          res.redirect('/articles/');
                      });
                      break;

                  default:
                      console.log('Article failed');
                      res.redirect('/articles/');
                      break;
              }

          });
        }
      
    },


    preupdate: function (req, res) {

        sess = req.session.regenerate(function (err) {
            if (err)throw err;
        });
        if (sess.name == null || sess.name == "undefined") {
            res.redirect('/users/login');
        }
        Article.findById(req.params.id, function (err, article) {
            Category.find({}, function (err, categories) {

                console.log(article.category);
                console.log(categories._id);


                res.render('articles/UpdateArticle', {
                    title: "Update Article",
                    categories: categories,
                    article: article
                });
                // console.log({titleC: "categories", categories: categories,titleA: "article", article: article});
                if (err) throw err;
                //console.log(category);

            });
            if (err) throw err;
            //console.log(article);

        });


    },


    update: function (req, res) {

        sess = req.session.regenerate(function (err) {
            if (err)throw err;
        });
        if (sess.name == null || sess.name == "undefined") {
            res.redirect('/users/login');
        }
        Article.findById(req.params.id, function (err, article) {
            if (err) throw err;

            console.log("etape 1");

            Category.findById(article.category, function (erroldcat, oldcat) {
                if (err) throw err;

                console.log(oldcat.title + " frero cest la merde la ");

                let categoryUsed = req.body.category;
                if (categoryUsed != null || categoryUsed == oldcat.title) {


                    Category.findOne({title: categoryUsed}, function (err, cat) {
                        if (err) throw err;

                        console.log("etape 2");
                        console.log(cat);


                        console.log("articleid" + article._id);


                        for (let i = 0; i < oldcat.articles.length; i++) {
                            console.log("etape 3");
                            console.log('42 reponse a la vie  ' + oldcat.articles[i]);
                            console.log('42 reponse a la vie2  ' + article._id);

                            let old = toString(oldcat.articles[i]);
                            const idarticle1 = toString(article._id);


                            if (idarticle1 == old) {
                                console.log("etape 4");
                                oldcat.articles.splice(i, 1);

                                oldcat.save(function (err) {
                                    console.log("oldcat1" + oldcat);
                                    console.log("typeof" + typeof(oldcat.articles));
                                    console.log("oldcat12311");
                                    if (err) throw err;
                                });
                            }
                            ;
                        }
                        console.log("etape 5");


                        // console.log("categoryrergeregrerg " + req.body.category._id);

                        // change values of Article
                        article.title = req.body.title;
                        article.contents = req.body.contents;
                        article.category = cat;
                        article.changeOn = new Date();


                        // save the Aricles
                        console.log(article);
                        article.save(function (err) {
                            if (err) throw err;
                        });

                        console.log("etape 6");
                        console.log(article);
                        console.log(cat);
                        cat.articles.push(article);
                        cat.save(function (err) {

                            if (err) throw err;
                        });
                        console.log('Article successfully updated!');

                        res.redirect("/articles/");


                    });
                }
                else {
                    console.log('C est la merde ');

                    res.redirect("/articles/");

                }
            });

        });

    },


    predelete: function (req, res) {

        sess = req.session.regenerate(function (err) {
            if (err)throw err;
        });
        if (sess.name == null || sess.name == "undefined") {
            res.redirect('/users/login');
        }
        Article.findById(req.params.id, function (err, article) {
            res.render('articles/DeleteArticle', {title: "article delate", article: article});
            if (err) throw err;
        });
    },


    delete: function (req, res) {

        Article.findById(req.params.id, function (err, article) {
            if (err) throw err;

            // delete him
            article.activated = false;


            article.save(function (err) {
                if (err) {

                    throw err;


                }


                console.log('Article successfully deleted!');
                console.log(article);
                res.redirect('/articles/');


            });


        });

    },

    reactive: function (req, res) {

        Article.findById(req.params.id, function (err, article) {
            if (err) throw err;

            // reactive him
            article.activated = true;


            article.save(function (err) {
                if (err) {

                    throw err;


                }

                console.log('article successfully activation!');
                console.log(article);
                res.redirect('/articles/');


            });


        });


    }
};

module.exports = Articles;
