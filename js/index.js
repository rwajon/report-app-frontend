const HOST = 'http://localhost:3000';

async function getData(URL, resType = 'text', token = '') {
  try {
    const request = new Request(URL, {
      method: 'GET',
      mode: 'cors',
      cache: 'reload',
      headers: {
        'access-token': token,
      },
    });

    let result = '';
    const response = await fetch(request);

    if (resType === 'json') {
      result = await response.json();
      return result;
    }
    result = await response.text();
    return result;
  } catch (e) {
    throw Error(e);
  }
}

async function sendData(METHOD, URL, data = {}, resType = 'text', token = '') {
  try {
    const request = new Request(URL, {
      method: METHOD,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': token,
      },
      body: JSON.stringify(data),
    });

    let result = '';
    const response = await fetch(request);

    if (resType === 'json') {
      result = await response.json();
      return result;
    }
    result = await response.text();
    return result;
  } catch (e) {
    throw Error(e);
  }
}

// formating date
function formatDateTime(date){
   var months = [ "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]
   const d = date.split('-');
   return months[parseInt(d[1])-1]+" "+d[1] +", "+ d[0];
}

window.document.addEventListener('DOMContentLoaded', () => {});
