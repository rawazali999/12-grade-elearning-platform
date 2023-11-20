import "./globals.css";
import { AuthProvider } from "./Providers";
import { ThemeProvider } from "./components/theme/themeContext";
import Chatbot from "./components/chatbots/Chatbot";
// import DriftChatbot from "@components/chatbots/DriftChatbot";

export const metadata = {
  title: "12 Grade E learning platform ",
  description: "12 Grade E learning platform ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-gray-100">
          <AuthProvider>{children}</AuthProvider>
          {/* <DriftChatbot /> */}
          <Chatbot />
          {/* <script
            src="//code.tidio.co/nucvudpvsriubcgfisql5bqrfpvvqjcr.js"
            async
          ></script> */}
        </body>
      </ThemeProvider>
    </html>
  );
}
