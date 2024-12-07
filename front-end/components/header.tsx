import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isPlayer, setIsPlayer] = useState<boolean>(false);
  const [isVisitor, setIsVisitor] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("UserEmail");
    if (user) {
      setLoggedInUser(user);
    }
    const playerStatus = sessionStorage.getItem("role") === "player";
    setIsPlayer(playerStatus);
    const visitorStatus = sessionStorage.getItem("role") === "visitor";
    setIsVisitor(visitorStatus);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("UserEmail");
    setIsVisitor(false);
    setIsPlayer(false);
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

        {isPlayer && (
          <Link href="/player" className="nav-link px-4 fs-5 text-white">
            My Matches
          </Link>
        )}

        {isVisitor && (
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
                Welcome {sessionStorage.getItem("role")}: {loggedInUser}!
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
