const token = verifyLogin();
const form = document.querySelector("#produtoForm");
const list = document.querySelector("#listaProdutos");
const logoutBtn = document.querySelector("#logout");

if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.nome.value;
    const preco = e.target.preco.value;

    const data = await apiRequest("/api/produto", "POST", { name, preco }, token);

    if (data.error) {
      if (data.message !== "Sessão expirada") alert(data.error || data.message);
      form.reset();
      return;
    }

    form.reset();
    carregarProdutos();
  });
}

async function carregarProdutos() {
  if (!list) return;

  const produtos = await apiRequest("/api/produto", "GET", null, token);

  if (!Array.isArray(produtos)) {
    if (produtos.message !== "Sessão expirada") {
      console.error("Resposta inesperada:", produtos);
      alert("Erro ao carregar produtos");
    }
    return;
  }

  list.innerHTML = "";
  produtos.forEach((p) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <span class="produto-nome"><strong>${p.name}</strong></span> 
      <span class="produto-preco">R$ ${p.preco.toFixed(2)}</span>
      <button id="editButton" class="btn-acao" onclick="editProd('${p.name}')">✏️</button>
      <button id="deleteButton" class="btn-acao" onclick="deleteProd('${p.name}')">🗑️</button>
    `;
    list.appendChild(item);
  });
}

async function editProd(name) {
  const novoNome = prompt("Novo nome:", name);
  const novoPreco = parseFloat(prompt("Novo preço:"));
  if (!novoNome || isNaN(novoPreco)) return alert("Dados inválidos");

  await apiRequest(`/api/produto/${name}`, "PUT", { newName: novoNome, preco: novoPreco }, token);
  carregarProdutos();
}

async function deleteProd(name) {
  if (!confirm(`Deseja realmente excluir "${name}"? Essa ação é irreversível.`)) return;
  await apiRequest(`/api/produto/${name}`, "DELETE", null, token);
  carregarProdutos();
}

carregarProdutos();