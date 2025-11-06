const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const senha = e.target.senha.value;

    const data = await apiRequest("/login", "POST", { email, senha });

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
      window.location.href = "produtos.html";
    } else {
      alert(data.message || "Falha no login.");
    }
    
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const email = e.target.email.value;
    const senha = e.target.senha.value;

    const data = await apiRequest("/cadastra", "POST", { nome, email, senha });

    if (data.message) alert(data.message);
    else alert("Usuário cadastrado!");

    window.location.href = "index.html";
  });
}
