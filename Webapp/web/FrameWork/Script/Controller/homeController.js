

myApp.controller('homeController',function ($scope,$compile,InfomationService,$timeout) {

    // 获取屏幕分辨率
    var height = window.innerHeight;
    var width = window.innerWidth;

    // 后台传递参数
    var parm = {};

    // 增加修改状态码
    $scope.isAddNotUpdate = true;

    // 初始化模态框验证状态
    var passOptFlag = false;
    var nameFlag = false;
    var stunoFlag = false;
    var clasFlag = false;
    var cardFlag = false;
    var telFlag = false;
    var emailFlag = false;
    var isSureFlag = false;

    // 新增学生对象
    $scope.stuObj = {
        "Id":"",
        "Name":"",
        "Sex":"",
        "Stuno":"",
        "Clas":"",
        "CardId":"",
        "Tel":"",
        "Email":"" ,
        "RegFlag":"",
        "Info":""
    };

    // 选中学生对象
    $scope.choiseObj = {};

    // 模态框初始化数据
    var table1 = [{"column1":"<td class='motileTable1Name' colspan='3'>{{motileTable1Name}}</td>","column2":"","column3":""},
        {"column1":"<td class='td1'>姓名</td>","column2":"<td class='aName'><input type='text' ng-change='aNameCheck()' ng-model='aNameValue'></td>","column3":"<td class='aNameCheck'>*</td>"},
        {"column1":"<td>性别</td>","column2":"<td class='aSex'>男：<input id='male' name='aSex' type='radio' value='男'>女：<input id='female' name='aSex' type='radio' value='女'></td>","column3":"<td class='aSexCheck'>*</td>"},
        {"column1":"<td>学号</td>","column2":"<td class='aStuno'><input id='stuno' type='number' ng-change='aStunoCheck()' ng-model='aStunoValue'></td>","column3":"<td class='aStunoCheck'>*</td>"},
        {"column1":"<td>班级</td>","column2":"<td class='aClas'><input type='text' ng-change='aClasCheck()' ng-model='aClasValue'></td>","column3":"<td class='aClasCheck'>*</td>"},
        {"column1":"<td>身份证</td>","column2":"<td class='aCardId'><input type='text' ng-change='aCardIdCheck()' ng-model='aCardIdValue'></td>","column3":"<td class='aCardIdCheck'>*</td>"},
        {"column1":"<td>电话</td>","column2":"<td class='aTel'><input type='text' ng-change='aTelCheck()' ng-model='aTelValue'></td>","column3":"<td class='aTelCheck'>*</td>"},
        {"column1":"<td>邮箱</td>","column2":"<td class='aEmail'><input type='text' ng-change='aEmailCheck()' ng-model='aEmailValue'></td>","column3":"<td class='aEmailCheck'>*</td>"},
        {"column1":"<td>状态</td>","column2":"<td class='aRegisterFlag'><select class='aRegister'><option id='O1' value='1'>&nbsp;&nbsp;&nbsp;-&nbsp;-&nbsp;-&nbsp;&nbsp;&nbsp;请选择&nbsp;&nbsp;&nbsp;-&nbsp;-&nbsp;-</option><option id='O2' value='已注册'>已注册</option><option id='O3' value='未注册'>未注册</option><option id='O4' value='休学'>休学</option></select></td>","column3":"<td class='aRegisterFlagCheck'>*</td>"},
        {"column1":"<td>简介</td>","column2":"<td class='aInfo'><textarea class='aInfoma'/></td>","column3":"<td class='aInfoCheck'></td>"},
        {"column1":"<td class='Add' colspan='3'><div class='submit' ng-click='submit()'>提交</div>&nbsp;&nbsp;&nbsp;<div class='reset' ng-click='reset()'>取消</div></td>","column2":"","column3":""}];

    var table2 = [{"column1":'<td class="motileTable1Name" colspan="3">{{motileTable2Name}}</td>',"column2":""},
        {"column1":"<td class='td2'>姓名:&nbsp</td>","column2":"<td class='sName'>{{stuObj.Name}}</td>"},
        {"column1":"<td class='td2'>性别:&nbsp</td>","column2":"<td class='sSex'>{{stuObj.Sex}}</td>"},
        {"column1":"<td class='td2'>学号:&nbsp</td>","column2":"<td class='sStuno'>{{stuObj.Stuno}}</td>"},
        {"column1":"<td class='td2'>班级:&nbsp</td>","column2":"<td class='sClas'>{{stuObj.Clas}}</td>"},
        {"column1":"<td class='td2'>身份证:&nbsp</td>","column2":"<td class='sCardId'>{{stuObj.CardId}}</td>"},
        {"column1":"<td class='td2'>电话:&nbsp</td>","column2":"<td><div class='sTel'>{{stuObj.Tel}}</div></td>"},
        {"column1":"<td class='td2'>邮箱:&nbsp</td>","column2":"<td ><div class='sEmail'>{{stuObj.Email}}</div></td>"},
        {"column1":"<td class='td2'>状态:&nbsp</td>","column2":"<td class='sRegister'>{{stuObj.RegFlag}}</td>"},
        {"column1":"<td class='td2'>简介:&nbsp</td>","column2":"<td ><div class='sInfo''>{{stuObj.Info}}</div></td>"},
        {"column1":"<td class='sub' colspan='2'><div class='isSure' ng-click='isSure()'>确定</div></td>","column2":""}];

    var init = function () {

        // 一级菜单状态码
        $scope.firstZoomFlag = true;

        // title标题状态码
        $scope.showTitle = false;

        // 初始化查询数据集
        $scope.students = [];

        // 初始化总页数
        $scope.totalPage = 0;

        // 初始化当前页
        $scope.nowPage = 1;

        // 初始化跳转页面
        $scope.goPage = 0;

        // 设置页面全屏显示
        $(".main_container").css({'height':height});
        $(".main_logo_font_container").css('line-height',0.1*height+"px");
        $(".app_logo_font_container").css('line-height',0.1*height+"px");
        $(".mine").css('line-height',0.1*height+"px");
        $(".setting").css('line-height',0.1*height+"px");
        $(".about").css('line-height',0.1*height+"px");
    };

    // 一级标题也缩放
    $scope.zoom = function(){
        if ($scope.firstZoomFlag){
            $(".body_left_container").css("width","5%");
            $(".body_right_container").css("width","95%");
            $(".options_img").css("width","100%");
            $(".options_font").css("width","0%");
            $scope.firstZoomFlag = false;
        }else {
            $(".body_right_container").css("width","85%");
            $(".body_left_container").css("width","15%");
            $(".options_img").css("width","20%");
            $(".options_font").css("width","60%");
            $scope.firstZoomFlag = true;
        }
    };

    // 显示主页面
    $scope.showText = function () {
        $(".text_container").css({"display":"block","height":0.9*height - 160 +"px"});
        $scope.showTitle = true;
    };

    $scope.mousein = function(){
        $(".null1").css("width","20%");
        $(".options_title_font").css({"width":"60%","font-size":"16px"});
        $(".options_title_img").css("width","20%");
    };

    $scope.mouseout = function(){
        $(".null1").css("width","0%");
        $(".options_title_font").css({"width":"100%","font-size":"18px"});
        $(".options_title_img").css("width","0%");
    };

    $scope.closeTitle = function(){
        $(".text_container").css({"height":"0px","display":"none"});
        $(".page_container").css({"height":"0px"});
        $(".table").empty();
        $(".table").append("<tr class='table_title'><td>序号</td><td>姓名</td><td>性别</td><td>状态</td><td>学号</td><td>班级</td><td>身份证</td><td>电话</td><td>邮箱</td></tr>");
      $scope.showTitle = false;
    };

    // 查询按钮
    $scope.query = function(){
        var name = $(".name").val();
        var clas = $(".clas").val();
        var stuno = $(".stuno").val();
        var jing = $(".jing").is(":checked");
        parm = {"name":name,"clas":clas,"stuno":stuno,"jing":jing};
        $scope.students = InfomationService.Query(parm);
        $scope.nowPage = 1;
        $scope.totalPage = $scope.students.length%13>0 ? parseInt($scope.students.length/13) + 1 : parseInt($scope.students.length/13);
        fillTable();
        $scope.choiseObj = {};
    };

    // 填充表格
    var fillTable = function(){
        $(".table").empty();
        $(".table").append("<tr class='table_title'><td>序号</td><td>姓名</td><td>性别</td><td>状态</td><td>学号</td><td>班级</td><td>身份证</td><td>电话</td><td>邮箱</td></tr>");
        var l = ($scope.students.length - $scope.nowPage*13 +13) >= 13 ? 13 : ($scope.students.length - $scope.nowPage*13 + 13);
        for (var k=0;k< l;k++){
            var i = k + $scope.nowPage*13 - 13;
            var tr = $compile("<tr class='tr"+k+"' ng-click='choise("+k+")'></tr>");
            tr($scope).appendTo(".table");
            var tex = $compile("<td class='C1'>"+(parseInt(i)+1)+"</td><td class='C2' title='"+$scope.students[i].Info+"'>"+$scope.students[i].Name+"</td><td class='C3'>"+$scope.students[i].Sex+"</td>" +
                "<td class='C4'>"+$scope.students[i].Register+"</td><td class='C5'>"+$scope.students[i].Stuno+"</td><td class='C6'>"+$scope.students[i].Clas+"</td>" +
                "<td class='C7'>"+$scope.students[i].CardId+"</td><td class='C7'>"+$scope.students[i].Tel+"</td><td class='C7'>"+$scope.students[i].Email+"</td>");
            var $dom = tex($scope);
            $dom.appendTo(".tr"+k);
            $(".tr"+k).css({"cursor":"pointer","height":"28px"});
            if($scope.students[i].Register != "已注册"){
                $(".tr"+k+" .C4").css("color","orange");
            }
        }
        upPageF();
    };

    var upPageF = function () {
        $(".page_container").css({"height":"40px"});
        $scope.goPage = $scope.nowPage;
        if($scope.nowPage == 1){
            $(".last_page").css("background-color","gray");
            $(".next_page").css("background-color","inherit");
        }else if ($scope.nowPage == $scope.totalPage){
            $(".next_page").css("background-color","gray");
            $(".last_page").css("background-color","inherit");
        }else if($scope.nowPage == $scope.totalPage == 1){
            $(".last_page").css("background-color","gray");
            $(".next_page").css("background-color","gray");
        }else {
            $(".last_page").css("background-color","inherit");
            $(".next_page").css("background-color","inherit");
        }
    };

    var remenber = undefined;
    var towF = false;
    $scope.choise = function (e) {
        var index = e + $scope.nowPage * 13 - 13;
        if(index != remenber){
            $(".table tr").css("background-color","inherit");
            $(".tr"+e).css("background-color","#e6da6f");
            remenber = index;
            $scope.choiseObj = $scope.students[index];
            towF = true;
        } else {
            if (towF){
                $(".table tr").css("background-color","inherit");
                $(".tr"+e).css("background-color","#e6da6f");
                remenber = index;
                $scope.choiseObj = $scope.students[index];
                towF = false;
            }else {
                $scope.choiseObj = {};
                $(".table tr").css("background-color","inherit");
                towF = true;
            }
        }
    };

    // 模态框姓名验证
    $scope.aNameCheck = function(){
        var Name = ($scope.aNameValue).split('');
        nameFlag = false;
        for(var i=0;i<Name.length;i++){
            if (!/^[\u3220-\uFA29]+$/.test(Name[i])){
                $(".aNameCheck").html("! 请输入中文名称！");
                break;
            }else {
                if (2 <= parseInt(Name.length) && parseInt(Name.length) <= 6) {
                    $(".aNameCheck").html("*");
                    nameFlag = true;
                }else {
                    $(".aNameCheck").html("! 您的姓名不合法！");
                }
            }
        }
    };

    // 模态框学号验证
    $scope.aStunoCheck = function(){
        var Stuno = $scope.aStunoValue;
        stunoFlag = false;
        if (Stuno<1000000 || Stuno>99999999999){
            $(".aStunoCheck").html("! 学号长度在7-11间！");
        }else {$(".aStunoCheck").html("*");stunoFlag = true;}
    };

    // 模态框班级验证
    $scope.aClasCheck = function(){
        var Clas = ($scope.aClasValue).split('');
        clasFlag = false;
        var num = 0;
        if (!/^[\u3220-\uFA29]+$/.test(Clas[0])){
            $(".aClasCheck").html("! 请输入合法班级名称！");
        }else {
            for(var i=1;i<Clas.length;i++){
                if (/^[\u3220-\uFA29]+$/.test(Clas[i])){
                    $(".aClasCheck").html("! 班级为系缩写+班号！");
                }else {
                    if(/[0-9]/.test(Clas[i])){
                        num++;
                        $(".aClasCheck").html("! 班级为系缩写+班号！");
                        if (num > 3){$(".aClasCheck").html("*"); clasFlag = true;break;}
                    }else {
                        $(".aClasCheck").html("! 请输入合法班级名称！");
                        break;
                    }
                }
            }
        }
    };

    // 模态框身份证验证
    $scope.aCardIdCheck = function(){
        var CardId = ($scope.aCardIdValue).split('');
        cardFlag = false;
        if (CardId.length != 18) {
            $(".aCardIdCheck").html("! 请输入合法的身份证号！")
        }else {
            for (var i=0;i<17;i++){
                if(!/[0-9]/.test(CardId[i])){
                    $(".aCardIdCheck").html("! 身份证号有误！");
                    break;
                }
                if ( 0<=CardId[length-1]<=9 || CardId[length-1] == 'X'){
                    $(".aCardIdCheck").html("*");
                    cardFlag = true;
                }else {
                    $(".aCardIdCheck").html("! 身份证号有误！");
                }
            }
        }
    };

    // 模态框电话验证
    $scope.aTelCheck = function(){
        var Tel = ($scope.aTelValue).split(',');
        telFlag = false;
        if (Tel.length > 3){
            $(".aTelCheck").html("! 最多支持3个手机！");
        }else {
            $(".aTelCheck").html("*多个手机,隔开");
            telFlag = true;
        }
        for (var i=0;i<Tel.length;i++){
            if (Tel[i]<13000000000 || Tel[i]>19999999999){
                $(".aTelCheck").html("! 请输入合法手机号！");
                break;
            }
        }
    };

    // 模态框邮箱验证
    $scope.aEmailCheck = function(){
        var Email = ($scope.aEmailValue).split(',');
        emailFlag = false;
        if (Email.length > 3){
            $(".aEmailCheck").html("! 最多支持3个邮箱！");
        }else {
            $(".aEmailCheck").html("*多个邮箱,隔开");
            emailFlag = true;
        }
        for (var i=0;i<Email.length;i++){
            if (!/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(Email[i])){
                $(".aEmailCheck").html("! 请输入合法邮箱！");
                break;
            }
        }
    };

    // 添加按钮
    $scope.add = function(){
        $scope.isAddNotUpdate = true;
        $scope.motileTable1Name = "新增";
        $scope.motileTable2Name = "提交";
        $scope.aNameValue = "";
        $scope.aStunoValue = "";
        $scope.aClasValue = "";
        $scope.aCardIdValue = "";
        $scope.aTelValue = "";
        $scope.aEmailValue = "";
        $("#male").attr("checked","");
        $("#female").attr("checked","");
        $("#O1").attr("selected","selected");
        $scope.stuObj = {};
        $(".aInfoma").val("");
        popWindow();
    };

    // 修改按钮
    $scope.update = function(){
        $scope.isAddNotUpdate = false;
        $scope.motileTable1Name = "修改";
        $scope.motileTable2Name = "提交";
        $scope.stuObj = {};
        if($scope.choiseObj.Id == "" || $scope.choiseObj.Id == undefined){
            alert("请先选择删除项！")
        }else {
            popWindow();
            fillData();
        }
    };

    // 删除按钮
    $scope.delete = function(){
        if ($scope.choiseObj.Id == "" || $scope.choiseObj.Id == undefined){
            alert("请先选择修改项！")
        }else {
            if (confirm("确定删除当前项？")){
                InfomationService.Delete($scope.choiseObj.Id);
                alert("已删除该项！");
                var re = $scope.nowPage;
                $scope.query();
                if(re > $scope.totalPage){$scope.nowPage = $scope.totalPage; fillTable() }
                else {$scope.nowPage = re; fillTable() }
            }
        }
    };

    // 模态框修改数据填充
    var fillData = function () {
        $scope.aNameValue = $scope.choiseObj.Name;
        $scope.aStunoValue = parseInt($scope.choiseObj.Stuno);
        $scope.aClasValue = $scope.choiseObj.Clas;
        $scope.aCardIdValue = $scope.choiseObj.CardId;
        $scope.aTelValue = $scope.choiseObj.Tel;
        $scope.aEmailValue = $scope.choiseObj.Email;
        $(".aInfoma").val($scope.choiseObj.Info);
        if ($scope.choiseObj.Sex == "男"){
            $("#male").attr("checked","checked");
        }else {
            $("#female").attr("checked","checked");
        }
        if($scope.choiseObj.Register == "已注册"){
            $("#O2").attr("selected","selected")
        }else if ($scope.choiseObj.Register == "未注册"){
            $("#O3").attr("selected","selected")
        }else {
            $("#O4").attr("selected","selected")
        }
    };

    // 弹出模态框
    var popWindow = function(){
        $(".motile_table1").empty();
        $(".motile_table2").empty();
        $(".motile").css({"width":"770px","height":"400px","top":"200px","left":"25%"});
        fillWindow();
    };

    // 填充模态框
    var fillWindow = function(){
        // 填充模态框左侧
        for (var i = 0;i < table1.length;i++ ){
          $(".motile_table1").append("<tr class='motile_tr"+i+"'></tr>");
          var tex = $compile(table1[i].column1+table1[i].column2+table1[i].column3);
          var $dom = tex($scope);
          $dom.appendTo(".motile_tr"+i);
        };
        $(".motile_table1 tr").each(function () {
            $(this).children('td:eq(0)').css("text-align","center");
            $(this).children('td:eq(2)').css({"color":"orangered","font-size":"13px"})
        })
        // 填充模态框右侧
        for (var j = 0;j < table2.length;j++ ){
            $(".motile_table2").append("<tr class='motile2_tr"+j+"'></tr>");
            var tex = $compile(table2[j].column1+table2[j].column2);
            var $dom = tex($scope);
            $dom.appendTo(".motile2_tr"+j);
        };
        $(".sTel").css("width",0.1*width+"px");
        $(".sEmail").css("width",0.1*width+"px");
        $(".sInfo").css("width",0.1*width+"px");
        $(".motile_table2 tr").each(function () {
            $(this).children('td:eq(1)').css({"font-size":"12px","corlor":"orange"});
        })
    };

    // 模态框提交按钮
    $scope.submit = function(){
        if($scope.isAddNotUpdate){
        passOptFlag = nameFlag && stunoFlag && clasFlag && cardFlag && telFlag && emailFlag;
        if (passOptFlag){
            submitdata();
        }else {
            alert("请将内容填写完整！");
        }}
        else {
            submitdata();
        }
    };

    // 提交数据
    var submitdata = function () {
        $scope.stuObj.Name = $scope.aNameValue;
        $scope.stuObj.Stuno = $scope.aStunoValue;
        $scope.stuObj.Sex = $("input[name='aSex']:checked").val();
        $scope.stuObj.Clas = $scope.aClasValue;
        $scope.stuObj.CardId = $scope.aCardIdValue;
        $scope.stuObj.Tel = $scope.aTelValue;
        $scope.stuObj.Email = $scope.aEmailValue;
        $scope.stuObj.RegFlag = $(".aRegister").val();
        $scope.stuObj.Info = $(".aInfoma").val();
        $scope.stuObj.Id = $scope.choiseObj.Id;
        isSureFlag = true;
    };

    // 模态框取消按钮
    $scope.reset = function(){
        $(".motile").css({"width":"0px","height":"0px","top":"0px","left":"0%"});
    };

    // 模态框确定按钮
    $scope.isSure = function(){
        if ($scope.isAddNotUpdate){
        if(isSureFlag){
            alert(InfomationService.ADD($scope.stuObj));
            $scope.query();
            $scope.nowPage = $scope.totalPage;
            fillTable();
            $timeout(function () {
            $scope.reset();
            },1)
        }else {
            alert("请先填写提交后在确定！");
        }}
        else {
            alert(InfomationService.Update($scope.stuObj));
            var re = $scope.nowPage;
            $scope.query();
            $scope.nowPage = re;
            fillTable();
            $timeout(function () {
                $scope.reset();
            },1)
        }
    };

    $scope.lastPage = function () {
        if ($scope.nowPage > 1) {
            $scope.nowPage--;
            fillTable();
        }
    };

    $scope.nextPage = function () {
        if ($scope.nowPage < $scope.totalPage) {
            $scope.nowPage++;
            fillTable();
        }
    };

    $scope.GO = function () {
        if (1< $scope.goPage && $scope.goPage  < $scope.totalPage){
            $scope.nowPage = $scope.goPage;
            fillTable();
        }else if($scope.goPage > $scope.totalPage){
            $scope.nowPage = $scope.totalPage;
            fillTable();
        }else {
            $scope.nowPage = 1;
            fillTable();
        }
    };


    init();
});