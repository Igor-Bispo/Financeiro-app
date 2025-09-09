// Minimal, clean AnalyticsPage implementation
import perf from '@core/telemetry/perf.js';

export function renderTelemetrySection(container, { _year, _month } = {}) {
  try {
    if (!perf || typeof perf.isEnabled !== 'function' || !perf.isEnabled()) return;
    const log = Array.isArray(perf.getLog ? perf.getLog() : []) ? perf.getLog() : [];
    const root = container || document.getElementById('app-root') || document.body;
    const el = document.createElement('div'); el.className = 'analytics-telemetry';
    const title = document.createElement('h3'); title.textContent = 'Telemetria Local'; el.appendChild(title);

    // Controls: count, event filter, min duration, export
    const controls = document.createElement('div'); controls.className = 'telem-controls';
    const countEl = document.createElement('div'); countEl.id = 'telem-count'; countEl.style.fontWeight = '600'; controls.appendChild(countEl);

    const eventSel = document.createElement('select'); eventSel.setAttribute('data-testid', 'telem-event-filter');
    const optAll = document.createElement('option'); optAll.value = ''; optAll.textContent = 'Todos eventos'; eventSel.appendChild(optAll);
    const events = Array.from(new Set((log || []).map(l => l.event).filter(Boolean)));
    events.forEach(ev => { const o = document.createElement('option'); o.value = ev; o.textContent = ev; eventSel.appendChild(o); });
    controls.appendChild(eventSel);

    const minInput = document.createElement('input'); minInput.setAttribute('data-testid', 'telem-min-duration'); minInput.type = 'number'; minInput.placeholder = 'Min ms'; minInput.style.width = '80px'; controls.appendChild(minInput);

    const exportBtn = document.createElement('button'); exportBtn.setAttribute('data-testid', 'telem-export'); exportBtn.textContent = 'Exportar CSV'; controls.appendChild(exportBtn);

    el.appendChild(controls);

    const list = document.createElement('ul'); list.id = 'telem-list'; el.appendChild(list);

    const buildFiltered = () => {
      const ev = eventSel.value || null;
      const min = Number(minInput.value) || 0;
      return (log || []).filter(l => {
        if (ev && l.event !== ev) return false;
        if (typeof l.durationMs === 'number' && l.durationMs < min) return false;
        return true;
      });
    };

    const renderList = () => {
      const items = buildFiltered();
      countEl.textContent = String(items.length);
      list.innerHTML = '';
      items.slice(0, 200).forEach(it => {
        const li = document.createElement('li'); li.textContent = `${it.ts || it.ts === 0 ? it.ts : ''} ${it.event || ''} ${(it.durationMs || 0).toFixed(1)}ms`;
        list.appendChild(li);
      });
    };

    eventSel.addEventListener('change', renderList);
    minInput.addEventListener('input', renderList);

    exportBtn.addEventListener('click', () => {
      try {
        const items = buildFiltered();
        const header = 'ts,event,durationMs,meta';
        const rows = items.map(it => {
          const ts = it.ts || '';
          const meta = JSON.stringify(it.extra || {});
          return `${ts},${(it.event||'')},${(it.durationMs||0)},${meta}`;
        });
        const csv = [header].concat(rows).join('\n');
        try { window.__lastExportCsv = csv; } catch {}
      } catch {}
    });

    // initial render
    renderList();
    root.appendChild(el);
  } catch {
    // keep safe in tests
  }
}

export async function renderAnalytics(container) {
  const root = container || document.getElementById('app-root') || document.body;
  root.innerHTML = '';
  const holder = document.createElement('div'); holder.id = 'analytics-sections'; root.appendChild(holder);
  renderTelemetrySection(holder, {});
  return root;
}
