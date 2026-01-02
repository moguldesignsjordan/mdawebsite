import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ShopProvider } from '@/context/ShopContext';

export const metadata = {
  title: 'Mogul Design Agency',
  description: 'Design + Automation for high-velocity teams',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark text-light font-sans antialiased">
        <ShopProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}