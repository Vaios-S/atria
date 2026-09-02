// React
import { useState } from "react";

// Libraries
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

// Components

// Utils / constants

//Types

//Styles
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setError(null);
    navigate("/");
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-header">
          <p className="login-eyebrow">Welcome back</p>

          <h1 id="login-title" className="login-title">
            Sign in to Atria
          </h1>

          <p className="login-description">
            Return to your spaces and continue where you left off.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <label className="login-label" htmlFor="email">
              Email
            </label>

            <input
              className="login-input"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              Password
            </label>

            <input
              className="login-input"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button className="login-submit" type="submit">
            Sign in
          </button>
        </form>
        <p className="login-signup">
          Don&apos;t have an account?{" "}
          <Link className="login-signup-link" to="/signup">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}
