function reportIncident() {
  if (document.querySelector('#reportIncident')) {
    document.querySelector('#reportIncident form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const report = document.querySelector('form #report').value;

      if (report) {
        const data = {
          type: "text",
          report: report,
          description: "text",
          latitude: "12.987879",
          longitude: "19.89708",
          status: "pending"    
       };
      
       
        const URL = `${HOST}/api/v1/reports/incident`;
        const result = await sendData('POST', URL, data, 'json');

        if (result) {
          document.querySelector('.message').classList.replace('hidden', 'show');
          document.querySelector('.message').innerHTML = result.data ? 'Thank you for reporting' : result.message || result.error;
          document.querySelector('.message').classList.remove('message-error');
          document.querySelector('.message').classList.remove('message-success');
          document.querySelector('.message').classList.add(result.message || result.error ? 'message-error' : 'message-success');
        }
      }

      return true;
    });
  }
}

window.document.addEventListener('DOMContentLoaded', () => {
  reportIncident();
});