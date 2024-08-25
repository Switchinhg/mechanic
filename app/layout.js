import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Components/theme/ThemeProvider";
import Header from "./Components/Header/Header";
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "./Components/context/UserContext";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mechanic App",
  description: "Store and mechanic solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
