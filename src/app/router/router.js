var p3p  = require('p3p');
var multipart = require('connect-multiparty')();

var self = module.exports = {};

var upload = require('./routes/upload');
var files = require('./routes/files');

self.init = function(app) {
    app.post('/upload/:widget_uid/agent/avatar/:agent_uid', multipart, upload.agent_avatar);
    app.post('/upload/:widget_uid/widget/logo', multipart, upload.widget_logo);

    app.get('/:widget_uid/avatars/:agent_uid/:file_name', files.agent_avatar);
    app.get('/:widget_uid/:file_name', files.widget_logo);
}