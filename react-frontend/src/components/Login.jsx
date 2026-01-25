import { useState } from "react";
import { api } from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      onLogin(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("E-mail ou senha inválidos");
      }
    }
  }

  return (
    <div className="page-login">
      <div className="login-container">
        <div className="login-header">
          <img
            src="/assets/favicon-fm.ico"
            alt="Financial Manager"
            className="login-logo"
          />
          <h1>Financial Manager</h1>
          <h2 className="text-muted">Gerenciador de Finanças</h2>
        </div>

        <br />
        <br />
        <br />
        <br />

        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="h2-login">Login</h2>
          <label className={`alert ${errorMessage ? "visible" : ""}`}>
            {errorMessage}
          </label>

          <div className="form-fields">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-dark px-5 fw-bold">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
