var video;
VideoJS.DOMReady(function(){
    video = VideoJS.setup("video");
});

$(document).ready(function() {
    $('div#comment-box *').hide();
    $('button#comment-button').click(function(){
        $('div#comment-box *').show();
        $('button#comment-button').hide();
        video.pause();
        $('textarea').focus();
    });
    $('#comment-save').click(function() {
        saveComment();
    });
    $('#comment-cancel').click(function() {
        $('textarea').val('');   
        $('div#comment-box *').hide();
        $('button#comment-button').show();
    });

});

function saveComment() {
    video = VideoJS.setup("video");
    //escape js here? also guard against XSS
    var comment = $('textarea').val();
    var time = video.currentTime();
    console.log('Saving comment ' + comment);
    console.log('Saving timestamp ' + time);
    //parentLi.html('<span class="timestamp">'+secondsToTime(time)+'</span> - ' + comment);
    //$('.timestamp', parentLi).click(function(){
    //    video.currentTime=time;
    //});
}
function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    if (seconds < 10) { seconds = "0"+seconds; }
    var str = minutes+":"+seconds;
    if (hours != 0) {
        if (minutes < 10) { str = "0"+str; }
        str = hours+":"+str;
    }
    return str;
}

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
