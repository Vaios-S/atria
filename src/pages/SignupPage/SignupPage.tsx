// React
import { useState } from "react";

// Libraries
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

// Components

// Utils / constants

//Types

//Styles
import "./SignupPage.css";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignUp = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const result = await supabase.auth.signUp({
      email,
      password,
    });

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setError(null);
    setSuccessMessage("Check your email to confirm your account.");
  };

  return (
    <main className="signup-page">
      <section className="signup-card" aria-labelledby="signup-title">
        <div className="signup-header">
          <p className="signup-eyebrow">Join Atria</p>

          <h1 id="signup-title" className="signup-title">
            Sign up to Atria
          </h1>

          <p className="signup-description">
            Start your journey and create your first space.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="signup-field">
            <label className="signup-label" htmlFor="email">
              Email
            </label>

            <input
              className="signup-input"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="password">
              Password
            </label>

            <input
              className="signup-input"
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <p
              className={`signup-password-hint ${
                password.length >= 6 ? "signup-password-hint--valid" : ""
              }`}
            >
              Use at least 6 characters.
            </p>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="confirmPassword">
              Confirm password
            </label>

            <input
              className="signup-input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="signup-error" role="alert">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="signup-success" role="status">
              {successMessage}
            </p>
          )}

          <button className="signup-submit" type="submit">
            Create account
          </button>
        </form>

        <p className="signup-login">
          Already have an account?{" "}
          <Link className="signup-login-link" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
