async function getPendindIncidents() {
    document.querySelector('.message').innerHTML = "Wait, loading...";
     document.querySelector('.message').classList.replace('show', 'hidden');
    const URL = `${HOST}/api/v1/reports/verified`;
    const result = await getData(URL, token = '');
    if (result) {
        const response = JSON.parse(result);
        if(!response.error){
            document.getElementById("message").style.display = 'none';
            const verifiedIncidents = document.getElementById("verifiedIncidents");
            verifiedIncidents.classList.remove('hide');
            // populate data
            
            response.data.forEach(key => {
                verifiedIncidents.insertAdjacentHTML('beforeend', `
                <tr>    
                    <td>${key.id}</td>
                    <td>${key.report}</td>
                    <td>${key.description || "-"}</td>
                    <td>${key.status || "-"}</td>
                    <td>${formatDateTime(key.createdAt)}</td>   
                </tr>
                `);
            });
        }else{
            console.log(response.error)
            const message = document.getElementById("message");
            message.innerHTML = response.error;

        }
    }
  }
  
  window.document.addEventListener('DOMContentLoaded', () => {
    getPendindIncidents();
  });