# peeano :)

### How to view p5 piano
Go to > p5 > p5-peeano 
- index.html would let you view the sketch on a webpage 
- sketch.js contains the javascript code for the piano 

### Download p5 dependencies for React
Install p5:  
- `npm i react-p5` 

Might need these if it's not working: 
- `npm i p5`  
- `npm i react-p5-wrapper` 

#

### Bootstrap styling:
- `npm install react-bootstrap bootstrap`

#

### React Frontend
Go to > peeano-frontend
- run `npm start` to view react project

### Node/Express/MongoDB Backend
Go to > peeano-backend
- run `nodemon server` to start node server

Note: Backend is not complete (as in mongoDB is local, not in the cloud yet.)

# 

#### Install these packages globally (REQUIRED)
⬇ Installing nodemon

`sudo npm install -g nodemon`

⬇ Installing MongoDB with brew

`brew tap mongodb/brew`

`brew install mongodb-community`

`brew services start mongodb-community`

You can start mongodb using `mongod`.

Running mongodb: `mongo` in terminal.

#### Other Packages 
##### Should be included with this project, but in case it doesn't work install these packages manually.
- express
- body-parser
- cors
- mongoose
