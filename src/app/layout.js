import "./globals.css";

export const metadata = {
  title: "RecycleYuk",
  description: "Platform Daur Ulang Sampah Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
