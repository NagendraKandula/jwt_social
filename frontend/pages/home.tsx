import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome to the Dashboard</h1>
        <div className={styles.menu}>
          ☰
          <div className={styles.dropdown}>
            <p>Profile</p>
            <p>Settings</p>
            <p>Logout</p>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <h2>Dashboard Content</h2>
        <p>This is the post-login homepage.</p>
      </main>
    </div>
  );
}
