const initialState = {
    isLogin: false,
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const loginAction = {
    type: LOGIN,
};

const logoutAction = {
    type: LOGOUT,
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case LOGIN: {
            newState.isLogin = true;
            return newState;
        }
        case LOGOUT: {
            newState.isLogin = false;
            return newState;
        }
        default: {
            return state;
        }
    }
};

export default reducer;
