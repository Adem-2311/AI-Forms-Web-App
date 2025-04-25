const button = document.createElement('button');

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("user-form");

    const response = await fetch("./form.json");
    const data = await response.json();

    let htmlBody = '<div class="m-3"></div>';
    data.forEach(datum => {
        htmlBody += `<div class="shadow is-flex is-justify-content-center mx-5" style="background-color: #FFE66D; padding: 1rem; margin-bottom: 1.5rem; border-radius: 20px; font-weight: bold;"><p>=== ${datum.section} ===</p></div>`;

        for (const [label, type] of Object.entries(datum.fields)) {
            if (Array.isArray(type)) {

                htmlBody += `<div class="is-flex is-justify-content-center"><div class="mx-4"><label>${label} :</label></div> <div class="select custom-select"><select class="user-input" name="${label}">`;

                for (const index in type) {
                    htmlBody += `<option>${type[index]}</option>`;
                }

                htmlBody += "</select></div></div> <br>";
            }
            else {
                htmlBody += `<div class="is-flex is-justify-content-center"><div class="mx-4"><label>${label} :</label></div> <input class="user-input input custom-input w" placeholder="${label}" type="${type}" name="${label}"></div> <br>`;
            }
        }
        htmlBody += "<br>";
    });

    button.textContent = 'Submit';
    button.type = 'submit';
    button.id = 'submit-btn';

    form.innerHTML = htmlBody;
    form.appendChild(button);
    console.log(data);
});

button.addEventListener('click', async () => {
    const userInput = document.querySelectorAll('.user-input');
    const formData = {};

    try {
        userInput.forEach((input) => {
            if (!input.value) {
                throw new Error('All fields need to be filled!!');
            }

            formData[input.name] = input.value;
        });
    }
    catch (error) {
        alert(error.message);
        console.error(error.message);
        return;
    }

    console.log('Form data: ', formData);

    try {
        const reponse = await fetch('/add-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!reponse.ok) {
            const errorText = await reponse.text();
            throw new Error('Error sending data to the server: ', errorText);
        }

        console.log('Response from the server: ', await reponse.json());
        alert('Data sent to the database!!');
        console.log('Response status: ', response.status);
        console.log('Response headers: ', response.headers);
    }
    catch (error) {
        alert(error.message);
        console.error(error.message);
        return;
    }
});