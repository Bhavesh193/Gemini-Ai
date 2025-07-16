# 💬 Gemini Chat App

This is a simple, responsive chat application built with **React** and **Tailwind CSS**. It simulates a chat interface where users can create chatrooms and exchange messages with a simulated AI. All user data (chatrooms and messages) is saved locally using `localStorage`, making the experience unique per "logged-in" phone number.

🔗 **Live Demo**: [https://gemini-frontend-clone.netlify.app/](https://gemini-frontend-clone.netlify.app/)

---

## ✨ Features

- 🔐 **User Authentication (Simulated)**: Login with phone number and OTP (simulated). Each number has its own data.
- 🧠 **Simulated AI Replies**: Predefined replies based on message keywords.
- 💬 **Chatroom Management**: Create and delete chatrooms easily.
- 📷 **Image Upload Support**: Upload and preview images (not persisted).
- 🌓 **Dark Mode Support**: Toggle between light and dark themes.
- 🧾 **Data Persistence**: Messages and chatrooms stored in `localStorage`.
- ✅ **Form Validation**: With `Zod` and `React Hook Form`.
- ⬆️ **Infinite Scroll**: Simulated loading of old messages on scroll.
- 🔍 **Throttled Search**: Search chatrooms with throttling to reduce lag.
- 📋 **Message Copying**: Copy messages to clipboard.
- 📱 **Responsive Design**: Works well on desktop, tablet, and mobile.

---

## 🛠️ Setup and Run Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/gemini-chat-app.git
cd gemini-chat-app
2. Install Dependencies
Using npm:

bash
Copy
Edit
npm install
Or with yarn:

bash
Copy
Edit
yarn install
3. Run Development Server
bash
Copy
Edit
npm run dev
Or:

bash
Copy
Edit
yarn dev
 ```

## 📁 Folder & Component Structure

```bash
gemini-chat-app/
├── public/
│   └── vite.svg                     # Public assets
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── Modals/                 # Modal dialogs
│   │   │   ├── ConfirmDeleteModal.jsx
│   │   │   └── CreateChatroomModal.jsx
│   │   ├── Skeletons/              # Loading skeleton UIs
│   │   │   ├── ChatroomListSkeleton.jsx
│   │   │   └── MessageSkeleton.jsx
│   │   └── Icons.jsx               # SVG Icon components
│   ├── contexts/                   # Global state management
│   │   ├── AuthContext.jsx         # Phone number login state
│   │   ├── ChatroomContext.jsx     # Manages chatrooms & messages
│   │   └── ThemeContext.jsx        # Dark/light mode toggle
│   ├── schemas/                    # Zod schemas for form validation
│   │   └── ValidationSchemas.jsx
│   ├── utils/
│   │   └── MarkdownFormatter.jsx   # Markdown to HTML converter
│   ├── App.jsx                     # Main app component + routing
│   ├── AuthScreen.jsx              # Login screen
│   ├── ChatroomContent.jsx         # Chat message interface
│   ├── DashboardSidebar.jsx        # Chatroom list and user actions
│   ├── index.css                   # TailwindCSS styles
│   ├── index.jsx                   # Context provider root
│   └── main.jsx                    # App entry point (ReactDOM)
├── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js


💡 Implementation Details
🔁 Throttling
Implemented in DashboardSidebar.jsx for chatroom search.

Uses setTimeout (300ms delay) to debounce input and reduce re-renders.

📜 Pagination & Infinite Scroll (Simulated)
Handled in ChatroomContent.jsx.

Loads 20 messages at a time.

When the user scrolls to the top, a delay (setTimeout) simulates loading older messages.

Loading skeletons appear during fetch.

✅ Form Validation
Uses react-hook-form + zod for validation.

Schemas are defined in ValidationSchemas.jsx.

Validates phone number, OTP, and chatroom title.

Error messages shown via react-hook-form and toasts.

📸 Screenshots
