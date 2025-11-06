const API_URL = "http://localhost:3000"; // <--------- mudar aqui quando colocar no azure, ele muda a URL

async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

    if (response.status === 401) {

    if (!endpoint.includes("/auth/login")) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }

    return await response.json();
    }

  try {
    return await response.json();
  } catch {
    return { error: true, message: "Erro ao processar resposta da API" };
  }
}

function verifyLogin() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "index.html";
  }

  return token;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}