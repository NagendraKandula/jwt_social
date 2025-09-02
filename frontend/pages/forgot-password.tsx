import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Register.module.css';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const sendOtp = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:4000/auth/forgot-password', { email });
      setMessage(res.data.message);
      setStep(2);
      setResendTimer(60); // Start 60 seconds cooldown
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:4000/auth/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <button onClick={sendOtp} className={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button onClick={resetPassword} className={styles.button} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          <button
            onClick={sendOtp}
            className={styles.button}
            disabled={resendTimer > 0 || loading}
            style={{ marginTop: '10px' }}
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </button>
        </>
      )}

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
