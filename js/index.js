let HOST = 'https://reportapp-ninjas.herokuapp.com';

if (window.location.href.indexOf('http://127.0.0.1:3000') >= 0) {
	HOST = 'http://127.0.0.1:3000';
}
console.log(HOST);
async function getData(URL, resType = 'text', token = '') {
	try {
		const request = new Request(URL, {
			method: 'GET',
			mode: 'cors',
			cache: 'reload',
			headers: {
				'access-token': token
			}
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
				'access-token': token
			},
			body: JSON.stringify(data)
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
function formatDateTime(date) {
	var months = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
	const d = date.split('-');
	return months[parseInt(d[1]) - 1] + ' ' + d[1] + ', ' + d[0];
}

// nav
const mainmenu = document.getElementById('mainmenu');
if (mainmenu) {
	mainmenu.innerHTML = `
  <li><a href="./verifiedIncidents.html"> <span class="fas fa-stream"></span> <span class="hide-on-small"> Reports</span></a></li>
  <li><a href="./allOrganisations.html"><span class="fas fa-warehouse"></span> <span class="hide-on-small">  Organizations</span></a></li>
  <li><a href="./profile.html"><span class="fas fa-user"></span> <span class="hide-on-small"> Profile</span> <span class="fas fa-angle-down"></span> </a></li>
`;
}
window.document.addEventListener('DOMContentLoaded', () => {});
