// URL
export const URL = "http://127.0.0.1:8000";

// Types
export const LOGOUT = Symbol("logout");

// Auth
export const AUTH_REQUEST_LOGIN = Symbol("auth_request_login");
export const AUTH_RECEIVED_LOGIN = Symbol("auth_received_login");
export const AUTH_FAILED_LOGIN = Symbol("auth_failed_login");

// Create Ticket
export const CREATE_TICKET_REQUEST = Symbol("create_ticket_request");
export const CREATE_TICKET_FAILED = Symbol("create_ticket_failed");
export const CREATE_TICKET_RECEIVED = Symbol("create_ticket_received");

// Refresh Token
export const REFRESH_TOKEN_REQUEST = Symbol("refresh_token_request");
export const REFRESH_TOKEN_FAILED = Symbol("refresh_token_failed");
export const REFRESH_TOKEN_RECEIVED = Symbol("refresh_token_received");