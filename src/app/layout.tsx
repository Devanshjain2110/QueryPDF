
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "./components/navbar";
import Providers from "./components/providers";
import { Toaster } from "@/components/ui/toaster";
import 'simplebar-react/dist/simplebar.min.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
     
      <body
        className={cn(
          "min-h-screen font-sans antialiased grainy",
          inter.className
        )}
      >
         <Providers>
          <Toaster /> 
        <Navbar />
        {children}
        </Providers>
      </body>
    
      
    </html>
  );
}
