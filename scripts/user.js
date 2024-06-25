const apiUrl = '/api/usuarios';
const userTable = document.getElementById('userTable');
const userForm = document.getElementById('userForm');

// Função para buscar todos os usuários
async function getAllUsers() {
  try {
    const response = await fetch(apiUrl);
    const users = await response.json();
    renderUserTable(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

// Função para renderizar a tabela de usuários
function renderUserTable(users) {
  userTable.querySelector('tbody').innerHTML = ''; // Limpa a tabela
  users.forEach(user => {
    const row = userTable.insertRow();
    row.insertCell().textContent = user.nome;
    row.insertCell().textContent = user.email;
    row.insertCell().textContent = user.idade;
  });
}

// Event listener para o formulário
userForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const idade = document.getElementById('idade').value;

  const userData = { nome, email, idade };
  await createUser(userData);

  // Limpa o formulário
  userForm.reset();
});

// ... (outras funções para buscar, atualizar e deletar usuários)
