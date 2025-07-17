import "@/assets/styles/globals.css";

export const metadata = {
  title: "NextStay",
  description: "Find the perfect rental Property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
