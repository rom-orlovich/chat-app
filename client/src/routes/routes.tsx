import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import { getAppRoutes } from "../lib/appRoutes";
import { messagesUrlAPI } from "../lib/endpoints";
import { Message } from "../lib/types/messages.types";
import ChatPage from "../pages/chat/ChatPage";
import HomePage from "../pages/home/HomePage";

import ProtectedRoute from "./components/ProtectedRoute";

export const routes = createBrowserRouter([
  {
    path: getAppRoutes("HOME"),
    element: <ProtectedRoute />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: getAppRoutes("CHAT"),
        element: <ChatPage />,
        loader: async () => {
          const data = await axios.get<Message[]>(messagesUrlAPI());
          return data;
        },
      },
    ],
  },
]);
