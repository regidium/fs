var fs     = require('fs');
var im     = require('imagemagick');
var config = require('../../../../config/config/config.json');

var self = module.exports = {};

self.agent_avatar = function (req, res) {
    /** @todo Проверять доступность загрузки автара (origin + widget_uid + agent_uid) */
    fs.readFile(req.files.file.path, function (err, data) {
        var image_name = req.files.file.name;

        var path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/avatars/' + req.params.agent_uid;

        if (!image_name) {
            console.log('Error in process save file');

            return res.send({ errors: ['Error in process save file'] });
        } else {
            im.identify(req.files.file.path, function(err, features) {
                var format = features.format.toLowerCase();

                fs.exists(path, function (exists) {
                    var file_path = path + '/avatar.' + format;

                    if (!exists) {
                        mkdirs(path, function() {
                            fs.writeFile(file_path, data, function (err) {
                                if (!err) {
                                    return res.send({ url: config.server.url + req.params.widget_uid + '/avatars/' + req.params.agent_uid + '/avatar.' + format });
                                } else {
                                    return res.send({ errors: [err] });
                                }
                            });
                        })
                    } else {
                        fs.writeFile(file_path, data, function (err) {
                            if (!err) {
                                return res.send({ url: config.server.url + req.params.widget_uid + '/avatars/' + req.params.agent_uid + '/avatar.' + format });
                            } else {
                                return res.send({ errors: [err] });
                            }
                        });
                    }
                });
            });
        }
    });
};

self.widget_logo = function (req, res) {
    /** @todo Проверять доступность загрузки автара (origin + widget_uid + agent_uid) */

    fs.readFile(req.files.file.path, function (err, data) {
        var image_name = req.files.file.name;

        var path = __dirname + '/../../../../public/files/' + req.params.widget_uid;

        if (!image_name) {
            console.log('Error in process save file');

            return res.send({ errors: ['Error in process save file'] });
        } else {
            im.identify(req.files.file.path, function(err, features) {
                var format = features.format.toLowerCase();

                fs.exists(path, function (exists) {
                    var file_path = path + '/logo.' + format;

                    if (!exists) {
                        mkdirs(path, function() {
                            fs.writeFile(file_path, data, function (err) {
                                if (!err) {
                                    return res.send({ url: config.server.url + req.params.widget_uid + '/logo.' + format });
                                } else {
                                    return res.send({ errors: [err] });
                                }
                            });
                        })
                    } else {
                        fs.writeFile(file_path, data, function (err) {
                            if (!err) {
                                return res.send({ url: config.server.url + req.params.widget_uid + '/logo.' + format });
                            } else {
                                return res.send({ errors: [err] });
                            }
                        });
                    }
                });
            });
        }
    });
};

// Рекурсивное создание деррикторий
function mkdirs(path, callback){
    var path = path.indexOf('\\') >= 0 ? path.replace('\\', '/') : path;
    if (path.substr(path.length - 1) == '/') {
        path = path.substr(0, path.length - 1);
    }

    function tryDirectory(dir, cb) {
        fs.stat(dir, function (err, stat) {
            if (err) {
                if (err.errno == 2 || err.errno == 32 || err.errno == 34) {
                    if (dir.lastIndexOf('/') == dir.indexOf('/')) {
                        cb(new Error('notfound'));
                    } else {
                        tryDirectory(dir.substr(0, dir.lastIndexOf('/')), function(err){
                            if (err) { //error, return
                                cb(err);
                            } else { //make this directory
                                console.log(dir);
                                fs.mkdir(dir, function (error) {
                                    if (error && error.errno != 17) {
                                        console.log("Failed to make " + dir);
                                        return cb(new Error('failed'));
                                    } else {
                                        cb();
                                    }
                                });
                            }
                        });
                    }
                } else {
                    console.log(err);
                    cb(err);
                }
            } else {
                if (stat.isDirectory()) { //directory exists, no need to check previous directories
                    cb();
                } else { //file exists at location, cannot make folder
                    return cb(new Error('exists'));
                }
            }
        });
    }

    tryDirectory(path, callback);
};

return self;