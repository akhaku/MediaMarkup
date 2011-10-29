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
        closeCommentBox();
    });

});

function closeCommentBox() {
    $('textarea').val('');   
    $('div#comment-box *').hide();
    $('button#comment-button').show();
}

function saveComment() {
    video = VideoJS.setup("video");
    //escape js here? also guard against XSS
    var comment = $('textarea').val();
    var time = video.currentTime();
    var timeStr = secondsToTime(time);
    var commentLi = '<li><span class="timestamp" rel="'+time+'">'
        +timeStr+'</span> - ' + comment+'</li>';
    // find place for the li element to go
    if(!$('ul#master li').get(0)) {
        $('ul#master').html(commentLi);
    } else {
        $.each($('ul#master li'),function(index) {
            elem = $($('ul#master li').get(index));
            if ($('.timestamp', elem).attr('rel') > time) {
                $(elem).before(commentLi);
                return false;
            }
            if (index == $('ul#master li').length-1) {
                $('ul#master li:last-child').after(commentLi);
            }
        });
    }
    closeCommentBox();
}
function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    if (seconds < 10) { seconds = "0"+seconds; }
    var str = minutes+":"+seconds;
    if (hours != 0) {
        if (minutes < 10) { str = "0"+str; }
        str = hours+":"+str;
    }
    return str;
}
