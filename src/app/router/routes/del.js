var fs = require('fs');

var self = module.exports = {};

self.agent_avatar = function (req, res) {
    var file_path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/avatars/' + req.params.agent_uid + '/avatar.png';

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

self.widget_logo = function (req, res) {
    var file_path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/logo.png';

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