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
        saveComment(video);
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

function saveComment(video) {
    /* save comment to database and print it to screen in sorted order */
    var commentTime = video.currentTime();
    var commentTimeStr = secondsToTime(commentTime);
    var commentDOM = $('<li class="comment-li">' + 
            '<span class="timestamp"></span> - <span ' +
            'class="comment"></span>'+
            '<div class="comment-reply-button">Reply</div>'+
            '<ul class="reply-thread"></ul></li>');

    $('span.timestamp', commentDOM).closest('li').attr('rel', commentTime);
    $('span.timestamp', commentDOM).html(commentTimeStr);
    $('span.timestamp', commentDOM).click(function() {
        /* move video.currentTime() to the timestamp in rel */
        video.currentTime($('span.timestamp', commentDOM).attr('rel'));
    });
    $('span.comment', commentDOM).text($('textarea').val());
    $('div.comment-reply-button', commentDOM).click(function(){
        replyComment(commentTime);
    });

    if(!$('ul#master li.comment-li').get(0)) {
        /* insert the comment into empty ul#master */
        $('ul#master').append(commentDOM);
    } else {
        $.each($('ul#master li.comment-li'),function(index) {
            /* insert the comment to ul#master in sorted order */
            elem = $($('ul#master li.comment-li').get(index));
            if (elem.attr('rel') > commentTime) {
                $(elem).before(commentDOM);
                return false;
            }
            if (index == $('ul#master li.comment-li').length - 1) {
                $('ul#master li:last-child').after(commentDOM);
            }
        });
    }
    closeCommentBox();
    /*  sample database save, will change when we have the database dump
        $.post('databaseConnect.jsp", { timestamp: $('span.timestamp', commentDOM).attr('rel'),
                            comment: $('span.comment', commentDOM).html()
        });

        OR

        $.ajax({
        type: "POST",
        url: "databaseConnect.jsp",
        data: "timestamp=" + $('span.timestamp', commentDOM).attr('rel') +
                "&comment=" + commentText,
        failure: function() {
            alert('Database write failed');
        }
    });
*/
}

function replyComment(commentTime) {
    var liElem = $('ul#master li[rel="'+commentTime+'"]');
    var replyText = "this is a reply"; // TODO: this is harcoded for now
    var replyDOM = $('<li class="reply-li">'+
            '<span class="reply-text"></span></li>');
    replyDOM.text(replyText);
    if (!$('ul.reply-thread li', liElem).get(0)) {
        liElem.append(replyDOM);
    } else {
        $('ul.reply li:last-child').after(replyDOM);
    }
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
