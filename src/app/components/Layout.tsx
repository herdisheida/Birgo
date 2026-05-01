import { Package, ArrowLeft, Calendar } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E8EBEF' }}>
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: '#E8EBEF' }}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6FAEF2' }}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl" style={{ color: '#1D3C6E', fontWeight: '600' }}>
                Birgó
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              to="/subscriptions"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ color: '#1D3C6E' }}
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">My Subscriptions</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 mt-auto" style={{ backgroundColor: '#1D3C6E' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6FAEF2' }}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-white" style={{ fontWeight: '600' }}>
                Birgó
              </span>
            </div>
            <nav className="flex gap-6 text-white text-sm">
              <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
              <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Terms</a>
            </nav>
          </div>
          <div className="text-center mt-6 text-white opacity-60 text-sm">
            © 2026 Birgó. Þú gleymir, við reddum!
          </div>
        </div>
      </footer>
    </div>
  );
}
