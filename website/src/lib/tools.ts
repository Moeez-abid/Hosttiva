// Helpers shared by the client-side tool scripts.
export const DOMAIN_RE = /^(?=.{1,253}$)(?!-)([a-z0-9-]{1,63}(?<!-)\.)+[a-z]{2,63}$/i;

export function cleanDomain(input: string): string {
  return input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#:]/)[0].replace(/\.$/, '');
}

export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text?: string) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

export function message(out: HTMLElement, text: string, tone: 'muted' | 'error' = 'muted') {
  out.replaceChildren(el('p', tone === 'error' ? 'text-danger' : 'text-muted', text));
}

/** Small table builder: rows of strings, first column mono-accented. */
export function table(head: string[], rows: string[][]) {
  const wrap = el('div', 'overflow-x-auto');
  const t = el('table', 'w-full min-w-[32rem] text-left font-mono text-xs');
  const thead = el('thead', 'text-faint uppercase');
  const hr = el('tr');
  head.forEach((h) => hr.append(el('th', 'py-2 pr-4 font-medium', h)));
  thead.append(hr);
  const tb = el('tbody', 'divide-y divide-border');
  rows.forEach((r) => {
    const tr = el('tr', 'align-top');
    r.forEach((c, i) => tr.append(el('td', `py-2 pr-4 break-all ${i === 0 ? 'text-accent' : 'text-text'}`, c)));
    tb.append(tr);
  });
  t.append(thead, tb);
  wrap.append(t);
  return wrap;
}

export function bindTool(id: string, run: (q: string, form: HTMLFormElement, out: HTMLElement) => Promise<void> | void) {
  document.querySelectorAll<HTMLElement>(`[data-tool="${id}"]`).forEach((root) => {
    const form = root.querySelector<HTMLFormElement>('.tool-form')!;
    const out = root.querySelector<HTMLElement>('.tool-out')!;
    const input = form.elements.namedItem('q') as HTMLInputElement;
    const qs = new URLSearchParams(location.search).get('q');
    if (qs) input.value = qs;
    form.onsubmit = async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button')!;
      btn.disabled = true;
      try { await run(input.value, form, out); } catch { message(out, 'Something went wrong while looking that up. Please try again.', 'error'); }
      finally { btn.disabled = false; }
    };
    if (qs) form.requestSubmit();
  });
}
