package BLL;

import DAL.StudentManagerHybase;
import Model.Students;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class updateServlet extends HttpServlet{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        super.doGet(req, resp);
        doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{

        Students students = new Students();
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        String message = "";

        students.setName(request.getParameter("Name"));
        students.setSex(request.getParameter("Sex"));
        students.setStuno(request.getParameter("Stuno"));
        students.setClas(request.getParameter("Clas"));
        students.setCardId(request.getParameter("CardId"));
        students.setTel(request.getParameter("Tel"));
        students.setEmail(request.getParameter("Email"));
        students.setRegister(request.getParameter("RegFlag"));
        students.setInfo(request.getParameter("Info"));
        students.setId(request.getParameter("Id"));

//        StudentManager studentManager = new StudentManager();
//        message = studentManager.Update(students);

        StudentManagerHybase studentManagerHybase = new StudentManagerHybase();
        studentManagerHybase.Update(students);

        Gson gson=new Gson();

        String info=gson.toJson(message);
        System.out.println(info);

        out.write(info);
    }
}
