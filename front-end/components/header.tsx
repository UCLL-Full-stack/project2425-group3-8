import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User } from '@types';
import Language from './language/Language';
import { useTranslation } from 'next-i18next';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

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
        {t('home.title')}
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          {t('home.nav.home')}
        </Link>

        {loggedInUser?.role === 'player' && (
          <Link href="/player" className="nav-link px-4 fs-5 text-white">
            {t('home.nav.MyMatches')}
          </Link>
        )}

        {loggedInUser?.role === 'visitor' && (
          <Link href="/visitor" className="nav-link px-4 fs-5 text-white">
            {t('home.nav.MyRegisteredMatches')}
          </Link>
        )}

        {loggedInUser ? (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <a
                onClick={handleLogout}
                className="nav-link px-4 fs-5 text-white cursor-pointer"
              >
                {t('home.nav.Logout')}
              </a>
              <div className="text-white ms-3">
              {t('home.nav.Welcome')} {loggedInUser.role}: {loggedInUser.email}!
              </div>
            </div>
          </>
        ) : (
          <Link href="/login" className="nav-link px-4 fs-5 text-white">
            {t('home.nav.Login')}
          </Link>
        )}
        
      </nav>
      <Language />
    </header>
  );
};

export default Header;
