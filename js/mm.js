var video;
VideoJS.DOMReady(function(){
    video = VideoJS.setup("video");
});

$(document).ready(function() {
    $('div#comment-box *').hide();
    $('button#comment-button').click(function() {
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
    /* save comment to database and print it to screen in sorted order */
    video = VideoJS.setup("video");
    var commentTime = video.currentTime();
    var commentTimeStr = secondsToTime(commentTime);
    var commentDOM = $('<li><span class="timestamp"></span> - <span ' +
                       'class="comment"></li>');
    $('span.timestamp', commentDOM).attr('rel', commentTime);
    $('span.timestamp', commentDOM).html(commentTimeStr);
    $('span.timestamp', commentDOM).click(function() {
        /* move video.currentTime() to the timestamp in rel */
        video.currentTime($('span.timestamp', commentDOM).attr('rel'));
    });
    $('span.comment', commentDOM).text($('textarea').val());

    if(!$('ul#master li').get(0)) {
        /* insert the comment into empty ul#master */
        $('ul#master').append(commentDOM);
    } else {
        $.each($('ul#master li'),function(index) {
            /* insert the comment to ul#master in sorted order */
            elem = $($('ul#master li').get(index));
            if ($('.timestamp', elem).attr('rel') > commentTime) {
                $(elem).before(commentDOM);
                return false;
            }
            if (index == $('ul#master li').length - 1) {
                $('ul#master li:last-child').after(commentDOM);
            }
        });
    }
    closeCommentBox();
    // save the comment to the database here
}

function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisorMin = secs % (60 * 60);
    var minutes = Math.floor(divisorMin / 60);
    var divisorSec = divisorMin % 60;
    var seconds = Math.ceil(divisorSec);
    if (seconds < 10) { seconds = "0" + seconds; }
    var str = minutes+":"+seconds;
    if (hours != 0) {
        if (minutes < 10) { str = "0" + str; }
        str = hours + ":" + str;
    }
    return str;
}
