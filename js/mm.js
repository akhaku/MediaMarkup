var video;
VideoJS.DOMReady(function(){
    video = VideoJS.setup("video");
});

$(document).ready(function() {
    $('div#comment-box *').hide();
    $('button#comment-button').click(function() {
        $('div#comment-box *').show();
        $('button#comment-button').hide();
        $('button#write-button').hide();
        video.pause();
        $('textarea').focus();
    });
    $('#comment-save').click(function() {
        mm_insertComment(video,$('textarea#comment-text').val());
        closeCommentBox();
    });
    $('#comment-cancel').click(function() {
        closeCommentBox();
    });
    $('button#write-button').click(function() {
        mm_writeThread_JSON($('ul#master'),'test.json')
    });
    $.post('mmutil.jsp', {method:'getComments',
        video_id:'205',
    },function(data){
        showComments(data);
    });
});

function showComments(data) {
    console.log(data);
    var comments = $.parseJSON(data);
    /* TODO: un-escape when putting it in */
    $.each(comments,function(i,v){
        timeArray = v['timestamp'].split(':');
        time = parseInt(timeArray[2]) + parseInt(timeArray[1])*60 + parseInt(timeArray[0])*3600;
    putInComment(time,v['comment']);
    });
}

function putInComment(commentTime, comment) {
    var commentTimeStr = secondsToTime(commentTime);
    var commentDOM = $(
        '<li class="comment-li">' + 
            '<span class="timestamp"></span> - ' +
            '<span class="comment"></span>' +
            '<div class="comment-reply-button">Reply</div>' +
            '<ul class="reply-thread"></ul>' +
        '</li>');
    $('span.timestamp', commentDOM).closest('li').attr('rel', commentTime);
    $('span.timestamp', commentDOM).html(commentTimeStr);
    $('span.timestamp', commentDOM).click(function() {
        /* move video.currentTime() to the timestamp in rel */
        video.currentTime($('span.timestamp', commentDOM).closest('li').attr('rel'));
    });
    $('span.comment', commentDOM).text(comment);
    /* insert the commentDOM into the ul#master in sorted order */
    if(!$('ul#master li.comment-li').get(0)) {
        /* insert the comment into empty ul#master */
        $('ul#master').append(commentDOM);
    } else {
        $.each($('ul#master li.comment-li'),function(index) {
            /* insert the comment into nonempty ul#master */
            elem = $($('ul#master li.comment-li').get(index));
            if (elem.attr('rel') > commentTime) {
                $(elem).before(commentDOM);
                return false;
            }
            if (index == $('ul#master li.comment-li').length - 1) {
                $('ul#master li.comment-li:last-child').after(commentDOM);
            }
        });
    }
    $('div.comment-reply-button', commentDOM).click(function() {
        mm_insertReply(commentDOM);
        $('textarea', commentDOM).focus();
    });
}

function closeCommentBox() {
    $('textarea#comment-text').val('');   
    $('div#comment-box *').hide();
    $('button#comment-button').show();
    $('button#write-button').show();
}

function mm_loadThread_JSON(url) {
    /* loads a thread from a database, accessed at the url via ajax */
    /* parses the thread into a jQuery object and inserts into the DOM */;
}

function mm_writeThread_JSON(thread, postURL) {
    /* parses a thread (jQuery object) into either JSON or XML */
    /* saves the parsed thread to database, accessed at url via ajax */
    var threadJSON = [];
    $.each($('li.comment-li', thread),function(i) {
        threadJSON[i] = {
            time : $(this).attr('rel'),
            timestring : $('span.timestamp', this).text(),
            comment : $('span.comment', this).text(),
            replies : []
        };
        if( !$('ul.reply-thread', this).get(0) ) {
            $.each($('li.reply-li', this),function(j) {
                threadJSON[i].replies[j] = {
                    'reply' : $('span.reply-text', this).text()
                };
            });
        }
    });
}

function mm_insertComment(video, comment) {
    /* thread - jQuery object, video - VideoJS object, comment - string */
    /* parse the comment text into commentDOM, suitable for insertion */
    var commentTime = video.currentTime();
    var commentTimeStr = secondsToTime(commentTime);
    putInComment(commentTime, comment);
    $.post('mmutil.jsp', {method:'saveComment',
        video_id:'205',
        comment:'comment',
        timestamp: commentTimeStr
    },function(){alert('posted')});
   
}

function mm_insertReply(commentThread) {
    /* comment - comment li jQuery object to thread the reply onto */
    ulElem = $('ul.reply-thread', commentThread)
        var replyDOM = $('<li class="reply-li"><div class="reply-form">' +
                '<textarea></textarea><br/><button class="save">Save</button>' +
                '<button class="cancel">Cancel</button></div>'+
                '<span class="reply-text"></span></li>');
    $('textarea', replyDOM).focus();
    if (!$('li.reply-li', ulElem).get(0)) {
        ulElem.append(replyDOM);
    } else {
        $('li.reply-li:last-child', ulElem).after(replyDOM);
    }
    $('button.cancel', replyDOM).click(function() {
        $(replyDOM).remove();
    });
    $('button.save',replyDOM).click(function() {
        $('.reply-text', replyDOM).text($('textarea', replyDOM).val());
        $('.reply-form', replyDOM).remove();
    });
}

function mm_saveComment(comment, url) {
    /* parses a comment (jQuery object) into either JSON or XML */
    /* saves the parsed comment to database, accessed at url via ajax */
}

function mm_saveReply(comment, reply, url) {
    /* parses a reply (jQuery object) into either JSON or XML */
    /* saves that parsed reply to the database, accessed at url via ajax */
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
