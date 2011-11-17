<%@ page import="edu.tufts.uit.at.spark.video.SparkVideoDBManager" %>
<%
String method = request.getParameter("method");

if (method.equals("getComments")) {
out.println("Get comments called");
}

if (method.equals("saveComment")) {
Integer video_id = Integer.parseInt(request.getParameter("video_id"));
String comment = request.getParameter("comment");
String timestamp = request.getParameter("timestamp");
SparkVideoDBManager manager = new SparkVideoDBManager();
manager.addAnnotation(video_id, comment, timestamp, "akhaku01");

}
%>
