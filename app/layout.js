import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Components/theme/ThemeProvider";
import Header from "./Components/Header/Header";
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "./Components/context/UserContext";
import { CartProvider } from "./Components/context/CartContext";




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
          <CartProvider>

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
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
