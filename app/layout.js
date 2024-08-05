import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Components/theme/ThemeProvider";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mechanic App",
  description: "Store and mechanic solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
        </ThemeProvider>      
      </body>
    </html>
  );
}
