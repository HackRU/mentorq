// URL
export const URL = "https://mentorq-backend-dev.herokuapp.com";
//export const URL = "http://127.0.0.1:8000";

// Types
export const LOGOUT = Symbol("logout");

// Auth
export const REQUEST_LOGIN = Symbol("request_login");
export const RECEIVED_LOGIN = Symbol("received_login");
export const FAILED_LOGIN = Symbol("failed_login");

// Create Ticket
export const CREATE_TICKET_REQUEST = Symbol("create_ticket_request");
export const CREATE_TICKET_FAILED = Symbol("create_ticket_failed");
export const CREATE_TICKET_RECEIVED = Symbol("create_ticket_received");

// Refresh Token
export const REFRESH_TOKEN_REQUEST = Symbol("refresh_token_request");
export const REFRESH_TOKEN_FAILED = Symbol("refresh_token_failed");
export const REFRESH_TOKEN_RECEIVED = Symbol("refresh_token_received");

// HackRU authorization constants
export const HACKRU_PROD = "https://api.hackru.org/prod"
export const HACKRU_DEV = "https://api.hackru.org/dev"

//Choosing which authorization mode
export const HACKRU_URL = HACKRU_DEV
