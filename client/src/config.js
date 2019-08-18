import mockclient from "./mockapi.js"; //MentorqClient
import mocklogin from "./mocklogin.js";
import firebase from "firebase";
import {firebaseConfig} from "./secrets.js"

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

if (firebaseConfig.apiKey) {
    var defaultApp = firebase.initializeApp(firebaseConfig);
}

const testTicketsAdmin = {
    tickets: [
        {text:"lmao", slack: "123", location: "lounge", owner:"chad", status: "open"},
        {text:"lmao", slack: "123", location: "lounge", owner:"chad", status: "open"},
        {text:"closed", slack: "666", location: "cafeteria", owner:"chad", status: "closed"},
        {text:"claimed", slack: "2019", location: "gym", owner:"chad", status: "claimed"},
        {text:"heman", slack: "2019", location: "rutgers", owner:"heman", status: "open"},
    ],
    role: {admin: true}
};
const clientOptions = testTicketsAdmin;

export {
    MentorqClient,
    getToken, tokenStillValid, BadLogin,
    getStoredToken, setStoredToken,
    clientOptions,
    defaultApp
};
