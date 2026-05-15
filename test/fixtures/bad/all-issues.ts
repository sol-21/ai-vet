// @ts-nocheck
import { useData } from 'react'; // Hallucinated hook
import { something as _something } from 'non-existent-package'; // Phantom import

export async function BadFunction() {
  const res = fetch('/api/data'); // Missing await, missing try/catch
  
  const data = eval('window.data'); // Security risk
  
  const buffer = new Buffer('hello'); // Deprecated API
  
  return res.json();
}
