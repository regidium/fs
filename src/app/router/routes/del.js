var fs     = require('fs');
var path   = require('path');
var _      = require('underscore');

var self = module.exports = {};

self.agent_avatar = function (req, res) {
    var path = __dirname + '/../../../../public/files/' + req.params.widget_uid + '/avatars/' + req.params.agent_uid;

    deleteDirRecursiveSync(path);
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
    var path = __dirname + '/../../../../public/files/' + req.params.widget_uid;
    deleteFileByMaskSync(path, /logo?\w+\.png/i);

    // @todo убрать если удаляется в deleteFileByMaskSync
    fs.exists(file_path + '/logo.png', function (exists) {
        if (exists) {
            fs.unlink(file_path, function() {
                return res.send({ success: true });
            });
        } else {
            return res.send({ success: true });
        }
    });
};

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