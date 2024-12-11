import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User } from '@types';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    router.push("/"); 
    window.location.reload();
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

        {loggedInUser?.role === 'player' && (
          <Link href="/player" className="nav-link px-4 fs-5 text-white">
            My Matches
          </Link>
        )}

        {loggedInUser?.role === 'visitor' && (
          <Link href="/visitor" className="nav-link px-4 fs-5 text-white">
            My Registered Matches
          </Link>
        )}

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
                Welcome {loggedInUser.role}: {loggedInUser.email}!
              </div>
            </div>
          </>
        ) : (
          <Link href="/login" className="nav-link px-4 fs-5 text-white">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
