export default {
    clearUserInfo(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
    }
}