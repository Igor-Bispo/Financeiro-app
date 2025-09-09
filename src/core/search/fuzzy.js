// Fuzzy search helpers extracted for unit testing without DOM coupling.
// Mirrors logic used in global and fallback search implementations.

export function norm(txt) {
  return (txt ?? '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function lev(a, b) {
  if (a === b) return 0;
  const la = a.length, lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;
  if (Math.abs(la - lb) > 1) return 2; // early exit: we only care distance <=1
  const dp = Array(la + 1).fill(0).map(() => Array(lb + 1).fill(0));
  for (let i = 0; i <= la; i++) dp[i][0] = i;
  for (let j = 0; j <= lb; j++) dp[0][j] = j;
  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1); // transposition
      }
    }
  }
  return dp[la][lb];
}

export function approxIncludes(haystack, needle) {
  const h = norm(haystack);
  const n = norm(needle);
  if (!n) return true;
  if (h.includes(n)) return true;
  const parts = h.split(/\s+/).filter(Boolean);
  for (const p of parts) {
    if (Math.abs(p.length - n.length) <= 1 && lev(p, n) <= 1) return true;
  }
  return (Math.abs(h.length - n.length) <= 1 && lev(h, n) <= 1);
}

// Generic filter utilities replicating production logic (period restriction done outside here when needed)
export function filterTransactions(transactions, categories, query, { year, month }) {
  const q = norm(query);
  return transactions.filter(t => {
    // Period gate
    const d = new Date(t.createdAt);
    if (!(d.getFullYear && d.getFullYear() === year && (d.getMonth() + 1) === month)) return false;
    const desc = t.descricao || '';
    const cat = categories.find(c => c.id === t.categoriaId);
    const catName = cat?.nome || '';
    const valorStr = String(t.valor ?? '');
    return approxIncludes(desc, q) || approxIncludes(catName, q) || valorStr.includes(q);
  });
}

export function filterCategories(categories, query) {
  const q = norm(query);
  return categories.filter(cat => {
    const nome = cat.nome || '';
    const tipo = cat.tipo || '';
    const limite = String(cat.limite ?? '');
    return approxIncludes(nome, q) || approxIncludes(tipo, q) || limite.includes(q);
  });
}
