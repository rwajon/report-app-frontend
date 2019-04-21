async function getAllOrganizations() {
	document.querySelector('.message').innerHTML = 'Wait, loading...';
	// document.querySelector('.message').classList += result.error ? ' message-error' : ' message-success';
	document.querySelector('.message').classList.replace('show', 'hidden');
	const URL = `${HOST}/api/v1/organisations/all`;
	const result = await getData(URL, (token = ''));
	if (result) {
		console.log(result);
		const response = JSON.parse(result);
		if (!response.error) {
			document.getElementById('message').style.display = 'none';
			const allOrganizations = document.getElementById('allOrganizations');
			allOrganizations.classList.remove('hide');
			// populate data

			response.data.forEach((key) => {
				allOrganizations.insertAdjacentHTML(
					'beforeend',
					`
                <tr>    
                    <td>${key.id}</td>
                    <td>${key.name}</td>
                    <td>${formatDateTime(key.createdAt)}</td>
                    <td>
                            <button type="button" id="${key.id}" onclick="deleteOrganization(this.attributes.id.value)">
                                    <i class="fas fa-trash"></i>
                            </button>
                    </td>     
                </tr>
                `
				);
			});
		} else {
			console.log(response.error);
			const message = document.getElementById('message');
			// message.remove('hidden');
			message.innerHTML = response.error;
			// document.getElementById("message").styles.display = 'none';
		}
	}
}

// delete organization
async function deleteOrganization(id) {
	const URL = `${HOST}/api/v1/organisations/${id}`;
	const result = await sendData('DELETE', URL, {}, 'json');

	if (result.status === 200) {
		window.location.replace(window.location.href);
	} else {
		alert('error');
	}
}

window.document.addEventListener('DOMContentLoaded', () => {
	getAllOrganizations();
});
