# myFlix

The **myFlix** is a single-page, responsive movie application built with Angular that allows users to browse and learn about various movies. With features like user registration, movie details, and a user profile, the app provides a seamless experience for movie enthusiasts. Developed using Angular Material and TypeScript, myFlix is designed to work across all devices, ensuring users can access movie information wherever they are.

## Features

- **User Authentication**

  - Users can register an account and log in to access personalized features.

- **Browse Movies**

  - Users can view a list of available movies, complete with descriptions and additional details.

- **Single Movie View**

  - Clicking on a movie will navigate to a dedicated view displaying detailed information about that movie, including:
    - A button to view information about the director.
    - A button to view information about the genre.

- **Edit User Data**
- Clicking on 'My profile' will navigate to a dedicated view displaying user data, including:

  - A form to allow the user to edit their data
  - A button to allow the user to delete their account
  - The list of their favorite movies, with a button to remove a movie from that list

- **Responsive Design**
  - The app is designed to work seamlessly on all devices, providing an equal experience for all users.

## Tech Stack

- **Angular**: Framework for building the client-side application.
- **Angular Material**: UI component library for Angular applications.
- **Node.js**: JavaScript runtime for the server-side application.
- **Express**: Framework for building the REST API.
- **MongoDB**: NoSQL database for storing movie and user data.
- **TypeScript**: Superset of JavaScript used for building the app.
- **JSDoc**: Documentation tool for generating API documentation from comments in the codebase.
- **GitHub Pages**: For hosting the application.

## Screenshots

<img src="/src/assets/movie-view.png" alt="Most List View" width="400" />
<img src="/src/assets/movie-view.png" alt="Movie View" width="400" />
<img src="/src/assets/director-modal.png" alt="Director Modal" width="400" />
<img src="/src/assets/profile-view.png" alt="Profile View" width="400" />

## Scenarios (Given-When-Then)

**Feature 1: User Authentication**

- Scenario: User logs in
  - Given the user is on the login page
  - When the user enters their credentials and clicks "Login"
  - Then the user should be redirected to the movie list.

**Feature 2: Browse Movies**

- Scenario: User views the movie list
  - Given the user is logged in
  - When the user navigates to the movie list
  - Then the user should see all available movies displayed.

**Feature 3: Single Movie View**

- Scenario: User views a specific movie
  - Given the user clicks on a movie in the list
  - When the user is redirected to the movie view
  - Then the user should see detailed information about that movie.

**Feature 4: View Director Information**

- Scenario: User views the director's details
  - Given the user is on a movie view
  - When the user clicks the button to view the director
  - Then the user should be taken to the director's detail view.

**Feature 5: View Genre Information**

- Scenario: User views genre details
  - Given the user is on a movie view
  - When the user clicks the button to view the genre
  - Then the user should be taken to the genre's detail view.

## Development Status

🚧 This project is currently under development.

## Deployment / Setup the app

Follow these steps to set up and run your myFlix app.

### Prerequisites

Before you begin, ensure that you have the following software installed on your development machine:

- Node.js (version 16.x or later recommended)
- Angular CLI
- MongoDB (for the backend API)

### 1. Clone the repository

git clone https://github.com/your-username/myFlix.git cd myFlix

## 2. Install Dependencies

Once inside the project directory, install all necessary packages:
`npm install`

### 3. Running the App

After installing dependencies, you can run the app locally using:
`ng serve`

Open your browser and navigate to `http://localhost:4200/`.

### 4. Running the Backend

Ensure your backend server is running to serve the REST API. Follow the instructions in the backend repository to set up and run the server.

## Libraries Used

Here are the main libraries that this app depends on:

- Angular - 13.x
- Angular Material - 13.x
- Node.js - 16.x
- Express - 4.x
- MongoDB - 5.x
- TypeScript - 4.x

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the MIT License.
