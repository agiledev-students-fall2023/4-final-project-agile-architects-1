# WasteWise

## Overview

Are you tired of throwing away forgotten food that has spoiled? Did you buy too much food that you can't finish? Are you passionate about cooking but unsure about what to make with your available ingredients? WasteWise is the perfect solution addressing all these issues!

WasteWise is a web app that allows users to record and keep track of the items in their fridge, along with their expiration dates. Given the ingredients, the app provides recipe recommendations. Users can register and log in to browse community posts about meals or ingredients they can purchase or share with friends. Once logged in, they can also submit inquiries and respond to these posts.

## Product Vision Statement

Aiming to reduce food waste, we want to make it easy for people to manage their expiring foods and to share surplus with each other, fostering a community that values sustainability and resourcefulness.

## Team members

* [Gefei Gong](https://github.com/Gong2047)
* [Siyu Bi](https://github.com/SiyuBi)
* [Kevin Huang](https://github.com/kevin-huang-cc)
* [Lucy Sun](https://github.com/lucys-s/)

## History and Contribution Guidelines

We are a group of passionate NYU students who came together with a common mission: to combat food waste and promote sustainability through technology. The idea for WasteWise sprouted from our collective experiences with forgotten food that often went to waste. We realized that with the power of web applications, we could provide a solution that not only helps individuals reduce waste but also promotes a sharing economy.

As we move forward, we openly invite and encourage contributions to this project. We warmly welcome any new issues reported on our GitHub. Whether it's a bug, an idea, or a question, your feedback is invaluable to the growth and refinement of WasteWise. If you have a solution for an existing issue or have made enhancements, please submit a pull request. Whether you're suggesting a new feature, enhancing existing functionalities, or identifying and rectifying bugs, each contribution plays a vital role in honing WasteWise.

For more details on contributing, see the [contributing](./CONTRIBUTING.md) page.

## Instructions for building and testing

### Backend (Express.js):

1. **Install Dependencies:**
   Open a terminal and navigate to backend.

   ```bash
   cd back-end
   ```

   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```
2. **Start the Backend Server:**
   Once the dependencies are installed, start the backend server.

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:3001`.
   Alternatively, you can use `nodemon` to run the server so that it'll automatically restart after you make any changes in the back end.

   ```bash
   nodemon start
   ```
3. **For Testing**:
   Run unit test for backend server using commant below:

   ```bash
   npm test
   ```

### Frontend (React):

1. **Install Dependencies:**
   Open a new terminal window and navigate to frontend.

   ```bash
   cd front-end
   ```

   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```
2. **Start the Frontend Development Server:**
   Once the dependencies are installed, start the frontend development server. Use the following command:

   ```bash
   npm start
   ```

   This will start the React app, and the front end website will be available at `http://localhost:3000` (or another port if 3000 is in use).

Now, both the backend and frontend servers are running concurrently. You can access the React app in the browser, and it will interact with the backend API.

## App design

### App Map

![sitemap](ux-design/wireframes/Site%20Map.png)

### Wireframes

* See the [UX-design](./UX-DESIGN.md) documentation.

### Prototype

* See the [UX-design](./UX-DESIGN.md) documentation.
