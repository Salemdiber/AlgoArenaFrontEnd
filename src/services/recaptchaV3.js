// Utilitaire pour charger reCAPTCHA v3 et obtenir un token
export function loadReCaptchaV3(siteKey) {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha && window.grecaptcha.execute) {
      resolve(window.grecaptcha);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => {
      if (window.grecaptcha && window.grecaptcha.execute) {
        resolve(window.grecaptcha);
      } else {
        reject(new Error('reCAPTCHA v3 failed to load'));
      }
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export async function getReCaptchaV3Token(siteKey, action = 'submit') {
  const grecaptcha = await loadReCaptchaV3(siteKey);
  return grecaptcha.execute(siteKey, { action });
}
