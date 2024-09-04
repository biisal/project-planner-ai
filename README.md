# Project Planner AI

![Project Planner AI](https://private-user-images.githubusercontent.com/153633053/364439196-a785e632-3f13-41ff-a4fb-14570cf5b4da.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjU0NjMzNDgsIm5iZiI6MTcyNTQ2MzA0OCwicGF0aCI6Ii8xNTM2MzMwNTMvMzY0NDM5MTk2LWE3ODVlNjMyLTNmMTMtNDFmZi1hNGZiLTE0NTcwY2Y1YjRkYS5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwOTA0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDkwNFQxNTE3MjhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hODRjZTcxNzE4OGU4NWM5MTk1MmFjMDU5ODE1OTBiMTYxYWRmZDM4NDAwZTk1Zjc0MDdhMTc5Y2UzM2Q4ODY1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.x53KOflsA5o2DzGRKKhjw9ervG1D_v-ORTeFR-_wFpM)

Welcome to Project Planner AI, a web application that helps you generate project plans tailored to your skills using AI. This app is built with Next.js, Tailwind CSS, React, and MongoDB, and it leverages Gemini AI for project generation and Google OAuth for authentication.

## Features

- **User Authentication**: Sign in securely using your Google account.
- **AI-Powered Project Planning**: Generate project plans based on your skills using Gemini AI.
- **Project Management**: View all created plans, delete plans, and mark them as completed.
- **Responsive Design**: Beautiful, responsive UI built with Tailwind CSS.

## Tech Stack

- **Next.js**: The React framework used for building this web application.
- **Tailwind CSS**: Utility-first CSS framework for styling the UI.
- **React**: JavaScript library for building user interfaces.
- **MongoDB**: NoSQL database for storing user data and project plans.
- **Gemini AI**: AI service used for generating project plans.
- **Google OAuth**: Used for secure user authentication.
- **NextAuth.js**: Authentication library for Next.js.

## Getting Started

### Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/biisal/project-planner-ai.git
   cd project-planner-ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following variables:

   ```bash
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   GEMINI_API_KEY=""
   MONGODB_URI=""
   NEXTAUTH_SECRET="2830f4d3f72508da493319689rf818b348d600986f60506550c39622e4629d65"
   YOUTUBE_API_KEY=""
   ```

   - **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: Obtain these from the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard).
   - **GEMINI_API_KEY**: Obtain this from your Google AI Studio account.
   - **MONGODB_URI**: Your MongoDB connection string.
   - **NEXTAUTH_SECRET**: A random string used by NextAuth.js to encrypt sessions.
   - **YOUTUBE_API_KEY**: Your YouTube Data API key (optional if you plan to integrate YouTube data).

### Running the Application

To start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

### Building for Production

To build the application for production:

```bash
npm run build
```

or

```bash
yarn build
```

This will generate an optimized build in the `.next` folder. You can then start the production server using:

```bash
npm run start
```

or

```bash
yarn start
```

### Deployment

You can deploy the application on platforms like Vercel, Netlify, or any other hosting service that supports Next.js. Make sure to set the environment variables in your hosting platform's dashboard.

### Additional Information

- **License**: This project is licensed under the MIT License.
- **Contributing**: Contributions are welcome! Please open an issue or submit a pull request.

## Tutorial: How to Run the Web App

1. **Clone the Repository**: Begin by cloning the repository to your local machine.
2. **Install Dependencies**: Navigate to the project directory and run `npm install` or `yarn install` to install all required packages.
3. **Set Up Environment Variables**: Create a `.env` file in the root of the project with the necessary credentials and keys.
4. **Run the Development Server**: Use `npm run dev` or `yarn dev` to start the development server. Visit `http://localhost:3000` to view the app.
5. **Deploy**: Deploy your application using Vercel, Netlify, or your preferred hosting service. Ensure all environment variables are properly set in the production environment.

---

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/biisal/project-planner-ai)

Happy coding! 🎉
