<!DOCTYPE html>
<html>
    <head>
        <title>MediaMarkup 2</title>
        <link rel="stylesheet" type="text/css" href="css/reset.css" />
        <link rel="stylesheet" type="text/css" href="css/rules.css" />
        <link rel="stylesheet" type="text/css" href="css/video-js-2.0.2.css" />
        <script
            src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"
            type="text/javascript"></script>
    </head>
    <body>
        <h1>MediaMarkup 2 Alpha</h1>
        <div id="container">
            <div class="video-js-box">
                <video id="video" class="video-js" width="500" autobuffer
                preload="auto">
                <!-- Video source DOM to be modified via JSP => MySQL -->
                <source id="mp4_src" src="bbb.mp4" type="video/mp4" />
                <source id="ogg_src" src="bbb.ogg" type="video/ogg" />
                <source id="webm_src" src="bbb.webm" type="video/webm" />
                </video>
            </div>
            <div id="comments">
                <ul class="thread" id="master">
                <!-- Nested lists with class="thread" and id="timestamp" -->
                <!-- Loaded via JSP => MySQL, new inserts via mm.js -->
                </ul>
            </div>
        </div>
        <div id="controls">
            <button id="comment-button">Comment</button>
            <div id="comment-box"> <!-- Popup comment box -->
                <button id="comment-save">Save</button>
                <button id="comment-cancel">Cancel</button><br />
                <textarea id="comment-text"></textarea>
            </div>
        </div>
        <script src="js/video-js-2.0.2.js" type="text/javascript" ></script>
        <script src="js/mm.js" type="text/javascript"></script>
    </body>
</html>
