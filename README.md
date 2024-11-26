# **RBAC Dashboard**

A Role-Based Access Control (RBAC) dashboard that allows administrators to manage users, roles, and permissions efficiently. This project showcases user-friendly and dynamic UI design, integrated with a mock backend API using `json-server`.

---

## **Table of Contents**
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

---

## **Introduction**
This project is designed to simulate an admin dashboard for managing users, roles, and permissions as part of a Role-Based Access Control (RBAC) system. It features user-friendly CRUD operations and a mock API for seamless simulation of a real-world application.

---

## **Features**
1. **User Management**:
   - View, add, edit, or delete users.
   - Assign roles and toggle user status (Active/Inactive).

2. **Role Management**:
   - Define, view, and edit roles.
   - Assign or modify permissions for roles.

3. **Dynamic Permissions**:
   - Easily view and manage permissions for roles.

4. **Mock API**:
   - Simulates CRUD operations using `json-server`.

5. **Responsive Design**:
   - Fully responsive UI for desktop and mobile devices.

---

## **Tech Stack**
- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: JSON Server (for mock API)
- **Libraries**: Axios (for API requests)

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rbac-dashboard.git
   cd rbac-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `db.json` file in the root directory and add the following content:
   ```json
   {
      "users": [
         {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "role": "Admin",
            "status": "active",
            "createdAt": "2024-03-15"
         },
         {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "role": "Editor",
            "status": "active",
            "createdAt": "2024-03-14"
         },
         {
            "id": 3,
            "name": "Mike Johnson",
            "email": "mike@example.com",
            "role": "Viewer",
            "status": "inactive",
            "createdAt": "2024-03-13"
         },
         {
            "name": "shanmukh sai",
            "email": "shanmukh@gmail.com",
            "role": "Editor",
            "status": "active",
            "createdAt": "2024-11-26",
            "id": "ba50"
         },
         {
            "name": "venky",
            "email": "venky@gmail.com",
            "role": "Viewer",
            "status": "inactive",
            "createdAt": "2024-11-26",
            "id": "829f"
         }
      ],
      "permissions": [
         {
            "id": 1,
            "name": "view_users",
            "description": "View user list and details",
            "module": "Users"
         },
         {
            "id": 2,
            "name": "manage_users",
            "description": "Create, update, and delete users",
            "module": "Users"
         },
         {
            "id": 3,
            "name": "view_roles",
            "description": "View role list and details",
            "module": "Roles"
         },
         {
            "id": 4,
            "name": "manage_roles",
            "description": "Create, update, and delete roles",
            "module": "Roles"
         }
      ],
      "roles": [
         {
            "id": 1,
            "name": "Admin",
            "description": "Full system access",
            "permissions": [
            1,
            2,
            3,
            4
            ]
         },
         {
            "id": 2,
            "name": "Editor",
            "description": "Can edit content and manage users",
            "permissions": [
            2,
            3
            ]
         },
         {
            "id": 3,
            "name": "Viewer",
            "description": "Read-only access",
            "permissions": [
            1,
            3
            ]
         }
      ]
   }
   ```

4. Start the mock API server:
   ```bash
   npx json-server --watch db.json --port 5000
   ```

5. Start the React development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## **Project Structure**

Here is an overview of the folder structure for this project:

```
rbac-dashboard/
├── src/
│   ├── components/            # Reusable components
│   │   ├── forms/             # Form components (e.g., UserForm.jsx)
│   │   ├── layout/            # Layout components (e.g., SideBar.jsx, Header.jsx, Layout.jsx)
│   │   └── modal/             # Modal components (e.g., Modal.jsx)
│   ├── pages/                 # Page-level components
│   │   ├── Dashboard.jsx      # Dashboard page
│   │   ├── Users.jsx          # Users management page
│   │   ├── Roles.jsx          # Roles management page
│   │   ├── Permissions.jsx    # Permissions management page
│   ├── App.js                 # Main application file
│   ├── index.js               # Entry point
│   └── ...                    # Other files (styles, helpers, etc.)
├── db.json                    # Mock database file
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

---

## **Usage**
- Navigate to the `Users` page to manage users.
- Use the `Roles` page to manage roles and permissions.
- All operations, such as adding, editing, and deleting, are reflected dynamically using the mock API.

---

## **API Endpoints**
1. **Users**
   - `GET /users`: Retrieve all users.
   - `POST /users`: Add a new user.
   - `PUT /users/:id`: Update a user.
   - `DELETE /users/:id`: Delete a user.

2. **Roles**
   - `GET /roles`: Retrieve all roles.
   - `POST /roles`: Add a new role.
   - `PUT /roles/:id`: Update a role.
   - `DELETE /roles/:id`: Delete a role.

3. **Permissions**
   - `GET /permissions`: Retrieve all permissions.

---

## **Screenshots**

Here are some screenshots of the application:

### Dashboard:
![Dashboard Screenshot]("C:\Users\SS-ANDROID-002\Downloads\project-bolt-sb1-2hbjik (1)\dashboard.png")

### User Management:
![User Management Screenshot]("C:\Users\SS-ANDROID-002\Downloads\project-bolt-sb1-2hbjik (1)\users.png")

### Role Management:
![Role Management Screenshot]("C:\Users\SS-ANDROID-002\Downloads\project-bolt-sb1-2hbjik (1)\roles.png")

### Permission Management:
![Permission Management Screenshot]("C:\Users\SS-ANDROID-002\Downloads\project-bolt-sb1-2hbjik (1)\permissions.png")