# 3D Ball Monitoring SPA

The project is a a single-page web application (SPA) that provides an API for tracking the position of a 3D-spahere in 3D space using three.js library. The application also have a web-based dashboard for displaying the ball's position in real-time with the help of Web Sockets. Moreover, the user-friendly interface for login/signup allows users to register as Ball Monitor.

## Installation

1. For installing the application on your device, first of all clone the repository.
2. Open the downloaded folder in VSCode.
3. Make sure you have MySQL2 and Node.js installed in your local machine.
4. Also make sure to install the following dependaencies in your project: mysql2, express, dotenv, cors, nodemon, ws, three
5. Update the '.env' file with hostname, user, password and database name according to your own MySQL database made in your local machine.
6. Open the terminal in VSCode.
7. Navigate to the 'server' folder:
   ```bash
   cd server
8. Run the 'app.js' file
   ```bash
   nodemon app.js
   OR
   node app.js
9. Right click on the 'index.js' file in the 'client' folder and select the option 'Open with Live Server'.
10. Make sure you have 'Live Server' extension downloaded in your VSCode to run the client in a user-friendly manner.
