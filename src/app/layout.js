import "./globals.css";
import { AuthProvider } from '@/components/providers/AuthProvider';

export const metadata = {
  title: "RecycleYuk",
  description: "Platform Daur Ulang Sampah Digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
