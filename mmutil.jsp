<%@ page import="org.json.simple.JSONObject,org.json.simple.JSONArray,edu.tufts.uit.at.spark.video.SparkVideoDBManager" %>
<%
String method = request.getParameter("method");

if (method.equals("getComments")) {
JSONObject comment = new JSONObject();
/* TODO: escape here */
comment.put("comment","this is a comment");
comment.put("timestamp","00:00:22");
JSONArray comments = new JSONArray();
comments.add(comment);
out.println(comments.toString());
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
