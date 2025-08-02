import Home from "./Pages/HomePage";
import RandomJobsPage from "./Pages/RandomJobs";
import JobDetailsPage from "./Pages/JobDetails";
import RandomCompaniesPage from "./Pages/RandomCompanies";
import CompanyDetailsPage from "./Pages/CompanyDetails";
import SearchPage from "./Pages/SearchPage";
import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppNavigation from "./Pages/AppNavigation";
import CandidateSignUpPage from "./Pages/candidateSignUpPage";
import CandidateLogInPage from "./Pages/candidateLogInPage";
import BlogPage from "./Pages/BlogPage";
import ArticlePage from "./Pages/ArticlePage";
import AboutUsPage from "./Pages/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import store, { persistor } from "./store"; // import persistor
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // add PersistGate
import "./localization/i18n";
import { useTranslation } from "react-i18next";
import PostJob from './components/forEmployers/PostJob';
import EmployersSignupForm from './Pages/employersSignUp';
import EmployersLogInForm from './Pages/employersLogIn';
import CandidateProfile from './Pages/candidateProfile';
import OTPRequestComponent from './components/candidates/sendOtp';
import OtpVerify from './components/candidates/OtpVerify';
import PageNotFound from './components/pageNotFound/pageNotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppNavigation />,
    children: [
      { index: true, element: <Home /> },
      { path: "Jobs", element: <RandomJobsPage /> },
      { path: "/Jobs/filter/:filterType/:filterValue", element: <RandomJobsPage /> },
      { path: "Companies", element: <RandomCompaniesPage /> },
      { path: "Search", element: <SearchPage /> },
      { path: "Blog", element: <BlogPage /> },
      { path: "AboutUsPage", element: <AboutUsPage /> },
      { path: "ContactUsPage", element: <ContactUs /> },
      { path: "jobs/:id/:title", element: <JobDetailsPage /> },
      { path: "Companies/:id/:name", element: <CompanyDetailsPage /> },
      { path: "Article/:id", element: <ArticlePage /> },
      { path: "postJob", element: <PostJob /> },
    ],
  },
  { path: "SignUp", element: <CandidateSignUpPage /> },
  { path: "LogIn", element: <CandidateLogInPage /> },
  { path: "employers/SignUp", element: <EmployersSignupForm /> },
  { path: "employers/logIn", element: <EmployersLogInForm /> },
  { path: "profile", element: <CandidateProfile /> },
  { path: "sendOtp", element: <OTPRequestComponent /> },
  { path: "verifyOtp", element: <OtpVerify /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  const { i18n } = useTranslation();
  const [dir, setdir] = useState(i18n.dir(i18n.language));

  useEffect(() => {
    if (i18n.language) {
      const direction = i18n.dir(i18n.language);
      setdir(direction);
      document.documentElement.dir = direction;
    }
  }, [i18n.language]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div dir={dir}>
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
