import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
// import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import RestaurantDetails from "./pages/RestaurantDetails";
import OrderStatusPage from "./pages/OrderStatusPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginPage from "./pages/LoginPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      {/* <Route path="/auth-callback" element={<AuthCallbackPage />} /> */}
      <Route
        path="/search/:city"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>
      {/* <Route element={<ProtectedRoute />}> */}
      <Route
        path="/user-restaurant"
        element={
          <Layout>
            <ManageRestaurantPage />
          </Layout>
        }
      />
      <Route
        path="restaurant/:restaurantId"
        element={
          <Layout>
            <RestaurantDetails />
          </Layout>
        }
      />

      <Route
        path="/order-status"
        element={
          <Layout>
            <OrderStatusPage />
          </Layout>
        }
      />

      <Route
        path="/register"
        element={
          <Layout>
            <RegisterUserPage />
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      {/* </Route> */}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
