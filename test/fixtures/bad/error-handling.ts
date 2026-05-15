// @ts-nocheck
export async function badErrorHandling() {
  const res = await fetch('https://api.example.com/data'); // No try/catch, no res.ok check
  const data = res.json();

  const json = JSON.parse('{"bad": "json"'); // No try/catch

  fetch('/api/other').then(r => r.json()); // .then without .catch
}
