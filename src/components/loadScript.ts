export function loadScript(src: string, globalName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any)[globalName]) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load script: ' + src));
    document.body.appendChild(script);
  });
}
