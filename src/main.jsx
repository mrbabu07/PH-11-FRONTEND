
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import "./index.css";
import { AuthProvider } from "./Context/AuthProvider";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <>
  
    <AuthProvider>
      
      <RouterProvider router={router} />
      
      <Toaster/>
      
    </AuthProvider>
    
  </>
  
);
