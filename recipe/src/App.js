import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./UserContext";
import Layout from "./Layout";
import Main from "./Main";
import Login from "./Login";
import FindEmail from "./FindEmail";
import FindPw from "./FindPw";
import ResetPw from "./ResetPw";
import SignUp from "./SignUp";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";
import ScrapedRecipe from "./ScrapedRecipe";
import Profile from "./Profile";
import DeleteRecipe from "./DeleteRecipe";
import ReportManagement from "./ReportManagement";
import UserManagement from "./UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/login", element: <Login /> },
      { path: "/findEmail", element: <FindEmail /> },
      { path: "/findPw", element: <FindPw /> },
      { path: "/resetPw", element: <ResetPw /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/recipe/:id", element: <RecipeDetail /> },
      { path: "/addRecipe", element: <AddRecipe /> },
      { path: "/scrapedRecipe", element: <ScrapedRecipe /> },
      { path: "/profile", element: <Profile /> },
      { path: "/deleteRecipe", element: <DeleteRecipe /> },
      { path: "/reportManagement", element: <ReportManagement /> },
      { path: "/userManagement", element: <UserManagement /> }
    ]
  }
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;