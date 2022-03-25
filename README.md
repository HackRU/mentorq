# MentorQ Frontend

A real-time ticket queue system aimed at connecting hackers and mentors!
Inspired by HackMIT's Help-Q and built with React.

## Getting Started

First, install your dependencies from `npm`.

```javascript
npm install
```

Next, run your React server.

```javascript
npm start
```

## Setting up frontend-core for development
1. Go to ```node_modules/@hackru/frontend-core/dist/index.js``` 
2. Comment out the line ```const BASE = process.env.REACT_APP_MODE && process.env.REACT_APP_MODE === "development" ? defaults.rest.dev : defaults.rest.prod;``` 
3. Replace with: ```const BASE = defaults.rest.dev;```
4. ```npm start```
