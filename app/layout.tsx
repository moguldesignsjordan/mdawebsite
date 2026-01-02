import './globals.css';
import Header from './components/Header'; // Fixed spelling
import Footer from './components/Footer'; // Fixed spelling
import { ShopProvider } from '@/context/ShopContext';

// ... rest of filere this path is correct

export const metadata = {
  title: 'Mogul Design Agency',
  description: 'Design + Automation for high-velocity teams',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark text-light font-sans selection:bg-primary selection:text-white">
        {/* We wrap the app in the ShopProvider for cart functionality */}
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