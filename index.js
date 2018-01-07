
var formidable = require('formidable');
var googleauth = require('google-auth-cli');
var google = require('googleapis');
var express = require('express');
var Youtube = require("youtube-api");
var fs = require('fs');
var opn = require('opn');

var app = express();

var  oauth = Youtube.authenticate({
    type: "oauth",
    client_id: "1533366752393-u1h8fqi8fc3ohj9topnjircod11oi472.apps.googleusercontent.com",
    client_secret: "pdhsNwZKXSgU09qTQOdJK_AV",
    redirect_url: "http://localhost:5000/oauth2callback"
});

var url = oauth.generateAuthUrl({
    access_type: "offline",
    approval_prompt: "force",
    scope: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtubepartner']
});


app.post('/upload', function(request, response) {
  if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
      console.log("file path: ", files.video.path);
      process.env.videoPath = files.video.path;
      console.log(url);
      opn(url);
      response.json({fields: fields, files: files,  msg: "your video uploading starts"});
    });
    return;
  }
});


app.get("/oauth2callback", function(request, response) {
    oauth.getToken(request.query.code, function(err, tokens) {
    console.log(tokens);

    if (err) {
            response.json(err);
        }

        console.log("Got the tokens.");
        oauth.setCredentials(tokens);

        var req = Youtube.videos.insert({
            resource: {
                // Video title and description
                snippet: {
                    title: "Testing YoutTube API NodeJS module",
                    description: "Test video upload via YouTube API"
                },
                // I don't want to spam my subscribers
                status: {
                    privacyStatus: "public"
                }
            },
            // This is for the callback function
            part: "snippet,status",

            // Create the readable stream to upload the video
            media: {
                body: fs.createReadStream(process.env.videoPath)
            }
        }, function(err, data) {
            console.log("Done.");
            console.log("error", err);
            console.log(data);
            response.json({"msg": "your video uploaded successfully"});
            process.exit();
        });

        setInterval(function () {
            console.log(req.req.connection._bytesDispatched + " bytes uploaded.");
        }, 250);

  });
});

app.listen(5000, function(request, response) {
  console.log("running at 5000");
});
