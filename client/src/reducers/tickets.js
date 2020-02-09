import { CREATE_TICKET_REQUEST } from "../constants";

const tickets = (
  state = {
    tickets: []
  },
  { type, title, comment, contact, location }
) => {
  switch (type) {
    case CREATE_TICKET_REQUEST:
      return {
        tickets: [...state.tickets, { title, comment, contact, location }]
      };
    default:
      return state;
  }
};

export { tickets };
