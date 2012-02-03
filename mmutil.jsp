<%@ page import="java.util.Vector,java.util.*,java.util.Hashtable,java.util.Iterator,org.json.simple.JSONObject,org.json.simple.JSONArray,edu.tufts.uit.at.spark.video.SparkVideoDBManager" %>
<%
String method = request.getParameter("method");

if (method.equals("getComments")) {
/* TODO: escape here */
SparkVideoDBManager manager = new SparkVideoDBManager();
Integer videoId = 205; /* TODO put in actual id */
Vector<Integer> commentIds = manager.getAnnotations(videoId);
for (Integer id : commentIds) {
    Hashtable<Enum, Object> comment = manager.getAnnotation(id);
    out.println(comment.keys().toString());
    out.println(comment.toString());
    out.println(comment.get("Text"));
    out.println(comment.getClass().getName());
    out.println(comment.get("Author"));
for (Enum= comment.keys(); e.hasMoreElements();)
   {
       String str = (String) hash.get( e.nextElement() );
       out.println (str);
   }
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
