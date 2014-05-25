var fs     = require('fs');
var path   = require('path');
var _      = require('underscore');
var config = require('../../../../config/config/config.json');

var self = module.exports = {};

self.agent_avatar = function (req, res) {
    /** @todo Проверять доступность загрузки автара (origin + widget_uid + agent_uid) */
    fs.readFile(req.files.file.path, function (err, data) {
        var image_name = req.files.file.name;

        var path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/avatars/' + req.params.agent_uid;
        deleteDirRecursiveSync(path);

        if (!image_name) {
            console.log('Error in process save file');

            return res.send({ errors: ['Error in process save file'] });
        } else {
            fs.exists(path, function (exists) {
                var file_path = path + '/avatar.png';

                if (!exists) {
                    mkdirs(path, function() {
                        fs.writeFile(file_path, data, function (err) {
                            if (!err) {
                                return res.send({ url: config.server.url + req.params.widget_uid + '/avatars/' + req.params.agent_uid + '/avatar.png' });
                            } else {
                                return res.send({ errors: [err] });
                            }
                        });
                    })
                } else {
                    fs.writeFile(file_path, data, function (err) {
                        if (!err) {
                            return res.send({ url: config.server.url + req.params.widget_uid + '/avatars/' + req.params.agent_uid + '/avatar.png' });
                        } else {
                            return res.send({ errors: [err] });
                        }
                    });
                }
            });
        }
    });
};

self.widget_logo = function (req, res) {
    /** @todo Проверять доступность загрузки автара (origin + widget_uid + agent_uid) */

    fs.readFile(req.files.file.path, function (err, data) {
        var image_name = req.files.file.name;

        var path = __dirname + '/../../../../public/files/' + req.params.widget_uid;
        deleteFileByMaskSync(path, /logo?\w+\.png/i);

        if (!image_name) {
            console.log('Error in process save file');

            return res.send({ errors: ['Error in process save file'] });
        } else {
            fs.exists(path, function (exists) {
                var file_path = path + '/logo.png';

                if (!exists) {
                    mkdirs(path, function() {
                        fs.writeFile(file_path, data, function (err) {
                            if (!err) {
                                return res.send({ url: config.server.url + req.params.widget_uid + '/logo.png' });
                            } else {
                                return res.send({ errors: [err] });
                            }
                        });
                    })
                } else {
                    fs.writeFile(file_path, data, function (err) {
                        if (!err) {
                            return res.send({ url: config.server.url + req.params.widget_uid + '/logo.png' });
                        } else {
                            return res.send({ errors: [err] });
                        }
                    });
                }
            });
        }
    });
};

// Рекурсивное создание деррикторий
function mkdirs(dist_path, callback){
    var dist_path = dist_path.indexOf('\\') >= 0 ? dist_path.replace('\\', '/') : dist_path;
    if (dist_path.substr(dist_path.length - 1) == '/') {
        dist_path = dist_path.substr(0, dist_path.length - 1);
    }

    function tryDirectory(dir, cb) {
        fs.stat(dir, function (err, stat) {
            if (err) {
                if (err.errno == 2 || err.errno == 32 || err.errno == 34) {
                    if (dir.lastIndexOf('/') == dir.indexOf('/')) {
                        cb(new Error('notfound'));
                    } else {
                        tryDirectory(dir.substr(0, dir.lastIndexOf('/')), function(err){
                            if (err) {
                                cb(err);
                            } else {
                                console.log(dir);
                                fs.mkdir(dir, function (error) {
                                    if (error && error.errno != 17) {
                                        console.log('Failed to make ' + dir);
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
                if (stat.isDirectory()) {
                    cb();
                } else {
                    return cb(new Error('exists'));
                }
            }
        });
    }

    tryDirectory(dist_path, callback);
}

function deleteFileByMaskSync(files_path, files_regexp) {
    if (fs.existsSync(files_path)) {
        if (fs.statSync(files_path).isDirectory()) {
            _.each(fs.readdirSync(files_path), function (child_file) {
                var remove_file = child_file.match(files_regexp);
                if (remove_file) {
                    fs.unlinkSync(path.join(files_path, child_file));
                }
            });
        } else {
            fs.unlinkSync(files_path);
        }
    }
}

function deleteDirRecursiveSync(files_path) {
    if (fs.existsSync(files_path)) {
        if (fs.statSync(files_path).isDirectory()) {
            _.each(fs.readdirSync(files_path), function(child_files_path) {
                deleteDirRecursiveSync(path.join(files_path, child_files_path));
            });
            fs.rmdirSync(files_path);
        } else {
            fs.unlinkSync(files_path);
        }
    }
}

return self;