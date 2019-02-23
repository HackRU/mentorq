# MentorQ
A real-time ticket queue to get mentorship during a hackathon.

## Goals
- let mentors see incoming tickets without page reload
- let mentors pull tickets when their free to help hackers, instead of getting pushed
- let hackers ask for help without:
  + waste time checking to see if there is a mentor at the table
  + waste time waiting at the mentor table for a mentor is free
  + waste time waiting if there are no mentors on duty
  + having to leave their seats
- help hackathon organizers gain insight into
  + what are hackers asking for help with
  + when do they typically look for help
  + do we have enough mentors available for hackers when they need them
  + are hackers enjoying the mentorship experience

## high level views
- login splash page
- mentor view (mentor only)
  + see all open tickets
  + claim/close tickets
- hacker view
  + open a ticket
  + see how many mentors are on duty
  + tell them if the queue is currently closed (maybe show them the devpost mentorship hotline)
- stats view (director only)
  + show all tickets open and closed
  + show response/close times
  + other stats (todo)
- admin view
  + open/close queue
  + set how many mentors on duty

## Contributing
as with all HackRU projects we welcome pull requests. if you're interested
in getting involved in rnd contact us at our email on the rnd organization page.

### Tools needed
- probably npm and/or yarn
- probably a way to run bash scripts
- probably firebase cli if doing work with server side functions

### Workflow
1. an issue is opened for a feature request or bug. **security issues should be reported via email**
2. the issue is assigned to someone or marked up for grabs
3. code happens
4. a branch should be created on this repo and then a pull request should be requested to get
into master. ideally a reviewer should be assigned and they should merge the pull request
5. ????
6. profit

## Helpful tutorials/links
- [react](https://reactjs.org/tutorial/tutorial.html)
- something for firebase?
- [lcs the hackru backend](https://github.com/hackru/lcs/wiki)