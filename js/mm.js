function getMin() {
    /* Get video.currentTime as minutes */
    var min = Math.floor(video.currentTime / 60);
    if( min < 10 ) min = "0" + min;
    return min;
}

function getSec() {
    /* Get video.currentTime as seconds (remainder) */
    var sec = Math.floor(video.currentTime % 60);
    if( sec < 10 ) sec = "0" + sec;
    return sec;
}

function togglePlay() {
    /* Play video and toggle button to Pause */
    video.play();
    $('button#toggle').html("Pause");
};

function togglePause() {
    /* Pause video and toggle button to Play */
    video.pause();
    $('button#toggle').html("Play");
};

$(document).ready(function() {

    $('video').bind('timeupdate',function() {
        /* Update the video time display */
        $('span#video-time').html(getMin() + ":" + getSec());
    });


    $('#toggle').click(function() {
        /* Toggle video between play and pause */
        if( $('button#toggle').html() == 'Play' ) togglePlay();
        else togglePause();
    });

    $('#comment').click(function() {
        /* Open the comment entry dialog, pause the video */
        if( $('button#toggle').html() == 'Pause' ) togglePause();
        if( $('textarea').get(0) ) return;
        $('div#controls').append(
            '<span id="comment-add">' +
                '<textarea id="comment-text"></textarea>' +
                '<button id="comment-save">Save</button>' +
                '<button id="comment-cancel">Cancel</button>' +
            '</span>'
        );
        $('textarea').focus();
        $('button#comment-save').click(function() {
            /* Display the comment and save it to the database */
            $('ul#master').append(
                '<li>' +
                    '<span class="timestamp" rel="' + video.currentTime + '">' +
                        getMin() + ':' + getSec() +
                    '</span> - ' + $('#comment-text').val() +
                '</li>'
            );
            $('span.timestamp').click(function() {
                /* Jump the video to the timestamp */
                if( $('button#toggle').html() == 'Pause' ) togglePause();
                video.currentTime = $(this).attr('rel');
            });
            $('span#comment-add').remove();
        });
        $('button#comment-cancel').click(function() {
            /* Cancel the comment */
            $('span#comment-add').remove();
        });
    });


});
