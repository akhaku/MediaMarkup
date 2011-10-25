$(document).ready(function() {
    VideoJS.DOMReady(function(){
        var video = VideoJS.setup("video");
    });
});

$(document).ready(function() {
    $('button#comment').click(function(){
        if($('textarea').get(0)) {
            return;
        }
        video.pause();
        var time = video.currentTime;
        $('ul#master').append('<li><textarea rel="'+time+'"></textarea>'+
            '<button id="comment-save">Save</button>'+
            '<button id="comment-cancel">Cancel</button></li>');
        $('textarea').focus();
        $('#comment-save').click(function(){
            saveComment(this);
        });
        var parentLi = $('textarea').closest('li');
        $('#comment-cancel').click(function(){
            parentLi.remove();
        });
    });

    function saveComment(e) {
        //escape js here? also guard against XSS
        var parentLi = $(e).closest('li');
        var comment = $('textarea', parentLi).val();
        parentLi.html(comment);
    }
});
/*$(document).ready(function() {

  $("video").bind("timeupdate",function() {
  var min = Math.floor(video.currentTime/60);
  var sec = Math.floor(video.currentTime%60);
  if( sec < 10 ) sec = "0" + sec;
  $("#timecode").html(min+":"+sec);
  });

  function smart_play() {                 // A smart play function ===========
  video.play();
  $("#toggle").html("Pause");
  };

  function smart_pause() {                // A smart pause function ==========
  video.pause();
  $("#toggle").html("Play");
  };

  $("#toggle").click(function() {         // Play/Pause Toggle ===============
  if( $("#toggle").html() == "Play" ) smart_play();
  else smart_pause();
  });

  $("#comment").click(function() {        // Comment Button ==================
  if( $("#toggle").html() == "Pause" ) smart_pause();
// Code to insert comment live goes here
});

});*/
