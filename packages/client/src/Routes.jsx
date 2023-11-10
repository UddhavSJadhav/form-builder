import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// import useAuth from "./hooks/useAuth.js";

import Layout from "./sections/Layout";

//preloaded-pages
import Forms from "./pages/Forms";
import AddNewForm from "./pages/AddNewForm";

//lazyloaded-pages
const Responses = lazy(() => import("./pages/Responses"));
const Preview = lazy(() => import("./pages/Preview.jsx"));
const EditForm = lazy(() => import("./pages/EditForm.jsx"));

const Router = () => {
  //   const { auth } = useAuth();

  //   const PrivateRoute = ({ ...rest }) =>
  //     auth?.accessToken ? (
  //       <Outlet />
  //     ) : (
  //       <Navigate to="/login" state={{ from: rest.location }} replace />
  //     );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Forms />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/forms" element={<Forms />} />
        <Route path="/forms/responses/:formId" element={<Responses />} />
        <Route path="/forms/add-new-form" element={<AddNewForm />} />
        <Route path="/forms/edit-form/:formId" element={<EditForm />} />
        <Route path="/forms/preview/:formId" element={<Preview />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
};

export default Router;
