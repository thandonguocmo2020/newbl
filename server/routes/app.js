const config = require('../config/index');
const POST = require('../model/post');
const Subscribe = require('../model/subscribe');
module.exports = _.concat([
    {
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, reply) {


                // CREATE DATA  EXample
                // let template = fs.readFile('./public/post.json','utf8', function (err, doc) {
                //     if (err) {
                //         console.log(err);
                //     }

                //     // let obj = JSON.parse(JSON.stringify(doc.toString()));

                //     // let arr = Object.keys(obj).map(function (key) { return obj[key]; });
                //    var obj = JSON.parse(doc);

                //     obj.map(item=>{
                //         // console.log(item);
                //         POST.create(item, function (err, r) {
                //             if(err){
                //                 console.log(err);
                //             }


                //         });
                //     })
                // });

                // END CREATE EXample

                let template = fs.readFileSync('./public/layout.html').toString();

                var partials = {
                    host: config.host,
                    meta_home: config.site,
                    body: fs.readFileSync('./public/home.html').toString()
                }

                POST.find({}).sort({ _id: -1 }).exec(function (err, docs) {

                    if (err) {
                        throw err;
                        return;
                    }

                    if (docs) {

                        let items = docs.filter(i => {
                            if (i.tl.length > 65) {
                                i.tl = i.tl.substr(0, 65) + '...';
                            }
                            return i;
                        });

                        console.log(items);

                        let itemsPerPage = 12;
                        let maxPages = items.length / itemsPerPage;

                        let data = {
                            host: config.host,
                            meta_home: config.site,
                            post: items.slice(0, itemsPerPage),
                            maxPages: maxPages

                        }
                        let html = Mustache.to_html(template, data, partials);

                        reply(html)

                    }
                });
            }

        }
    },

    {
        method: 'post',
        path: '/page',
        handler: (req, reply) => {
            var page = req.payload.page;
            let itemsPerPage = 3;
            var start = (page - 1) * itemsPerPage;
            var end = page * itemsPerPage;

            POST.find({}).exec((err, docs) => {

                let items = docs.filter(i => {
                    if (i.tl.length > 65) {
                        i.tl = i.tl.substr(0, 65) + '...';
                    }
                    return i;
                });


                let maxPages = items.length / itemsPerPage;

                let template = fs.readFileSync('./public/pagination.html').toString();

                let data = {
                    post: items.slice(start, end)
                }
                var html = Mustache.to_html(template, data);
                reply(html);
            });

        }
    },

    {
        method: 'post',
        path: '/trend',
        handler: (req, reply) => {
            POST.find({}).sort({ 'v': -1 }).limit(12).exec(function (err, doc) {
                if (err) {
                    throw err;
                    return;
                }

                if (doc) {
                    let template = fs.readFileSync('./public/trend.html').toString();

                    let data = {
                        post: doc
                    }
                    let html = Mustache.to_html(template, data);
                    reply(html);
                }
            });

        }
    },
    {
        method: 'post',
        path: '/search',
        handler: (req, reply) => {
            let searchString = req.payload.search;
            console.log(searchString);
            POST.textSearch(searchString, { limit: 1000 }, function (err, output) {

                if (output) {

                    let template = fs.readFileSync('./public/search.html').toString();

                    let data = {
                        post: doc
                    }
                    let html = Mustache.to_html(template, data);
                    reply(html);
                }
            });



        }
    },

    {
        method: 'GET',
        path: '/t/{tag}',

        handler: function (request, reply) {

            let tag = request.params.tag;

            let template = fs.readFileSync('./public/layout.html').toString();

            var partials = {
                body: fs.readFileSync('./public/home.html').toString()
            }

            POST.find({ tags: { $in: [tag] } }).sort({ _id: -1 }).exec(function (err, docs) {

                if (err) {
                    throw err;
                    return;
                }

                if (docs) {


                    let items = docs.filter(i => {
                        if (i.tl.length > 65) {
                            i.tl = i.tl.substr(0, 65) + '...';
                        }
                        return i;
                    });

                    let itemsPerPage = 12;
                    let maxPages = items.length / itemsPerPage;

                    let data = {
                        host: config.host,
                        site: config.site.name,
                        post: items.slice(0, itemsPerPage),
                        maxPages: maxPages
                    }
                    let html = Mustache.to_html(template, data, partials);

                    reply(html)

                }
            });

        }
    },

    {
        method: 'POST',
        path: '/subscribe',
        handler: (req, reply) => {

            let mail = req.payload.mail;


            Subscribe.findOneAndUpdate({ mail: mail }, { $set: { mail: mail } }, { upsert: true, new: true }, function (err, doc) {
                if (err) {
                    throw err;
                    return;
                }
                if (doc) {
                    console.log(doc);
                    reply({ stt: 1, message: "Register Success", _data: doc })
                }
            });


        }
    },

    {
        method: 'GET',
        path: '/{path*}',
        config: {
            handler: function (request, reply) {
                reply.view('index.html');
            }
        }
    }
], require('./auth'), require('./post'));