// Componente CategoryForm (features/categories/CategoryForm.js)
// Gera o HTML do formulário de categoria, pronto para integração com voz e validação.

export default function CategoryForm() {
  return `
    <form id="form-categoria" class="flex flex-col gap-4">
      <input id="nome-categoria" type="text" placeholder="Nome da categoria" class="border rounded px-3 py-3" required />
      <select id="tipo-categoria" class="border rounded px-3 py-3">
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>
      <input id="limite-categoria" type="number" step="0.01" min="0" placeholder="Limite (opcional)" class="border rounded px-3 py-3" />
      <div class="flex gap-2">
        <button type="button" id="mic-categoria" class="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-3 shadow transition" aria-label="Adicionar por voz">🎤</button>
        <button type="submit" class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex-1">Adicionar Categoria</button>
      </div>
    </form>
  `;
} 