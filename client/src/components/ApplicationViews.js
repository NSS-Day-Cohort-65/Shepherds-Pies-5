import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Orders from "./Orders/Orders";
import OrderDetails from "./Orders/OrderDetails";
import { OrderCreationForm } from "./Orders/OrderCreationForm";
import AddPizzaForm from "./pizzas/AddPizzaForm.js";



export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Orders />
            </AuthorizedRoute>
          }
        />
        {/* Below: 
        "The Route group create two routes for workorders. 
        The route marked index will match to workorders with no extra url segments. 
        The create route will match /workorders/create." */}
        <Route
          path="orders"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Orders />
            </AuthorizedRoute>
          }
        />
        <Route
          path="orders/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <OrderDetails />
            </AuthorizedRoute>
          }
        />
        <Route
          path="orders/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <OrderCreationForm />
            </AuthorizedRoute>
          }
        />
        <Route
          path="pizzas/:id/addpizza"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AddPizzaForm />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}

/* <Route path="userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path="details/:id"
            element={
              <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />

        </Route> */