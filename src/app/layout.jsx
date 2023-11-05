import "./globals.css";
import { AuthProvider } from "./Providers";
import { ThemeProvider } from "./components/theme/themeContext";

export const metadata = {
  title: "12 Grade E learning platform ",
  description: "12 Grade E learning platform ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <ThemeProvider>
        <body className="bg-white dark:bg-slate-900">
          <AuthProvider>{children}</AuthProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
