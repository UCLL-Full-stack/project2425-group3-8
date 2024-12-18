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

        <Link href="/event" className="nav-link px-4 fs-5 text-white">
          {t('home.nav.events')}
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
              <Link href={`/user/${loggedInUser.email}`} className="text-white ms-8">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd" />
                </svg>

              </Link>
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
