# User-Authentication-System

a robust web application employing client-side JavaScript for dynamic user interactions and server-side Node.js with Express.js to ensure secure authentication and seamless integration with a PostgreSQL database.

HTML Structure:

A well-structured HTML layout ensures a responsive and visually appealing user interface.
External CSS styles (style.css) contribute to a polished and consistent design, including background images and styles for login and signup sections.
Inclusion of links for password recovery and user registration enhances user experience and accessibility.
Client-Side JavaScript:

Leveraging the DOMContentLoaded event ensures the proper loading of the webpage before executing client-side scripts.
The submitForm function manages form submissions, capturing user input for email and password and performing preliminary client-side validation.
Utilization of the Fetch API facilitates seamless communication with the server-side, sending POST requests to relevant endpoints (http://localhost:3000/submit).
Dynamic display of server responses in the HTML (<div id="result">) enhances user feedback and interaction.
Server-Side JavaScript (Node.js with Express):

Express.js powers the backend, handling incoming requests and orchestrating communication between the client and PostgreSQL database.
Middleware configuration includes body-parser for JSON data parsing and CORS for secure cross-origin resource sharing.
Integration with a PostgreSQL database allows for efficient storage and retrieval of user information.
Creation of /submit and /signup endpoints facilitates user login and registration processes, respectively.
Robust server-side validation checks email existence, validates passwords, and ensures strong password criteria through the isStrongPassword function.
Database (PostgreSQL):

The PostgreSQL database stores user information securely, providing a reliable foundation for user authentication.
SELECT and INSERT statements are employed for checking email existence and managing user registration and login processes.
