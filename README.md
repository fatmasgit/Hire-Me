# HireMe – Multi-Role Job Hiring App

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-NETLIFY-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-NETLIFY-SITE-NAME/deploys)

**Live Demo:** [https://YOUR-NETLIFY-SITE-NAME.netlify.app](https://YOUR-NETLIFY-SITE-NAME.netlify.app)

**HireMe** is a full-featured hiring platform that connects **candidates** and **employers** in a seamless experience.  
It provides **job listings with advanced filtering**, candidate profile management, and employer job posting — all with modern, responsive UI and multilingual support (Arabic & English).  
**Deployed with [Netlify](https://www.netlify.com/)** for fast and reliable hosting.

---

## 🚀 Features

### For Candidates
- Browse job listings with **advanced filters**:
  - **Location** (city-based search)
  - **Skills** (technical and soft skills)
  - **Job Type** (full-time, part-time)
  - **Work Mode** (remote, on-site, hybrid)
- Apply to jobs directly and **save application history**.
- Maintain a profile with **resume (CV) uploads** and **image assets**.
- Sign up with **email/password** or **Google Authentication**.

### For Employers
- Post new jobs with detailed requirements.
- Manage posted jobs and applicants in real time.
- Store job-related files securely (descriptions, images, PDFs).
- Sign up with **email/password** or **Google Authentication**.

### General
- **Real-time job updates** powered by Firebase Firestore.
- **Role-based functionality** (candidate or employer).
- **Fast search** with query-based filtering.
- **Multilingual support** – Arabic 🇪🇬 & English 🇬🇧.
- **Responsive design** for mobile and desktop.
- **Deployed with Netlify** for smooth CI/CD and hosting.

---

## 🛠️ Technologies Used

- **Frontend**:
  - React + React Router
  - Material UI (MUI) – TextFields, Tabs, Buttons, and more
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

