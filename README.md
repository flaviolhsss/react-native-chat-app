# swaychat-react-native-chat-app

A fully functional real-time group chat mobile application built with React Native, Node.js, JWT authentication, and MongoDB.  
This project is intended as a reference implementation for developers learning these technologies.

![🎥 Demo video](./screenshots/videos/71afaf7fa4cd47d9a2fff9b2b1036699.gif)

## Prerequisites

Before running this project, make sure you have the following tools installed:

- **Docker** – used to run MongoDB and related services
- **Docker Compose** – used to orchestrate multi-container services
- **Node.js** (v14 or higher)
- **Expo Go** (on a physical device) **or** an Android/iOS emulator


### Installation Steps

1. **Clone the repository**

   Clone this project to your local machine:

   ```bash
   git clone https://github.com/flaviolhsss/react-native-chat-app.git
   cd react-native-chat-app
   ```
   Now, the project can be opened with your IDE of choice (Visual Studio Code was used for this project).

2. **Installation and Starting of the Backend**

   Configuration of environment variables

   ```bash
   make init
   ```
   Fill in the required environment variables in the ./Back and ./Mobile directories.
For JWT_PASSPHRASE, use a 32-character string.

   Start the Backend Stack with Docker Compose

   ```bash
   make up
   ```

3. **Installation and starting on the Mobile side**

   Installation of the React Native application

   ```bash
   cd Mobile
   npm install
   ```

   Start the React Native application

   ```bash
   npm start
   ```