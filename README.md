# Employee Management System

## Overview

The **Employee Management System** is a full-stack application designed to facilitate the management of employee records and related processes. This system provides an intuitive interface for HR personnel and administrators to manage employee data, leave requests, performance evaluations, and time tracking. The application is built with a **NestJS** backend and a **ReactJS** frontend, ensuring a seamless and responsive user experience.

## Features

- **User Management**: CRUD operations for employee records, with role-based access (employee, HR, admin).
- **Leave Management**: Submit and approve leave requests with notification systems.
- **Performance Evaluation**: Conduct and manage performance evaluations, including rating systems.
- **Time Tracking**: Log and validate work hours, facilitating better attendance management.
- **Notifications**: Real-time notifications for leave requests and evaluations to keep users informed.
- **Reporting**: Generate statistical reports on employees for data-driven decision-making.
- **Security**: Implemented security best practices, including JWT-based authentication and role management.

## Technology Stack

- **Backend**: NestJS, TypeORM (MySQL), Passport.js with JWT for authentication.
- **Frontend**: ReactJS, Tailwind CSS for responsive design.
- **Additional Libraries**: Multer for file uploads, Bull (cron) for task scheduling, and rate limiting for API security.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A MySQL database set up for the application.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SouFien19/Employee-Management-System.git
