package DAL;

import java.sql.*;

class DBUtil {
     private static Connection connection = null;

     private static void DBConn() {
         try {
             Class.forName("oracle.jdbc.driver.OracleDriver");
         } catch (ClassNotFoundException e) {
             e.printStackTrace();
         }
         try {
             connection = DriverManager.getConnection("jdbc:oracle:thin:@127.0.0.1:1521:orcl", "scott", "tiger");
         } catch (SQLException e) {
             e.printStackTrace();
         }
     }

     public static void DBclose(){
         if (connection != null){
             try {
                 connection.close();
             }catch (Exception e){
                 e.printStackTrace();
             }
         }
     }

     public static int connUpdate(String sql,Object... parm) throws Exception{
         DBConn();
         int flag = 0;
             PreparedStatement ps = connection.prepareStatement(sql);
             for (int i = 0; i < parm.length; i++) {
                 ps.setObject(i + 1, parm[i]);
             }
            flag = ps.executeUpdate();

             return flag;
     }

     public static ResultSet connQuery(String sql,Object... parm) throws Exception{
         ResultSet resultSet = null;
         DBConn();
         PreparedStatement ps = connection.prepareStatement(sql);
         ResultSet rs = null ;
         for(int i=0;i<parm.length;i++){
             ps.setObject(i+1, parm[i]);
         }
         resultSet = ps.executeQuery();

         return resultSet;
     }

}
