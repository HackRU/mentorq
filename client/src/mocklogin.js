class BadLogin extends Error {
    constructor(message) {
        super(message);
        this.name = "BadLogin";
    }
}

const getStoredToken = () => {
    const token = localStorage.getItem("MentorQToken");
    if (token === "null") {
        return null;
    } else {
        return token;
    }
};

const setStoredToken = (token) => {
    return localStorage.setItem("MentorQToken", token);
};

const getToken = async (username, password) => {
    var tick = "";
    if (username === "heman" || password === "ghandi"){
      setStoredToken("one hashy boi");
      tick = "one hashy boi";
    }
    else if (username === "hack" || password === "ru"){
      setStoredToken("hash");
      tick = "hash";
    }
    else {
        throw new BadLogin();
    }
    return tick;
};

const tokenStillValid = async (token) => {
    return true;
};

export default {
    BadLogin,
    getToken,
    tokenStillValid,
    getStoredToken,
    setStoredToken
};

export {
    BadLogin,
    getToken,
    tokenStillValid,
    getStoredToken,
    setStoredToken
};
