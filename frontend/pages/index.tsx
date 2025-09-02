import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h1>Welcome to Our App</h1>
      <p>Please login or sign up to continue.</p>
      <div style={{ marginTop: '30px' }}>
        <button
          style={{
            marginRight: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/login')}
        >
          Login
        </button>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/register')}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
