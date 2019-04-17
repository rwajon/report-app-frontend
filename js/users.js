function signup() {
  if (document.querySelector('#signup')) {
    document.querySelector('#signup form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.querySelector('form #fullName').value;
      const userName = 'none';
      const phone = document.querySelector('form #email').value || '';
      const email = document.querySelector('form #phone').value;
      const password = document.querySelector('form #password').value;
      const isAdmin = false;

      if (fullName && phone && email && password) {
        const data = {
          fullName,
          userName,
          phone,
          email,
          password,
          isAdmin,
        };

        const URL = `${HOST}/api/v1/auth/signup`;
        const result = await sendData('POST', URL, data, 'json');

        if (result) {
          if (result.token) {
            localStorage.setItem(`token`, result.token);
            localStorage.setItem(`user`, JSON.stringify(result[data[0]]));
          }
          
          document.querySelector('.message').innerHTML = result.error || `Account successfuly created.
          <a href="login.html" style="color: blue">Click here to login!</a>`;
          document.querySelector('.message').classList += result.error ? ' message-error' : ' message-success';
          document.querySelector('.message').classList.replace('hidden', 'show');
        }
      }

      return true;
    });
  }
}

window.document.addEventListener('DOMContentLoaded', () => {
  signup();
});