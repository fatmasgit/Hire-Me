# HireMe – Multi-Role Job Hiring App

[![Vercel Status](https://img.shields.io/github/deployments/fatmasgit/Hire-Me/production?label=vercel&logo=vercel)](https://hire-me-1pmx.vercel.app/)

**Production:** [https://hire-me-1pmx.vercel.app/](https://hire-me-1pmx.vercel.app/)

**HireMe** is a full-featured hiring platform that connects **candidates** and **employers** in a seamless experience.  
It provides **job listings with advanced filtering**, candidate profile management, and employer job posting — all with modern, responsive UI and multilingual support (Arabic & English).  
**Deployed with [Vercel](https://vercel.com/)** for fast and reliable hosting.

---



### For Candidates
- Browse job listings with **advanced filters**:
  - **Location** (city-based search)
  - **Skills** (technical and soft skills)
  - **Job Type** (full-time, part-time)
  - **Work Mode** (remote, on-site, hybrid)
- Maintain a profile with **resume (CV) uploads** and **image assets**.
- Sign up with **email/password** or **Google Authentication**.

### For Employers
- Post new jobs with detailed requirements including descriptions, skills, salary range, and company details.
- Manage posted jobs and applicants in real time.
- Store job-related files securely (descriptions, images, PDFs).
- Sign up with **email/password** or **Google Authentication**.

### General
- **Real-time job updates** powered by Firebase Firestore.
- **Role-based functionality** (candidate or employer).
- **Fast search** with query-based filtering.
- **Multilingual support** – Arabic 🇪🇬 & English 🇬🇧.
- **Responsive design** for mobile and desktop.
- **Deployed with Vercel** for smooth CI/CD and hosting.

## ✨ Features

- **Rich Content Job Posts** – Employers can create detailed job descriptions.
- **Candidate Profile Management** – Real-time profile editing with instant updates.
- **Asset Upload/Download** – Upload CVs, images, and download them anytime.
- **Search Jobs** – Find jobs by category, location, or other filters.
- **Custom Filtering** – Search and filtering logic powered by Redux Toolkit.
- **Responsive UI** – Optimized for mobile, tablet, and desktop.
- **Localization (i18n)** – Supports Arabic 🇪🇬 and English 🇬🇧.
---

## 🛠️ Technologies Used

- **Frontend**:
  - React + React Router
  - Material UI (MUI) – TextFields, Tabs, Buttons, and more
  - Tailwind CSS
  - Formik – Form validation and handling
  - Redux Toolkit + `createAsyncThunk` – State management
- **Backend & Storage**:
  - Firebase Firestore – Job listings and user profiles
  - Firebase Authentication – Email/Password & Google Sign-In
  - Supabase – Asset storage (CVs, images)
- **Other**:
  - Search query filtering
  - Custom filtering logic with Redux
  - i18n for **localization** (Arabic & English)

---

## 📂 Project Structure

public/
├── assets/       # images, icons, etc.
├── fonts/        # Arabic & English font files
├── locales/      # i18n translation files (ar.json, en.json)
└── index         # public index.html


src /

├── appLayout/     # Layout components (header, footer, navigation)

├── components/    # Shared and reusable UI components

├── firebase/      # Firebase configuration & services

├── localization/  # i18n translation files (ar & en)

├── pages/         # Page-level components (Jobs, Profile, Post Job, etc.)

├── redux/slices/  # Redux Toolkit slices for state management

├── superBase/     # Supabase configuration & file handling

├── utils/         # Helper and utility functions



