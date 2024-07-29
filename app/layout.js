import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Components/theme/ThemeProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mechanic App",
  description: "Store and mechanic solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >

      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
      </ThemeProvider>
        
      </body>
    </html>
  );
}
