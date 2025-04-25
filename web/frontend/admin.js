const dataButton = document.getElementById('get-admin-data');

dataButton.addEventListener('click', async () => {
    dataButton.style.display = 'none';

    const table = document.getElementById('table');
    let htmlTableBody = '';

    try {
        const response = await fetch('/get-data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching data from server!');
        }

        const data = await response.json();

        data.forEach(datum => {
            htmlTableBody += `<tr>${datum.label}</tr>`

            
        });
    }
    catch (error) {
        alert('An error occured when fetching data from server, ', error.message);
        console.error('Error: ', await response.json());
    }
});