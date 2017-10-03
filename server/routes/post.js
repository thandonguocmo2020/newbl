const config = require('../config/index');

var POST = require('../model/post');

module.exports = [
    {
        method: 'GET',
        path: '/p/{id}/{title?}',
        handler: function (request, reply) {

            let template = fs.readFileSync('./public/layout.html').toString();
            var partials = {
                body: fs.readFileSync('./public/info.html').toString()
            }

            POST.findOne({ sid: request.params.id }, (err, doc) => {
                if (err) {
                    throw err;
                    return;
                }

                // update view

                let view = (doc.v + 1);

                POST.update({ sid: request.params.id }, { $set: { v: view } }, function (err, doc) {

                });

                if (doc) {

                    if (_.isArray(doc.tags)) {

                        // show suggest
                        POST.find({ tags: { "$in": doc.tags } }).limit(5).exec((err, suggest) => {
                            if (err) {
                                throw err;
                                return;
                            }

                            // show aside
                            POST.find({ tags: { "$in": doc.tags } }).sort({ v: -1 }).limit(3).exec((err, lists) => {

                                if (err) {
                                    throw err;
                                    return;
                                }
                                let post_right = lists.filter(i => console.log(i._id != doc._id));
                                let data = {
                                    host:config.host,
                                    site:config.site,
                                    post: doc,
                                    // src: doc.src| null,
                                    // info: doc.htm,
                                    // tags: doc.tags,
                                    suggest: suggest,
                                    aside: post_right,
                                    // post_meta: doc,
                                    // tags: doc.tags,
                                    keyword: doc.tags.join(',')
                                }

                                console.log(post_right);

                                var html = Mustache.to_html(template, data, partials);

                                reply(html);
                            });

                        });
                    }

                    else {

                        // suggest
                        POST.find({}).limit(5).exec(err, suggest => {
                            if (err) {
                                throw err;
                                return;
                            }

                            // aside
                            POST.find({}).sort({ v: -1 }).limit(3).exec((err, lists) => {

                                let post_right = lists.filter(i => console.log(i._id != doc._id));

                                let data = {
                                    host:config.host,
                                    site:config.site,
                                    post: doc,
                                    info: doc.htm,
                                    suggest: suggest,
                                    aside: lists,
                                    meta: {
                                        tl: doc.tl,
                                        desc: doc.desc,
                                        keyword: doc.tags.join(',')
                                    }
                                }
                        

                                var html = Mustache.to_html(template, data, partials);
                                reply(html);

                            });
                        });
                    }
                }
            });

        }
    },

    {
        method: 'POST',
        path: '/api/post',

        handler: (req, reply) => {

            let _post = req.payload;

            _post.slg = req.payload.pl.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');


            if (req.payload.update) {
                delete (_post.update);

                POST.findByIdAndUpdate(_post._id, { $set: _post }, { new: true }, function (err, doc) {
                    if (err) {
                        throw err;
                        return;
                    }

                    if (doc) {
                        reply({ stt: 1, message: "update post success", _data: doc })
                    }
                })

            } else {

                POST.find({ slg: _post.slg }).exec(function (err, doc) {

                    if (err) {
                        throw err;
                        return;
                    }

                    if (_.isEmpty(doc)) {

                        // console.log("CREATE POST ========>");
                        // console.log(_post);
                        POST.create(_post, function (err, post) {
                            if (err) {
                                throw err;
                                return;
                            }
                            if (post) {
                                reply({ stt: 1, _data: post, message: "Create Post Success" })
                            }
                        });

                    } else {

                        reply({ stt: 0, message: "Link Post has exists" })
                    }
                });

            }

        }
    },
    {
        method: 'post',
        path: '/api/post/delete-mul',
        handler: (req, reply) => {

            let postsId = req.payload.items;

            POST.remove({ _id: { $in: postsId } }, function (err, removeResult) {
                if (err) {
                    throw err;
                    return;
                }

                if (removeResult.result.n == 0) {
                    reply({ stt: 0 });
                } else {
                    reply({ stt: 1, _doc: postsId });
                }



            });
        }
    },
    {
        method: 'post',
        path: '/api/post/delete',
        handler: (req, reply) => {

            let _pid = req.payload._id;

            POST.findByIdAndRemove(_pid, function (err, doc) {
                if (err) {
                    throw err;
                    return;
                }

                if (doc) {
                    reply({ stt: 1, message: "delete post success" });
                }
            })
        }
    },
    {
        method: 'post',
        path: '/api/p/member',

        handler: function (request, reply) {

            let uid = request.payload._uid;

            if (request.payload.page) {
                let ct = (request.payload.page - 1) * 20 + 1;

                POST.find({ _uid: uid }).sort({ '_id': -1 }).skip(ct).limit(20).exec(function (err, doc) {
                    if (err) {
                        throw err;
                        return;
                    }
                    if (doc) {
                        reply({ stt: 1, _data: doc });
                    }
                });

            } else {
                POST.find({ _uid: uid }).sort({ '_id': -1 }).exec(function (err, doc) {
                    if (err) {
                        throw err;
                        return;
                    }
                    if (doc) {
                        let numDoc = doc.length;
                        let _limit = doc.slice(0, 20);
                        reply({ stt: 1, _data: _limit, num: numDoc });
                    }
                });
            }
        }
    },

]