const container = document.querySelector("#feriados");
console.log(message)
async function feriados() {
    const d = new Date();
    const month_number = d.getMonth();
    const year = d.getFullYear();
    const day = d.getDay();
    // month_number = 1;
    const response = await fetch(`http://nolaborables.com.ar/api/v2/feriados/${year}?formato=mensual`);
    const jsonData = await response.json();

    const two_months = [jsonData[month_number], jsonData[month_number + 1]];
    structured_data = structure_month_data(two_months, [month_number, month_number + 1]);
}

function structure_month_data(data, month_numbers) {
    const both_months_feriados = {};
    let string = "Acordate que ";
    let month_index = 0;
    for (let i in data) {
        month_data = data[i];
        month_name = get_month_name(month_numbers[i]);
        both_months_feriados[month_name] = [];
        let iteration = 0;
        let month_data_length = Object.entries(month_data).length;
        if (month_data_length && month_index == 1) {
            string += ", y  ";
        }
        for (let day in month_data) {
            string_day = "";
            if (day == 1) {
                day = "primero";
            } else if (day == 2) {
                day = "segundo";
            }

            if (month_data_length == 1) {
                string_day = `el ${day} `;
            } else {
                if (iteration == 0) {
                    string_day = `el ${day}`;
                } else if (iteration == month_data_length - 1) {
                    string_day = ` y ${day}`;
                } else {
                    string_day = `, ${day}`;
                }
            }
            console.log(string);
            string += string_day;
            iteration += 1;
        }
        if (month_data_length) {
            string += ` de ${month_name}`;
        }
        month_index += 1;
    }
    string += ". son dia feriado";
    container.innerHTML += string;
}

function get_month_name(month_number) {
    return new Date("1999-" + month_number + "-15").toLocaleString("es-ar", { month: "long" });
}

feriados();
