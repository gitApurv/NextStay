import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "NextStay",
  description: "Find the perfect rental Property",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
