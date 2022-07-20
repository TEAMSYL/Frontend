
function isLogin() {
    if (sessionStorage.getItem('userId') == null) {
        return false;
    } else {
        return true;
    }
};

const sessionApi = {
    isLogin
}

export default sessionApi;