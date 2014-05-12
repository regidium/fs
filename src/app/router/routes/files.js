var fs = require('fs');

var self = module.exports = {};

self.agent_avatar = function (req, res) {
    var file_path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/avatars/' + req.params.agent_uid + '/' + req.params.file_name;

    fs.exists(file_path, function (exists) {
        if (exists) {
            var img = fs.readFileSync(file_path);
        } else {
            var img = fs.readFileSync(__dirname + '/../../../../public/static/avatar.png');
        }

        // @todo Попробовать
        //res.attachment('path/to/logo.png');

        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
    });
};

self.widget_logo = function (req, res) {
    var file_path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/' + req.params.file_name;

    fs.exists(file_path, function (exists) {
        if (exists) {
            var img = fs.readFileSync(file_path);
        } else {
            var img = fs.readFileSync(__dirname + '/../../../../public/static/logo.png');
        }

        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
    });
};

return self;