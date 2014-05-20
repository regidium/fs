var fs     = require('fs');
var path   = require('path');
var _      = require('underscore');

var self = module.exports = {};

self.agent_avatar = function (req, res) {
    var path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/avatars/' + req.params.agent_uid;

    deleteRecursiveSync(path);
    fs.exists(path, function (exists) {
        if (exists) {
            fs.unlink(path, function() {
                return res.send({ success: true });
            });
        } else {
            return res.send({ success: true });
        }
    });
};

self.widget_logo = function (req, res) {
    var path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/logo.png';

    fs.exists(file_path, function (exists) {
        if (exists) {
            fs.unlink(file_path, function() {
                return res.send({ success: true });
            });
        } else {
            return res.send({ success: true });
        }
    });
};

return self;