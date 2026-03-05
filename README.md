# 🚀 WorkHive - Team Collaboration Platform

> **Empowering teams to collaborate seamlessly. Real-time communication, intelligent task management, and unified workspace for distributed teams.**

---
## 📋 Project Overview

**WorkHive** is a comprehensive **Full-Stack Team Collaboration Platform** designed to streamline communication, task management, and team coordination. Built with modern web technologies, it provides a unified workspace where distributed teams can collaborate in real-time with features like instant messaging, task tracking, file sharing, and collaborative whiteboarding.

### What Makes It Special?
- ✅ **Real-time Communication** with Socket.io
- ✅ **Intelligent Task Management** with Kanban boards
- ✅ **Role-Based Access Control** (Admin & Member roles)
- ✅ **Rich Media Support** with Cloudinary integration
- ✅ **Responsive UI** with Material-UI & Tailwind CSS
- ✅ **Secure Authentication** with JWT tokens

---

## 🎯 Why This Project Is Important

### Real-World Problem It Solves

In today's remote-first world, teams struggle with:
- **Communication Fragmentation** → Messages scattered across multiple platforms
- **Task Management Chaos** → Unclear deadlines and responsibilities
- **Lack of Accountability** → No tracking of who did what and when
- **Poor Visibility** → Managers can't see real-time project status
- **Inefficient Workflows** → Slow feedback loops and bottlenecks

**WorkHive solves these** by providing a **single unified platform** where teams can:
- Communicate in real-time without context-switching
- Manage tasks with clear priorities and deadlines
- Track progress with visual Kanban boards
- Maintain audit logs of all activities
- Collaborate on whiteboards and share files instantly

### Target Users
- 👥 **Remote & Distributed Teams** (2-50 people)
- 🏢 **Startups & SMEs** needing affordable team collaboration
- 📊 **Project Managers** tracking multiple initiatives
- 🎨 **Creative Teams** requiring real-time feedback loops
- 🔧 **Development Teams** coordinating sprints and tasks

---

## ✨ Core Features

### 1. **User Management & Authentication**
- Secure JWT-based authentication
- User registration and login
- Role-based access (Admin & Member)
- Password encryption with bcryptjs
- Team-specific user isolation

### 2. **Team Management**
- Create and manage teams with unique team codes
- Add members to teams
- Invite team members via email
- Team-wide notifications and announcements

### 3. **Task Management System**
- **Kanban Board** with multiple stages (Todo, In Progress, Review, Done)
- **Priority Levels** (High, Medium, Normal, Low)
- **Task Labels** (Research, Design, Content, Planning)
- **Sub-tasks** for task decomposition
- **Task Dependencies** tracking
- **Deadline Management** with visual indicators
- **Task Comments** for collaboration
- **Activity Timeline** showing all task changes
- **Asset Attachment** support with Cloudinary

### 4. **Real-Time Communication**
- **WebSocket Integration** via Socket.io
- **Instant Notifications** for task updates
- **Live Activity Feed** showing team activities
- **Email Notifications** (future enhancement)

### 5. **Whiteboard & Collaborative Tools**
- **Fabric.js Integration** for drawing and sketching
- **Real-time Synchronization** across team members
- **Color Picker** for design collaboration
- **Export Options** for sharing designs

### 6. **Analytics & Dashboard**
- **Team Performance Metrics**
- **Task Completion Rate** tracking
- **Workload Distribution** visualization
- **Project Progress Overview**

### 7. **Data Management**
- **Soft Delete** (Trash functionality for tasks)
- **Audit Logging** of all changes
- **Export to CSV** for reporting
- **Data Persistence** with MongoDB

---

## 🛠️ Tech Stack

### **Backend**
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime environment | Latest |
| **Express.js** | Web framework | ^4.21.2 |
| **MongoDB** | NoSQL database | ^6.12.0 |
| **Mongoose** | ODM (Object Document Mapper) | ^8.9.5 |
| **Socket.io** | Real-time communication | ^4.8.1 |
| **JWT** | Authentication tokens | ^9.0.2 |
| **Bcryptjs** | Password hashing | ^2.4.3 |
| **Multer** | File upload handling | ^1.4.5 |
| **Cloudinary** | Cloud storage for media | ^2.5.1 |
| **CORS** | Cross-origin requests | ^2.8.5 |
| **Dotenv** | Environment variables | ^16.4.7 |

### **Frontend**
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI framework | ^18.3.1 |
| **Vite** | Build tool | Latest |
| **React Router** | Client-side routing | ^7.1.5 |
| **Material-UI (MUI)** | Component library | ^6.4.6 |
| **Tailwind CSS** | Utility-first CSS | Latest |
| **Axios** | HTTP client | ^1.7.9 |
| **Socket.io Client** | Real-time client | ^4.8.1 |
| **Framer Motion** | Animation library | ^12.4.7 |
| **Fabric.js** | Canvas drawing | ^4.6.0 |
| **Recharts** | Charts & graphs | ^3.1.2 |
| **React Icons** | Icon library | ^5.5.0 |
| **Hot Toast** | Notifications | ^2.5.2 |
| **Jitsi SDK** | Video conferencing | ^1.4.4 |
| **Three.js** | 3D graphics | ^0.173.0 |

---

## 🏗️ System Architecture & Workflow

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (React)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  UI Components (Task, Team, Dashboard, Chat, etc.)  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬──────────────────────────────────────┘
                         │ HTTP/WebSocket
         ┌───────────────┴──────────────────┐
         │                                  │
    REST API                         WebSocket
   (Axios)                          (Socket.io)
         │                                  │
┌────────▼──────────────────────────────────▼───────────────────┐
│                    Express.js Server                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  Routes      │  │ Middleware   │  │ Controllers  │        │
│  │  (API)       │  │ (Auth, etc)  │  │ (Business)   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└────────┬───────────────────────────────────────────────────────┘
         │
    ┌────┴─────────────────────────────────┐
    │                                      │
┌───▼──────────────┐          ┌───────────▼─────────┐
│   MongoDB Atlas  │          │   Cloudinary API    │
│  (Data Store)    │          │  (Media Storage)    │
└──────────────────┘          └─────────────────────┘
```

### Core Workflows

#### 1. **Authentication Flow**
```
User Registration/Login → Verify Credentials → Generate JWT → Store Token → Access Protected Routes
```

#### 2. **Task Management Flow**
```
Create Task → Assign to Team → Update Stage → Add Comments → Notify Team → Log Activity
```

#### 3. **Real-Time Notification Flow**
```
Action Triggered → Server Event Emitted → Socket.io Broadcast → Update Client UI
```

#### 4. **File Upload Flow**
```
Select File → Validate → Upload to Cloudinary → Get URL → Save to DB → Share with Team
```

---

## 📡 API Documentation

### Authentication Endpoints

#### **Register User**
```http
POST /auth/register
Content-Type: application/json

{
  "team_code": "TEAM123",
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "title": "Developer"
}
```

#### **Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "role": "member"
  }
}
```

### Task Endpoints

#### **Get All Tasks**
```http
GET /task/all/:team_code
Authorization: Bearer {token}
```

#### **Get Tasks by Stage**
```http
GET /task/stage/:stage/:team_code
Authorization: Bearer {token}
```

#### **Create Task**
```http
POST /task/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "team_code": "TEAM123",
  "title": "Design Homepage",
  "description": "Create responsive homepage design",
  "priority": "high",
  "stage": "todo",
  "label": "design",
  "deadline": "2024-12-31",
  "team": ["507f1f77bcf86cd799439011"]
}
```

#### **Update Task**
```http
PUT /task/update/:task_id
Authorization: Bearer {token}
Content-Type: application/json

{
  "stage": "in progress",
  "priority": "high"
}
```

#### **Add Comment to Task**
```http
POST /task/comment/:task_id
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Started working on this",
  "user_id": "507f1f77bcf86cd799439011"
}
```

### Team Endpoints

#### **Create Team**
```http
POST /team/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "team_name": "Marketing Team",
  "description": "Digital marketing initiatives"
}
```

#### **Add Team Member**
```http
POST /team/add-member/:team_code
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "newmember@example.com",
  "role": "member"
}
```

---

## 📦 Installation & Setup Guide

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** (latest version)
- **MongoDB Atlas** account (free tier available)
- **Cloudinary** account for media hosting
- **Git** installed on your system

### Step 1: Clone the Repository
```bash
git clone https://github.com/priymavani/SynerySphere_TeamCollabration.git
cd SynerySphere_TeamCollabration
```

### Step 2: Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
touch .env
```

**Add these environment variables to `.env`:**
```env
# MongoDB Connection
URI=mongodb+srv://username:password@cluster.mongodb.net/synerysphere

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=4400
NODE_ENV=development
```

### Step 3: Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Create .env file
touch .env.local
```

**Add these to `.env.local`:**
```env
VITE_API_URL=http://localhost:4400
VITE_SOCKET_URL=http://localhost:4400
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
# Server runs on http://localhost:4400
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📁 Folder Structure Explanation

```
SynerySphere_TeamCollabration/
├── server/                          # Backend (Node.js + Express)
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── taskController.js       # Task CRUD operations
│   │   └── teamController.js       # Team management
│   ├── models/
│   │   ├── userModel.js            # User schema
│   │   ├── taskModel.js            # Task schema
│   │   ├── notificationModel.js    # Notification schema
│   │   └── index.js                # All models export
│   ├── routes/
│   │   ├── authRoutes.js           # Auth API endpoints
│   │   ├── taskRoutes.js           # Task API endpoints
│   │   ├── teamRoutes.js           # Team API endpoints
│   │   └── notificationRoutes.js   # Notification endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── errorMiddleware.js      # Error handling
│   ├── .env                         # Environment variables
│   ├── server.js                    # Entry point
│   └── package.json                 # Dependencies
│
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Task.jsx            # Task component
│   │   │   ├── TeamMembers.jsx     # Team view
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Signup.jsx          # Signup page
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   └── About.jsx           # About page
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── utils/                  # Utility functions
│   │   ├── assets/                 # Images, icons, static files
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # React entry point
│   ├── public/                      # Static assets
│   ├── .env.local                   # Environment variables
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── index.html                  # HTML template
│   └── package.json                # Dependencies
│
└── README.md                        # This file
```

## ⚙️ Environment Variables

### Backend (.env)

```env
# 🔐 Database Configuration
URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# 🔑 JWT Secret Key (use a strong random string)
JWT_SECRET=your_long_random_secret_key_min_32_characters

# 🖼️ Cloudinary (Media Hosting)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=1234567890123456
CLOUDINARY_API_SECRET=your_api_secret_code

# 🚀 Server Configuration
PORT=4400
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# 📧 Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Frontend (.env.local)

```env
# 🔗 API Configuration
VITE_API_URL=http://localhost:4400
VITE_SOCKET_URL=http://localhost:4400

# 🌍 Environment
VITE_ENV=development
```

### How to Get These Credentials

**MongoDB Atlas:**
1. Go to [mongodb.com](https://www.mongodb.com)
2. Create account → Create cluster (M0 free tier)
3. Get connection string from "Connect" button

**Cloudinary:**
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → Settings
3. Copy Cloud Name, API Key, and API Secret


---

## 🎮 How to Use the Application

### For End Users

#### 1. **Sign Up & Create Account**
- Click "Sign Up"
- Enter your email, full name, and set a password
- Enter or create a team code (unique identifier for your team)
- Submit to create account

#### 2. **Join a Team**
- If you have a team code, use it to join existing team
- Or create a new team and invite members

#### 3. **Create & Manage Tasks**
- Navigate to Tasks section
- Click "Create Task"
- Fill in title, description, priority, and deadline
- Assign team members
- Submit to create task

#### 4. **Track Progress**
- View tasks in Kanban board (Todo → In Progress → Review → Done)
- Drag and drop tasks to update status
- Add comments for team collaboration
- Attach files/assets to tasks

#### 5. **Team Collaboration**
- View team members and their workload
- Receive real-time notifications on task updates
- Use collaborative whiteboard for brainstorming
- Export tasks to CSV for reporting

#### 6. **Dashboard Insights**
- View team performance metrics
- Track task completion rates
- Monitor project progress
- Analyze workload distribution

---
