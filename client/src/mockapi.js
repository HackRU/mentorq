const status = {
    open: "open",
    claimed: "claimed",
    closed: "closed"
};

const defaultRole = {
    mentor: false,
    hacker: true,
    admin: false,
};

class TicketExists extends Error {
    constructor(message) {
        super(message);
        this.name = "TicketExists";
    }
}

class TicketNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "TicketNotFound";
    }
}

// example review
// {
//   rating: 0-5
//   comment: "wow pretty good"
// }

// example ticket
// {
//   text: "mentors, need help with python"
//   slack: "slack_id"
//   location: "graduate lounge"
//   owner: "username"
//   status: "open" //or "closed" or "claimed"
//   mentorReview: Review (optional)
//   menteeReview: Review (optional)
// }

const from = (username) => (tickets) => {
    if (Array.isArray(tickets)) {
        return tickets.filter(ticket => ticket.owner === username);
    } else {
        return tickets.owner === username;
    }
};

const withStatus = (status) => (tickets) => {
    console.log(tickets);
    if (Array.isArray(tickets)) {
        return tickets.filter(ticket => ticket.status === status);
    } else {
        return tickets.status === status;
    }
};

const first = (arr) => arr[0];

const clientDefaults = {
    role: {mentor: false, admin: false},
    tickets: [],
    qStatus: {mentors: 0, onDuty: false},
};

class MentorqClient {
    tickets = [];
    ticketCallbacks = [];
    qStatusCallbacks = [];

    // you can pass in {role: {role: true}} to give roles to user
    constructor(token, {
        role = clientDefaults.role,
        tickets = clientDefaults.tickets,
        qStatus = clientDefaults.qStatus
    }) {
        this.qStatus = qStatus;
        this.tickets = tickets;
        if(token == "one hashy boi"){
          this.userData = {
              token,
              username: "heman",
              role: Object.assign({}, defaultRole, role)
          };
        }
        else if(token == "hash"){
          this.userData = {
              token,
              username: "person",
              role: Object.assign({}, defaultRole, {mentor: true})
          };
          this.setOnDuty(true);
        }
        if (role.mentor) {
            this.setOnDuty(true);
        }
    }

    // tickets
    async getTickets() {
        return this.tickets;
    }


    async newTicket(tick) {
        let myTicket = await this.getTickets()
            .then(from(this.userData.username))
            .then(withStatus(status.open))
            .then(first)

        if (myTicket !== undefined && !this.userData.role.admin) {
            throw new TicketExists();
        }

        const ticket = {
            status: status.open,
            text: tick.complaint,
            slack: tick.slack,
            location: tick.location,
            owner: this.userData.username
        };

        this.tickets.push(ticket);
        this.ticketCallbacks.forEach(f => f(this.tickets));
    }

    onTickets(callback) {
        this.ticketCallbacks.push(callback);
    }

    // update a ticket
    async saveTicket(ticket) {
        const id = (tick) => tick.owner + tick.text;
        for (let other of this.tickets) {
            if (id(other) === id(ticket)) {
                other.status = ticket.status;
                this.ticketCallbacks.forEach(f => f(this.tickets));
                return;
            }
        }
        throw new TicketNotFound();
    }

    // TODO
    // status stuff
    async getQStatus() {
        return this.qStatus;
    }
    onQStatus(callback) {
        this.qStatusCallbacks.push(callback);
    }

    setOnDuty(onDuty) {
        if (onDuty !== this.qStatus.onDuty) {
            if (onDuty) {
                this.qStatus.mentors++;
            } else {
                this.qStatus.mentors--;
            }
            this.qStatus.onDuty = true;
            this.qStatusCallbacks.map(cb => cb(this.qStatus));
        }
    }

}

export default {
    MentorqClient,
    withStatus,
    status,
    from
};

export {
    MentorqClient,
    withStatus,
    status,
    from
};
