import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.JSONArray;
import org.json.JSONObject;

public class VideoServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action.equals("read")) {
            // Read and send video data as JSON
            try {
                JSONArray videos = new JSONArray();
                Class.forName("com.mysql.cj.jdbc.Driver");
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/VideoDB", "root", "password");
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM videos");

                while (rs.next()) {
                    JSONObject video = new JSONObject();
                    video.put("id", rs.getInt("id"));
                    video.put("title", rs.getString("title"));
                    video.put("url", rs.getString("url"));
                    videos.put(video);
                }

                response.setContentType("application/json");
                response.getWriter().print(videos.toString());

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    // Handle POST, PUT, DELETE similarly for Create, Update, Delete operations
}
