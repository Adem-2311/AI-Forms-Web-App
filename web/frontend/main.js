document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("user-form");

    const response = await fetch("./form.json");
    const data = await response.json();

    let htmlBody = "";
    data.forEach(datum => {
        console.log(`=== ${datum.section} ===`);
        htmlBody += `=== ${datum.section} === <br><br>`;

        for (const [label, type] of Object.entries(datum.fields)) {
            if (Array.isArray(type)) {
                console.log(`${label}: [${type.join(', ')}]`);

                htmlBody += `<label>${label}</label> <select>`;
                for (const index in type) {
                    htmlBody += `<option>${type[index]}</option>`;
                }

                htmlBody += "</select> <br>";
            }
            else {
                console.log(`${label}: ${type}`);
                htmlBody += `<label>${label}</label> <input placeholder="${label}" type="${type}"> <br>`;
            }
        }
        htmlBody += "<br>";
    });

    document.getElementById("user").innerHTML = htmlBody;
    console.log(data);
});