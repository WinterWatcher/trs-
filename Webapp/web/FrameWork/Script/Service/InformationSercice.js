
myApp.factory('InfomationService',function () {

    return{
        Query:function (parm) {
            var da = {};
            $.ajax({
                type: "get",
                url: "../../src/BLL/queryServlet",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                async:false,
                data: parm,
                success:function(data){
                    da = data;
                }
            });
            return da;
        },
        ADD:function (student) {
            var message = "";
            $.ajax({
                type: "get",
                url: "../../src/BLL/addServlet",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data:student,
                async:false,
                success:function(data){
                    message = data;
                }
            });
            return message;
        },
        Update:function (student) {
            var message = "";
            $.ajax({
                type: "get",
                url: "../../src/BLL/updateServlet",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data:student,
                async:false,
                success:function(data){
                    message = data;
                }
            });
            return message;
        },
        Delete:function (id) {
            var message = "";
            $.ajax({
                type: "get",
                url: "../../src/BLL/deleteServlet",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data:{"Id":id},
                async:false,
                success:function(data){
                    message = data;
                }
            });
            return message;
        }
    }
});