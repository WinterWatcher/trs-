package BLL;

import DAL.StudentManagerHybase;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class deleteServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
        doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{

        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        String message = "";
        String id = request.getParameter("Id");
        System.out.println(id);

//        StudentManager studentManager = new StudentManager();
//        message = studentManager.Delete(id);

        StudentManagerHybase studentManagerHybase = new StudentManagerHybase();
        studentManagerHybase.Delete(id);

        Gson gson=new Gson();

        String info=gson.toJson(message);
        System.out.println(info);

    }
}
