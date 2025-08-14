import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";

import Home from "./pages/Home";
import JobsPage from "./pages/Jobs";
import JobDetailsPage from "./pages/JobDetails";
import CompaniesPage from "./pages/Companies";
import CompanyDetailsPage from "./pages/CompanyDetails";
import SearchPage from "./pages/Search";
import AppLayout from "./appLayout/AppLayout";
import CandidateSignUpPage from "./pages/CandidateSignUp";
import CandidateLogInPage from "./pages/CandidateLogIn";
import BlogPage from "./pages/Blog";
import ArticlePage from "./pages/Article";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import PostJobPage from "./pages/PostJob";
import EmployersSignupPage from "./pages/EmployersSignUp";
import EmployersLogInPage from "./pages/EmployersLogIn";
import CandidateProfilePage from "./pages/CandidateProfile";
import SendOtp from "./pages/SendOtp";
import OtpVerify from "./pages/OtpVerify";
import PageNotFound from "./components/pageNotFound/pageNotFound";

import store from "./store";
import "./localization/i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Jobs", element: <JobsPage /> },
      {
        path: "/Jobs/filter/:filterType/:filterValue",
        element: <JobsPage />,
      },
      { path: "Companies", element: <CompaniesPage /> },
      { path: "Search", element: <SearchPage /> },
      { path: "Blog", element: <BlogPage /> },
      { path: "AboutUsPage", element: <AboutUsPage /> },
      { path: "ContactUsPage", element: <ContactUsPage /> },
      { path: "jobs/:id/:title", element: <JobDetailsPage /> },
      { path: "Companies/:id/:name", element: <CompanyDetailsPage /> },
      { path: "Article/:id", element: <ArticlePage /> },
      { path: "postJob", element: <PostJobPage /> },
    ],
  },
  { path: "SignUp", element: <CandidateSignUpPage /> },
  { path: "LogIn", element: <CandidateLogInPage /> },
  { path: "employers/SignUp", element: <EmployersSignupPage /> },
  { path: "employers/logIn", element: <EmployersLogInPage /> },
  { path: "profile", element: <CandidateProfilePage /> },
  { path: "sendOtp", element: <SendOtp /> },
  { path: "verifyOtp", element: <OtpVerify /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  const { i18n } = useTranslation();
  const [dir, setDir] = useState(i18n.dir(i18n.language));

  useEffect(() => {
    if (i18n.language) {
      const direction = i18n.dir(i18n.language);
      setDir(direction);
      document.documentElement.dir = direction;
    }
  }, [i18n.language]);

  return (
    <Provider store={store}>
      <div dir={dir}>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
