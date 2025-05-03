import './login.css';

const RegisterPage = () => {
  return (
    <>
      <div className="login-page">
        <div className="login-bg"></div>

        <main className="form-signin">
          <h1 className="h3">Register</h1>

          <form action="">
            <div className="form-floating">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
              />
            </div>

            <div className="form-floating">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-floating">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="form-floating">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                id="termsAgree"
                name="terms_agree"
                required
              />
              <label htmlFor="termsAgree">
                I agree to the terms and conditions
              </label>
            </div>

            <button type="submit" className="btn">
              Register
            </button>
          </form>

          <p className="copyright">&copy; 2025 by thợ săn phú bà</p>
        </main>
      </div>
    </>
  );
};

export default RegisterPage;
