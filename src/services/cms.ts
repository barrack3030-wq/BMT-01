export interface RemoteCmsPayload {
  settings?: Record<string, any>;
  pages?: { about?: Record<string, any> };
  products?: any[];
  articles?: any[];
  board?: any[];
  testimonials?: any[];
  branches?: any[];
  faq?: any[];
  meta?: Record<string, any>;
}

declare global {
  interface Window { BMT_CMS_API_URL?: string; }
}

export function loadRemoteCms(): Promise<RemoteCmsPayload | null> {
  const endpoint = (window.BMT_CMS_API_URL || '').trim();
  if (!endpoint) return Promise.resolve(null);
  return new Promise((resolve) => {
    const callback = '__bmtCms_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const script = document.createElement('script');
    let done = false;
    const finish = (payload: RemoteCmsPayload | null) => {
      if (done) return;
      done = true;
      try { delete (window as any)[callback]; } catch {}
      script.remove();
      resolve(payload);
    };
    (window as any)[callback] = (payload: RemoteCmsPayload) => finish(payload || null);
    script.onerror = () => finish(null);
    script.src = endpoint + (endpoint.includes('?') ? '&' : '?') + 'action=public&callback=' + encodeURIComponent(callback) + '&ts=' + Date.now();
    script.async = true;
    document.head.appendChild(script);
    window.setTimeout(() => finish(null), 10000);
  });
}