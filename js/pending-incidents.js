async function getPendindIncidents() {
    document.querySelector('.message').innerHTML = "Wait, loading...";
    // document.querySelector('.message').classList += result.error ? ' message-error' : ' message-success';
    document.querySelector('.message').classList.replace('show', 'hidden');
    const URL = `${HOST}/api/v1/reports/pending`;
    const result = await getData(URL, token = '');
    if (result) {
        const response = JSON.parse(result);
        if(!response.error){
            document.getElementById("message").style.display = 'none';
            const pendingIncidents = document.getElementById("pendingIncidents");
            pendingIncidents.classList.remove('hide');
            // populate data
            
            response.data.forEach(key => {
                pendingIncidents.insertAdjacentHTML('beforeend', `
                <tr>    
                    <td>${key.id}</td>
                    <td>${key.report}</td>
                    <td>${key.description || "-"}</td>
                    <td>${key.type || "-"}</td>
                    <td>${formatDateTime(key.createdAt)}</td>   
                </tr>
                `);
            });
        }else{
            console.log(response.error)
            const message = document.getElementById("message");
            // message.remove('hidden');
            message.innerHTML = response.error;
            // document.getElementById("message").styles.display = 'none';

        }
    }
  }
  
  window.document.addEventListener('DOMContentLoaded', () => {
    getPendindIncidents();
  });