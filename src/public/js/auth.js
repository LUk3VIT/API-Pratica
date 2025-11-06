const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginMsg = document.querySelector("#loginMsg");
const registerMsg = document.querySelector("#registerMsg");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginMsg.textContent = "";

    const email = e.target.email.value;
    const senha = e.target.senha.value;

    const data = await apiRequest("/api/auth/login", "POST", { email, password: senha });

    if (data.token) {

      localStorage.setItem("token", data.token);
      setTimeout(() => window.location.href = "produtos.html", 200);

    } else {

      loginMsg.textContent = data.message || "O email ou senha está incorreto";
      loginMsg.classList.remove("success");

    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    registerMsg.textContent = "";

    const nome = e.target.nome.value;
    const email = e.target.email.value;
    const senha = e.target.senha.value;

    const data = await apiRequest("/api/auth/register", "POST", { name: nome, email, password: senha });

    if (data.error) {

      registerMsg.textContent = data.message || "Erro no cadastro";
      registerMsg.classList.remove("success");
      return;

    }

    registerMsg.textContent = "Usuário cadastrado com sucesso";
    registerMsg.classList.add("success");

    e.target.reset();
    setTimeout(() => window.location.href = "index.html", 700);
  });
}