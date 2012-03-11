<%@ page import="java.util.Vector,java.util.*,java.util.Hashtable,org.json.simple.JSONObject,org.json.simple.JSONArray,edu.tufts.uit.at.spark.video.SparkVideoDBManager" %>
<%
String method = request.getParameter("method");

if (method.equals("getComments")) {
/* TODO: escape here */
    SparkVideoDBManager manager = new SparkVideoDBManager();
    Integer videoId = 205; /* TODO put in actual id */
    Vector<Integer> commentIds = manager.getAnnotations(videoId);
    JSONArray allComments = new JSONArray();
    for (Integer id : commentIds) {
        Hashtable<Enum, Object> comment = manager.getAnnotation(id);
        JSONObject commentJSON = new JSONObject();
        commentJSON.put("timestamp",comment.get("Timestamp"));
        commentJSON.put("comment",comment.get("Text"));
        out.println(comment.toString());
    }
}

if (method.equals("saveComment")) {
Integer video_id = Integer.parseInt(request.getParameter("video_id"));
/* TODO: cleanup, escaping etc. Make sure session user has video editing
 * permission */
String comment = request.getParameter("comment");
String timestamp = request.getParameter("timestamp");
SparkVideoDBManager manager = new SparkVideoDBManager();
manager.addAnnotation(video_id, comment, timestamp, "akhaku01");

}
%>