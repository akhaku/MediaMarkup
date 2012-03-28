<%@ page import="java.util.Vector,java.util.*,java.util.Hashtable,org.json.simple.JSONObject,org.json.simple.JSONArray,edu.tufts.uit.at.spark.video.SparkVideoDBManager,edu.tufts.uit.at.spark.video.SparkVideoDBManager.CommentFields" %>
<%
String method = request.getParameter("method");

if (method.equals("getComments")) {
/* TODO: escape here */
    SparkVideoDBManager manager = new SparkVideoDBManager();
    Integer videoId = Integer.parseInt(request.getParameter("videoId"));
    /* TODO make sure user has permission to view that video */
    Vector<Integer> commentIds = manager.getAnnotations(videoId);
    JSONArray allComments = new JSONArray();
    for (Integer id : commentIds) {
        Hashtable<Enum, Object> comment = manager.getAnnotation(id);
        JSONObject commentJSON = new JSONObject();
        commentJSON.put("id",comment.get(CommentFields.Id));
        commentJSON.put("timestamp",comment.get(CommentFields.Timestamp));
        commentJSON.put("comment",comment.get(CommentFields.Text));
        allComments.add(commentJSON);
    }
    out.println(allComments);
}

if (method.equals("saveComment")) {
    Integer video_id = Integer.parseInt(request.getParameter("video_id"));
    /* TODO: cleanup, escaping etc. Make sure session user has video editing
     * permission */
    String comment = request.getParameter("comment");
    String timestamp = request.getParameter("timestamp");
    SparkVideoDBManager manager = new SparkVideoDBManager();
    /* TODO get user id from session */
    Integer comment_id = manager.addAnnotation(video_id, comment, timestamp, "akhaku01");
    out.println(comment_id);
}

if (method.equals("saveReply")) {
    Integer comment_id = Integer.parseInt(request.getParameter("comment_id"));
    String reply = request.getParameter("reply");
    /* TODO: cleanup, escaping etc. Make sure session user has permission for
     * the VIDEO of the comment */
    String user = "akhaku01"; /* TODO get user from session */
    SparkVideoDBManager manager = new SparkVideoDBManager();
    manager.addReply(comment_id, reply, user);
}
%>
