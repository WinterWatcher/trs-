package Model;

public class Students {

    private String Id;
    private String Name;
    private String Sex;
    private String Stuno;
    private String Clas;
    private String CardId;
    private String Tel;
    private String Email;
    private String Register;
    private String Info;

    public void setId(String id) {
        Id = id;
    }

    public String getId() {
        return Id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getSex() {
        return Sex;
    }

    public void setSex(String sex) {
        Sex = sex;
    }

    public String getStuno() {
        return Stuno;
    }

    public String getCardId() {
        return CardId;
    }

    public String getClas() {
        return Clas;
    }

    public void setStuno(String stuno) {
        Stuno = stuno;
    }

    public void setCardId(String cardId) {
        CardId = cardId;
    }

    public String getEmail() {
        return Email;
    }

    public String getTel() {
        return Tel;
    }

    public void setClas(String clas) {
        Clas = clas;
    }

    public void setTel(String tel) {
        Tel = tel;
    }

    public String getInfo() {
        return Info;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getRegister() {
        return Register;
    }

    public void setInfo(String info) {
        Info = info;
    }

    public void setRegister(String register) {
        Register = register;
    }
}
