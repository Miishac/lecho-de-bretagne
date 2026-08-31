// ========================
// Cryptage d'email
// ========================
// Protège les adresses email contre les bots

function encryptEmail(email) {
  let encrypted = '';
  for (let i = 0; i < email.length; i++) {
    encrypted += String.fromCharCode(email.charCodeAt(i) + 1);
  }
  return btoa(encrypted);
}

function decryptEmail(encrypted) {
  let decoded = atob(encrypted);
  let decrypted = '';
  for (let i = 0; i < decoded.length; i++) {
    decrypted += String.fromCharCode(decoded.charCodeAt(i) - 1);
  }
  return decrypted;
}

// Usage : data-email="encrypted_string"
// Remplace [email protected] par <span data-email="..." onclick="revealEmail(this)">Cliquez pour révéler</span>

function revealEmail(el) {
  const encrypted = el.dataset.email;
  const email = decryptEmail(encrypted);
  el.innerHTML = `<a href="mailto:${email}">${email}</a>`;
  el.style.cursor = 'pointer';
}

// Alternative : utiliser un service comme FormSubmit
// Pas besoin de révéler l'email directement
