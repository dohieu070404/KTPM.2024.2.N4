import './login.css'

const LoginPage = () => {
    return(
      <>
      <div class="login-page">
  <div class="login-bg"></div>

  <main class="form-signin">
    <h1 class="h3">Login</h1>

    <form method='POST' action="{{ url_for('login') }}">
      <div class="form-floating">
        <label for="email">Email address</label>
        <input type="email" id="email" placeholder="name@example.com" required />
      </div>

      <div class="form-floating">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Password" required />
      </div>

      <div class="form-check">
        <input type="checkbox" id="rememberMeSwitch" name="remember_me" />
        <label for="rememberMeSwitch">Remember me</label>
      </div>

      <button type="submit" class="btn">Sign in</button>
    </form>

    <p class="copyright">&copy; 2025 by thợ săn phú bà </p>
  </main>
</div>

      </>
    )
  } 
  
  export default LoginPage;