package DAL;

import com.trs.hybase.client.*;
import com.trs.hybase.client.params.SearchParams;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HybaseDB {

    private static final String serverList = "http://127.0.0.1:5555";
    private static final String userID = "admin";
    private static final String password = "trsadmin";
    private TRSConnection trsConnection ;

//    连接
    private void ConnHybase(){
        if (trsConnection == null){
            trsConnection = new TRSConnection(serverList,userID,password,null);
        }
    }


//    断开连接
    private void CloseHybase(){
        if (trsConnection != null){
            trsConnection.close();
        }
    }



//    删除数据库
    public void deleteDB(String daName) throws TRSException {
        trsConnection.deleteDatabase(daName);
    }



//    创建数据库
    public void createDB(String dbName , Map<String,Integer> columns , String UniqColunm){
        ConnHybase();
        TRSDatabase db = new TRSDatabase(dbName,TRSDatabase.MODE_SINGLE, TRSDatabase.TYPE_DATABASE);
        //添加字段
        columns.forEach((k,v)->{
            try {
                db.addColumn(new TRSDatabaseColumn(k,v));
            }catch (TRSException e){
                System.out.println(e.getErrorCode());
            }
        });
    //设置缺省检索字段
        if (UniqColunm != null && !"".equals(UniqColunm)){
            db.setUniqueColumn(UniqColunm);
        }
        try {
            trsConnection.createDatabase(db);
        }catch (TRSException e){
            System.out.println(e.getErrorCode()+e.getErrorString());
        }finally {
//            CloseHybase();
        }
    }


//    查询
    public ArrayList<TRSRecord> Query(String database , String condition , long start , long recordNum , ArrayList<String> resultColumn) {
        ConnHybase();
        ArrayList<TRSRecord> arrayList = new ArrayList<>();
        SearchParams param = new SearchParams();
        param.setSortMethod("RELEVANCE");//  ？？相关度排序不知道是啥 importance！！！！！！RELEVANCE :相关度按照逆序排列
        if (resultColumn != null){
            String reColStr = "";
            for (String i : resultColumn){
                reColStr += i + ";";
            }
            reColStr.substring(0,resultColumn.size()-1);
            param.setReadColumns(reColStr);
        }
        TRSResultSet resultSet=null;
        try {
            resultSet = trsConnection.executeSelect(database, condition, start, recordNum, param);
            if (resultSet!=null){
                for (int i = 0; i < resultSet.size(); i++) {
                    resultSet.moveNext();
                    TRSRecord re = resultSet.get();
                    arrayList.add(re);
                }
            }
        } catch (TRSException e) {
            System.out.println("ErrorCode:" + e.getErrorCode());
            System.out.println("ErrorString:" + e.getErrorString());
        } finally {
            CloseHybase();
        }
        return arrayList;
    }


//    新增
    public void Add(String database, Map<String,String> records) throws TRSException {
        ConnHybase();
        List<TRSInputRecord> recordList = new ArrayList<>();
        TRSInputRecord record = new TRSInputRecord();
        records.forEach((k,v)->{
            try {
                record.addColumn(k,v);
            }catch (TRSException e){
                System.out.println(e.getErrorString());
            }
        });
        recordList.add(record);
        trsConnection.executeInsert(database, recordList);
        trsConnection.commitDatabase(database, null);
        CloseHybase();
    }


//    修改
    public void  Update(String database, Map<String,String> records,String condition)throws TRSException{
        ConnHybase();
        SearchParams param = new SearchParams();
        List<TRSInputRecord> newValues = new ArrayList<TRSInputRecord>();
        TRSResultSet rs = trsConnection.executeSelect(database, condition, 0, 1, param);
        for (int i = 0; i < rs.size(); i++) {
            rs.moveNext();
            TRSRecord trsRecord = rs.get();
            TRSInputRecord record = new TRSInputRecord();
            record.setUid(trsRecord.getUid());
            records.forEach((k,v)->{
                try {
                    record.addColumn(k,v);
                }catch (TRSException e){
                    System.out.println(e.getErrorString());
                }
            });
            newValues.add(record);
        }
        trsConnection.executeUpdate(database, newValues);
        CloseHybase();
    }



//    删除
    public  void  Delete(String database , String condition)throws TRSException{
        ConnHybase();
        SearchParams param = new SearchParams();
        List<String>  del_uids = new ArrayList<String>();
        TRSResultSet rs = trsConnection.executeSelect(database, condition, 0, 1, param);
        for (int i = 0; i < rs.size(); i++) {
            rs.moveNext();
            TRSRecord trsRecord = rs.get();
            del_uids.add(trsRecord.getUid());
        }
        trsConnection.executeDelete(database, del_uids);
        CloseHybase();
    }




    //    批量删除
    public  String  BanchDelete(String database , String condition)throws TRSException{
        ConnHybase();
        long num = trsConnection.executeDeleteQuery(database, condition);
        CloseHybase();
        return  num+"行已受影响！";

    }

}
