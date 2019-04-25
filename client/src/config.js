import mockclient from "./mockapi.js"; //MentorqClient
import mocklogin from "./mocklogin.js";

const shouldMockLogin = true;
const shouldMockClient = true;

const testLcsUrl = "https://7c5l6v7ip3.execute-api.us-west-2.amazonaws.com/lcs-test";
const prodLcsUrl = "https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest";

if (shouldMockClient) {
    var MentorqClient = mockclient.MentorqClient;
}

if (shouldMockLogin) {
    var {getToken, tokenStillValid, BadLogin,
         getStoredToken, setStoredToken} = mocklogin;
}

const testTicketsAdmin = {
    tickets: [
        {text:"lmao", owner:"chad", status: "open"},
        {text:"lmao", owner:"chad", status: "open"},
        {text:"closed", owner:"chad", status: "closed"},
        {text:"claimed", owner:"chad", status: "claimed"},
        {text:"heman", owner:"heman", status: "open"},
    ],
    role: {admin: true}
};
const clientOptions = testTicketsAdmin;

export {
    MentorqClient,
    getToken, tokenStillValid, BadLogin,
    getStoredToken, setStoredToken,
    clientOptions
};
