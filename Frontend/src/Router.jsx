// src/Router.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/Layouts/AppLayout";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { About } from "./pages/About";
import { ExperienceGet } from "./pages/Experience/ExperienceGet";
import { ExperienceAdd } from "./pages/Experience/ExperienceAdd";
import { ExperienceUpdate } from "./pages/Experience/ExperienceUpdate";
import { ProjectGet } from "./pages/Projects/ProjectGet";
import { ProjectAdd } from "./pages/Projects/ProjectAdd";
import { ProjectUpdate } from "./pages/Projects/ProjectUpdate";
import { SkillGet } from "./pages/Skills/SkillGet";
import { SkillAdd } from "./pages/Skills/SkillAdd";
import { SkillUpdate } from "./pages/Skills/SkillUpdate";
import { ProfileGet } from "./pages/Profile/ProfileGet";
import { ProfileUpdate } from "./pages/Profile/ProfileUpdate";
import { AdminLogin } from "./pages/Admin/AdminLogin";
import { AdminRegister } from "./pages/Admin/AdminRegister";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <Home />,
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/get-experience",
        element: <ExperienceGet/>
      },
      {
        path: "/add-experience",
        element: <ExperienceAdd/>
      },
      {
        path: "/update-experience",
        element: <ExperienceUpdate/>
      },
      {
        path: "/get-project",
        element: <ProjectGet/>
      },
      {
        path: "/add-project",
        element: <ProjectAdd/>
      },
      {
        path: "/update-project",
        element: <ProjectUpdate/>
      },
      {
        path: "/get-skill",
        element: <SkillGet/>
      },
      {
        path: "/add-skill",
        element: <SkillAdd/>
      },
      {
        path: "/update-skill",
        element: <SkillUpdate/>
      },
      {
        path: "/get-profile",
        element: <ProfileGet/>
      },
      {
        path: "/update-profile",
        element: <ProfileUpdate/>
      },
      {
        path: "/login",
        element: <AdminLogin/>
      },
      {
        path: "/register",
        element: <AdminRegister/>
      }
    ],
  },
]);

export const AppRouter = () => {

    const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
  
};