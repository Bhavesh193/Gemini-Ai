Gemini Chat App
This is a simple, responsive chat application built with React and Tailwind CSS. It simulates a chat interface where users can create chatrooms and exchange messages with a simulated AI. User data (chatrooms and messages) is persisted locally using localStorage, making it unique for each "logged-in" phone number.

 Live Demo
https://gemini-frontend-clone.netlify.app/

✨ Features
User Authentication (Simulated): Login/logout with a phone number and OTP (simulated). Each phone number gets its own chat history.
Chatroom Management: Create and delete chatrooms.
Message Sending: Send text messages and upload images (image preview only, not stored).
Simulated AI Responses: The AI provides predefined responses based on keywords in your messages.
Responsive Design: Adapts seamlessly to various screen sizes (mobile, tablet, desktop).
Dark Mode: Toggle between light and dark themes.
Data Persistence: Chatrooms and messages are saved in the browser's localStorage per user.
Form Validation: Client-side validation for login and chatroom creation forms using Zod and React Hook Form.
Infinite Scroll (Simulated): Loads older messages as you scroll up.
Message Copying: Copy any message to the clipboard.

🛠️ Setup and Run Instructions
To get this project up and running on your local machine:

Clone the repository (or create the project structure manually):
If you have a Git repository:

git clone <your-repo-url>
cd gemini-chat-app

Install Dependencies:
Navigate to the project's root directory in your terminal and install the necessary packages:

npm install
# or if you prefer yarn
yarn install

Run the Development Server:
Start the Vite development server:

npm run dev
# or
yarn dev


📂 Folder and Component Structure
The project follows a modular structure to keep the codebase organized and maintainable:

gemini-chat-app/
├── public/
│   └── vite.svg                  # Public assets
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── Modals/                 # Modal dialogs (CreateChatroom, ConfirmDelete)
│   │   │   ├── ConfirmDeleteModal.jsx
│   │   │   └── CreateChatroomModal.jsx
│   │   ├── Skeletons/              # Loading state skeleton components
│   │   │   ├── ChatroomListSkeleton.jsx
│   │   │   └── MessageSkeleton.jsx
│   │   └── Icons.jsx               # SVG icon components
│   ├── contexts/                   # React Context API for global state management
│   │   ├── AuthContext.jsx         # Manages user authentication state (phone number login)
│   │   ├── ChatroomContext.jsx     # Manages chatrooms and messages, handles localStorage persistence
│   │   └── ThemeContext.jsx        # Manages light/dark theme
│   ├── schemas/                    # Zod schemas for form validation
│   │   └── ValidationSchemas.jsx
│   ├── utils/                      # Utility functions
│   │   └── MarkdownFormatter.jsx   # Basic markdown to HTML conversion
│   ├── App.jsx                     # Main application component, handles routing based on auth state
│   ├── AuthScreen.jsx              # Login/OTP screen
│   ├── ChatroomContent.jsx         # Displays messages for the selected chatroom, handles message input
│   ├── DashboardSidebar.jsx        # Displays chatroom list, search, and user actions
│   ├── index.css                   # Global Tailwind CSS imports and custom styles
│   ├── index.jsx                   # Root component that wraps App with context providers
│   └── main.jsx                    # Entry point for React application (ReactDOM.createRoot)
├── .gitignore                      # Specifies intentionally untracked files to ignore
├── index.html                      # Main HTML file
├── package.json                    # Project metadata and dependencies
├── postcss.config.js               # PostCSS configuration for Tailwind CSS
└── tailwind.config.js              # Tailwind CSS configuration

💡 Implementation Details (Concise)
Throttling
Implemented in DashboardSidebar.jsx for the search bar. It uses a 300ms delay with setTimeout to update the search term only after the user pauses typing, preventing excessive re-renders and improving performance.

Pagination and Infinite Scroll (Simulated)
Managed in ChatroomContent.jsx. Messages are loaded in chunks (20 per "page"). When the user scrolls to the top of the chat, a setTimeout simulates loading older messages, providing a basic infinite scroll effect. Loading skeletons are shown during this process.

Form Validation
Achieved using react-hook-form and zod. Schemas defined in ValidationSchemas.jsx enforce rules for phone numbers, OTPs, and chatroom titles. React Hook Form handles input registration, submission, and displays user-friendly error messages for invalid inputs.

📸 Screenshots
<img width="1919" height="906" alt="Screenshot 2025-07-16 153612" src="https://github.com/user-attachments/assets/4551b228-6f21-45d7-9606-6991c5456243" />
<img width="1698" height="781" alt="image" src="https://github.com/user-attachments/assets/557ccc70-7395-476f-9dcf-63d2a132d49c" />
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/f28a2064-21c4-4c01-a809-07ed774cbcad" />
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/d1ab467c-040a-4fc9-90f7-19c7155c2425" />
<img width="620" height="895" alt="image" src="https://github.com/user-attachments/assets/17abef1e-a224-43bd-a434-2016148197cc" />



