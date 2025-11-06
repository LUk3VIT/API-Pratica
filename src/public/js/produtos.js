const token = verifyLogin();
const form = document.querySelector("#produtoForm");
const list = document.querySelector("#listaProdutos");

const logoutBtn = document.querySelector("#logout");
if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const preco = parseFloat(e.target.preco.value);

    const data = await apiRequest("/produtos", "POST", { nome, preco }, token);
    if (data.error) return alert(data.message);
    alert("Produto criado!");
    form.reset();
    carregarProdutos();
  });
}

async function carregarProdutos() {
  if (!list) return;
  const produtos = await apiRequest("/produtos", "GET", null, token);

  list.innerHTML = "";
  produtos.forEach((p) => {
    const item = document.createElement("li");

    item.innerHTML = `
      <strong>${p.nome}</strong> - R$ ${p.preco}
      <button onclick="editProd(${p.id})">✏️</button>
      <button onclick="deleteProd(${p.id})">🗑️</button>
    `;

    list.appendChild(item);
  });
}

async function editProd(id) {
  const novoNome = prompt("Novo nome:");
  const novoPreco = parseFloat(prompt("Novo preço:"));
  await apiRequest(`/produtos/${id}`, "PUT", { nome: novoNome, preco: novoPreco }, token);
  carregarProdutos();
}

async function deleteProd(id) {
  await apiRequest(`/produtos/${id}`, "DELETE", null, token);
  carregarProdutos();
}

carregarProdutos();
