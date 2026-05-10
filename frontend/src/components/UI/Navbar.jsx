import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, History, Home } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const isInterview = pathname === '/interview';

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <BrainCircuit size={22} />
          <span>InterviewAI</span>
        </Link>
        {!isInterview && (
          <div className={styles.links}>
            <Link to="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>
              <Home size={16} /> Home
            </Link>
            <Link to="/history" className={`${styles.link} ${pathname === '/history' ? styles.active : ''}`}>
              <History size={16} /> History
            </Link>
            <Link to="/setup" className="btn btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.88rem' }}>
              Start Interview
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
