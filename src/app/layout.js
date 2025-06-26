import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer/Footer";
import AuthProvider from "./provider/AuthProvider";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import NavBar from "@/component/NavBar/NavBar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tech Hub",
  description: "Tech Hub by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto container mt-[69px]`}
      >
        <AuthProvider>
          <ReactQueryProvider>
            <NavBar></NavBar>
            {children}
            <Footer></Footer>
          </ReactQueryProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
