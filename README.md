# Smart Queue Management System

A full-stack Node.js application to manage service queues for multiple user roles (admin, staff, customer, guest). This system provides:

- **Role-based access** (Admin, Staff, Customer, Guest)
- **Queue creation & assignment**
- **Real-time queue status updates**
- **User authentication & validation**
- **Configurable policies & workflows**

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Installation](#installation)  
5. [Configuration](#configuration)  
6. [File Structure](#file-structure)  
7. [Usage](#usage)  
8. [API Routes](#api-routes)  
9. [Utilities](#utilities)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## Features

- **Admins** can configure policies, view all queues, seed users, and manage system settings.
- **Staff** can call next ticket, view pending queues, and mark services complete.
- **Customers** can take a ticket, see their position, and receive notifications.
- **Guests** can view queue information without logging in.
- **Policies** are defined in JSON/JS for easy customization.
- **Hashing** and **validation** utilities ensure secure data handling.
- Modular code structure for easy maintenance and extension.

---

## Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Authentication**: JSON Web Tokens (JWT)  
- **Validation**: Custom validator utility  
- **Frontend**: Plain HTML/CSS/JS in `public/`  
- **Others**: bcrypt for hashing, dotenv for environment variables

---

## Prerequisites

- [Node.js](https://nodejs.org/) v14+  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  
- A running **MongoDB** instance (local or Atlas)  

---

## Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/EngAbdullah743/smart-queue-management-system.git
   cd smart-queue-management-system


<img width="341" height="665" alt="image" src="https://github.com/user-attachments/assets/8a146fc0-749f-4c91-ba5f-5ee4c75ec3ff" />
<br>
<img width="330" height="171" alt="image" src="https://github.com/user-attachments/assets/72eda8c4-222a-435b-827b-d103de6a1f23" />

