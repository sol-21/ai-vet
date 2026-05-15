// @ts-nocheck
export function insecurePatterns() {
  const code = 'console.log("danger")';
  eval(code); // eval usage

  const element = document.getElementById('app');
  element.innerHTML = '<div>unsafe</div>'; // innerHTML usage

  const stripeKey = 'sk_live_abc123xyz456abc123xyz456'; // Hardcoded secret

  const token = Math.random(); // Math.random for token
}
