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
import java.util.ArrayList;

public class queryServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//    super.doGet(req, resp);
        doPost(req,resp);
    }

        @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{

         response.setContentType("application/json;charset=utf-8");
         PrintWriter out = response.getWriter();
         ArrayList<Students> arrayList ;
         String name = request.getParameter("name");
         String clas = request.getParameter("clas");
         String stuno = request.getParameter("stuno");
         String jing = request.getParameter("jing");

//         StudentManager studentManager = new StudentManager();
//         String strCondition="";
//         String strMatch1 = ("true".equals(jing)?"='":" like '%");
//         String strEndMatch = ("true".equals(jing)?"'":"%'");
//
//         if (null != name && !("".equals(name))){
//             strCondition += "name" + strMatch1 + name + strEndMatch;
//         }
//         if (null != clas && !("".equals(clas))){
//             strCondition += "clas" + strMatch1 + clas + strEndMatch;
//         }
//         if (null != stuno && !("".equals(stuno))){
//             strCondition += "stuno" + strMatch1 + stuno + strEndMatch;
//         }


//         arrayList = studentManager.Query(strCondition);


            StudentManagerHybase studentManagerHybase = new StudentManagerHybase();
            arrayList = studentManagerHybase.Query("");

         Gson gson = new Gson();

         String info=gson.toJson(arrayList);
         out.write(info);

    }
}
