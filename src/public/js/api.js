const API_URL = "http://localhost:3000"; // <--------- mudar aqui quando colocar no azure, ele muda a URL
let sessionHandled = false;

async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (response.status === 401 && !sessionHandled) {
    sessionHandled = true;
    localStorage.removeItem("token");
    alert("Sessão expirada. Faça login novamente.");
    window.location.href = "index.html";
    return { error: true, message: "Sessão expirada" };
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
    alert("Acesso não identificado. Faça login novamente.");
    window.location.href = "index.html";
  }
  return token;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}