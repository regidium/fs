var fs = require('fs');
var im = require('imagemagick');

var self = module.exports = {};

self.agent_avatar = function (req, res, next) {
    var base_path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/avatars/' + req.params.agent_uid + '/avatar';
    var sufix = '';
    var width = null;
    var height = null;

    if(req.query && req.query.width && req.query.height) {
        sufix = req.query.width + 'x' + req.query.height;
        width = req.query.width;
        height = req.query.height;
    } else if(req.query && req.query.width) {
        sufix = req.query.width + 'xAuto';
        width = req.query.width;
    } else if(req.query && req.query.height) {
        sufix = 'Autox' + req.query.height;
        height = req.query.height;
    }
    file_path =  base_path + sufix + '.png';

    var exists = fs.existsSync(file_path);

    if (exists) {
        var img = fs.readFileSync(file_path);
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
    } else {
        var exists_base = fs.existsSync(base_path + '.png');
        if (exists_base) {
            if (width || height) {
                var options = {
                    srcPath: base_path + '.png',
                    dstPath: base_path + sufix + '.png'
                };

                if (width) {
                    options.width = width;
                }
                if (height) {
                    options.height = height;
                }

                im.resize(options, function(err, stdout, stderr) {
                    if (err) {
                        throw err;
                    }
                    file_path = base_path + sufix + '.png';

                    var img = fs.readFileSync(file_path);                    
                    res.writeHead(200, {'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                });
            } else {
                file_path = base_path + '.png';

                var img = fs.readFileSync(file_path);
                res.writeHead(200, {'Content-Type': 'image/png' });
                res.end(img, 'binary');
            }
        } else {
            var exists_default = fs.existsSync(__dirname + '/../../../../public/static/avatar' + sufix + '.png')
            if (exists_default) {
                file_path = __dirname + '/../../../../public/static/avatar' + sufix + '.png';
            } else {
                if (width || height) {
                    var options = {
                        srcPath: __dirname + '/../../../../public/static/avatar.png',
                        dstPath: __dirname + '/../../../../public/static/avatar' + sufix + '.png',
                    };

                    if (width) {
                        options.width = width;
                    }
                    if (height) {
                        options.height = height;
                    }

                    im.resize(options, function(err, stdout, stderr) {
                        if (err) {
                            throw err;
                        }
                        file_path = __dirname + '/../../../../public/static/avatar' + sufix + '.png';

                        var img = fs.readFileSync(file_path);                    
                        res.writeHead(200, {'Content-Type': 'image/png' });
                        res.end(img, 'binary');
                    });
                } else {
                    file_path = __dirname + '/../../../../public/static/avatar.png';
                    // @todo Попробовать
                    //res.attachment('path/to/logo.png');

                    var img = fs.readFileSync(file_path);
                    res.writeHead(200, {'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                }
            }
        }
    }
};

self.widget_logo = function (req, res) {
    // var file_path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/' + req.params.file_name;

    // fs.exists(file_path, function (exists) {
    //     if (exists) {
    //         var img = fs.readFileSync(file_path);
    //     } else {
    //         var img = fs.readFileSync(__dirname + '/../../../../public/static/logo.png');
    //     }

    //     res.writeHead(200, {'Content-Type': 'image/png' });
    //     res.end(img, 'binary');
    // });
    var base_path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/logo';
    var sufix = '';
    var width = null;
    var height = null;

    if(req.query && req.query.width && req.query.height) {
        sufix = req.query.width + 'x' + req.query.height;
        width = req.query.width;
        height = req.query.height;
    } else if(req.query && req.query.width) {
        sufix = req.query.width + 'xAuto';
        width = req.query.width;
    } else if(req.query && req.query.height) {
        sufix = 'Autox' + req.query.height;
        height = req.query.height;
    }
    file_path =  base_path + sufix + '.png';

    var exists = fs.existsSync(file_path);

    if (exists) {
        var img = fs.readFileSync(file_path);
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
    } else {
        var exists_base = fs.existsSync(base_path + '.png');
        if (exists_base) {
            if (width || height) {
                var options = {
                    srcPath: base_path + '.png',
                    dstPath: base_path + sufix + '.png'
                };

                if (width) {
                    options.width = width;
                }
                if (height) {
                    options.height = height;
                }

                im.resize(options, function(err, stdout, stderr) {
                    if (err) {
                        throw err;
                    }
                    file_path = base_path + sufix + '.png';

                    var img = fs.readFileSync(file_path);                    
                    res.writeHead(200, {'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                });
            } else {
                file_path = base_path + '.png';

                var img = fs.readFileSync(file_path);
                res.writeHead(200, {'Content-Type': 'image/png' });
                res.end(img, 'binary');
            }
        } else {
            var exists_default = fs.existsSync(__dirname + '/../../../../public/static/logo' + sufix + '.png')
            if (exists_default) {
                file_path = __dirname + '/../../../../public/static/logo' + sufix + '.png';
            } else {
                if (width || height) {
                    var options = {
                        srcPath: __dirname + '/../../../../public/static/logo.png',
                        dstPath: __dirname + '/../../../../public/static/logo' + sufix + '.png',
                    };

                    if (width) {
                        options.width = width;
                    }
                    if (height) {
                        options.height = height;
                    }

                    im.resize(options, function(err, stdout, stderr) {
                        if (err) {
                            throw err;
                        }
                        file_path = __dirname + '/../../../../public/static/logo' + sufix + '.png';

                        var img = fs.readFileSync(file_path);                    
                        res.writeHead(200, {'Content-Type': 'image/png' });
                        res.end(img, 'binary');
                    });
                } else {
                    file_path = __dirname + '/../../../../public/static/logo.png';
                    // @todo Попробовать
                    //res.attachment('path/to/logo.png');

                    var img = fs.readFileSync(file_path);
                    res.writeHead(200, {'Content-Type': 'image/png' });
                    res.end(img, 'binary');
                }
            }
        }
    }
};

return self;