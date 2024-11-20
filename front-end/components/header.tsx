import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("UserEmail");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("Admin");
    sessionStorage.removeItem("UserEmail");
    setLoggedInUser(null);
    window.location.reload(); // Refresh the page to reflect the logged-out state
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-gray-600">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        Sport Events
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>

        {loggedInUser ? (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <a
                onClick={handleLogout}
                className="nav-link px-4 fs-5 text-white cursor-pointer"
              >
                Logout
              </a>
              <div className="text-white ms-3">
                Welcome, {sessionStorage.getItem("Admin") === "true" ? "Admin: " : ""}{loggedInUser}!
              </div>
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="nav-link px-4 fs-5 text-white"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
