package DAL;

import Model.Students;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class StudentManager {

    public static void main (String arg[]){
        StudentManager studentManager = new StudentManager();
        studentManager.Query("");
    }

    public ArrayList<Students> Query(String condition){

        ArrayList<Students> arrayList = new ArrayList<>();
        ResultSet resultSet = null;
        String sql = "select * from students ";
        Object parm = "";
        if (!"".equals(condition)){parm = " where "+ condition;}

        try {
            resultSet = DBUtil.connQuery(sql+parm+" order by id ");
            while (resultSet.next()){
                Students students = new Students();
                Map<String,String> map = new HashMap<>();
                students.setId(resultSet.getString("id"));
                students.setName(resultSet.getString("name"));
                students.setSex(resultSet.getString("sex"));
                students.setStuno(resultSet.getString("stuno"));
                students.setClas(resultSet.getString("clas"));
                students.setCardId(resultSet.getString("cardId"));
                students.setTel(resultSet.getString("teleNumber"));
                students.setEmail(resultSet.getString("email"));
                students.setRegister(resultSet.getString("register"));
                students.setInfo(resultSet.getString("remark"));


                Map<String,String> map = new HashMap<>();
                map.put("Name",resultSet.getString("name"));
                map.put("Sex",resultSet.getString("sex"));
                map.put("Stuno",resultSet.getString("stuno"));
                map.put("Clas",resultSet.getString("clas"));
                map.put("CardId",resultSet.getString("cardId"));
                map.put("Tel",resultSet.getString("teleNumber"));
                map.put("Email",resultSet.getString("email"));
                map.put("Register",resultSet.getString("register"));
                map.put("Info",resultSet.getString("remark"));
                map.put("InsertTime",resultSet.getString("creattime"));
                map.put("UpdateTime",resultSet.getString("updatetime"));

                HybaseDB hybaseDB = new HybaseDB();
                hybaseDB.Add("Students",map);


                arrayList.add(students);
            }

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            DBUtil.DBclose();
        }

        return arrayList;
    }

    public String Update(Students students){

        Date day=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String updateTime = df.format(day);
        System.out.println(updateTime);
        String sql = "update students set name = ? , sex = ? , stuno = ? ,clas = ? , cardId = ? , teleNumber = ? , email = ? , register = ? , remark = ? , updatetime = ? where id = ? ";
        Object[]  parm = {students.getName(),students.getSex(),students.getStuno(),students.getClas(),students.getCardId(),students.getTel(),students.getEmail(),students.getRegister(),students.getInfo(),updateTime,students.getId()};
        int result = 0;

        try {
            result = DBUtil.connUpdate(sql , parm);
        }catch ( Exception e){
            e.printStackTrace();
        }finally {
            DBUtil.DBclose();
        }
        if (result>0){
            return "修改成功！";
        }else {
            return "修改失败！";
        }

    }

    public String Add(Students students){

        Date day=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String inserTime = df.format(day);
        System.out.println(inserTime);
        String sql = "insert into students values('',?,?,?,?,?,?,?,?,?,?,'') ";
        Object[]  parm = {students.getName(),students.getSex(),students.getStuno(),students.getClas(),students.getCardId(),students.getTel(),students.getEmail(),students.getRegister(),students.getInfo(),inserTime };
        int result = 0;

        try {
            result = DBUtil.connUpdate(sql , parm);
        }catch ( Exception e){
            e.printStackTrace();
        }
        finally {
            DBUtil.DBclose();
        }
        if (result>0){
            return "新增成功！";
        }else {
            return "新增失败！";
        }

    }

    public String Delete(String id){

        String sql = "delete from students where id = ? ";
        Object parm = id;
        int result = 0;

        try {
            result = DBUtil.connUpdate(sql , parm);
        }catch ( Exception e){
            e.printStackTrace();
        }finally {
            DBUtil.DBclose();
        }
        if (result>0){
            return "删除成功！";
        }else {
            return "删除失败！";
        }
    }

}



