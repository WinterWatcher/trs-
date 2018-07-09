package DAL;

import Model.Students;
import com.trs.hybase.client.TRSDatabaseColumn;
import com.trs.hybase.client.TRSRecord;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class StudentManagerHybase {


    public static void main (String arg[]){
        StudentManagerHybase studentManagerHybase = new StudentManagerHybase();
        ArrayList arrayList = studentManagerHybase.Query("");
        System.out.println(arrayList);
    }

    public void CreateDB(){
        HybaseDB hybaseDB = new HybaseDB();
        Map<String,Integer> columns = new HashMap<>();
        columns.put("Id",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Name",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Sex",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Stuno",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Clas",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("CardId",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Tel",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Email",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Register",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("Info",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("InsertTime",TRSDatabaseColumn.TYPE_CHAR);
        columns.put("UpdateTime",TRSDatabaseColumn.TYPE_CHAR);

        String DefColunm = "Id";
        hybaseDB.createDB("students",columns,DefColunm);
    }

    public ArrayList<Students> Query(String condition){

        ArrayList<Students> arrayList = new ArrayList<>();
        ArrayList<TRSRecord> arrayList1 ;
        HybaseDB hybaseDB = new HybaseDB();
        try {
            arrayList1 = hybaseDB.Query("students",condition,0,100,null);
            for (int i=1;i<arrayList1.size();i++){
                TRSRecord trsRecord = arrayList1.get(i);
                Students students = new Students();
                students.setId(trsRecord.getString("Id"));
                students.setName(trsRecord.getString("Name"));
                students.setSex(trsRecord.getString("Sex"));
                students.setStuno(trsRecord.getString("Stuno"));
                students.setClas(trsRecord.getString("Clas"));
                students.setCardId(trsRecord.getString("CardId"));
                students.setTel(trsRecord.getString("Tel"));
                students.setEmail(trsRecord.getString("Email"));
                students.setRegister(trsRecord.getString("Register"));
                students.setInfo(trsRecord.getString("Info"));
                arrayList.add(students);
            }

        }catch (Exception e){
            e.printStackTrace();
        }

        return arrayList;
    }

    public String Update(Students students){

        Date day=new Date();
        HybaseDB hybaseDB = new HybaseDB();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String updateTime = df.format(day);
        System.out.println(updateTime);

        Map<String,String> map = new HashMap<>();
        String condition = "Id:"+students.getId();
        map.put("Id",students.getId());
        map.put("Name",students.getName());
        map.put("Sex",students.getSex());
        map.put("Stuno",students.getStuno());
        map.put("Clas",students.getClas());
        map.put("CardId",students.getCardId());
        map.put("Tel",students.getTel());
        map.put("Email",students.getEmail());
        map.put("Register",students.getRegister());
        map.put("Info",students.getInfo());
        map.put("UpdateTime",updateTime);

        try {
            hybaseDB.Update("students",map,condition);
        }catch ( Exception e){
            e.printStackTrace();
        }finally {
            DBUtil.DBclose();
        }
            return "修改成功！";

    }

    public String Add(Students students){

        Date day=new Date();
        HybaseDB hybaseDB = new HybaseDB();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String inserTime = df.format(day);
        System.out.println(inserTime);

        Map<String,String> map = new HashMap<>();
        map.put("Id",students.getId());
        map.put("Name",students.getName());
        map.put("Sex",students.getSex());
        map.put("Stuno",students.getStuno());
        map.put("Clas",students.getClas());
        map.put("CardId",students.getCardId());
        map.put("Tel",students.getTel());
        map.put("Email",students.getEmail());
        map.put("Register",students.getRegister());
        map.put("Info",students.getInfo());
        map.put("InsertTime",inserTime);

        try {
            hybaseDB.Add("students",map);
        }catch ( Exception e){
            e.printStackTrace();
        }
        finally {
            DBUtil.DBclose();
        }
            return "新增成功！";

    }

    public String Delete(String id){

        try {
            HybaseDB hybaseDB = new HybaseDB();
            hybaseDB.Delete("students","Id:"+id);
        }catch ( Exception e){
            e.printStackTrace();
        }finally {
            DBUtil.DBclose();
        }
            return "删除成功！";
    }
}
