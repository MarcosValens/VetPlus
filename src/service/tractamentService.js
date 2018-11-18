import {Tractament} from "../model/tractament.js";

export async function getTractaments() {
    let objTract = {
        MethodName: 'getTractaments',
        params: ''
    };

    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objTract),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    let tractaments = await response.json();
    tractaments = tractaments.map(function (tract) {
        return new Tractament(tract.animal_idanimal, tract.data, tract.descripcio, tract.idtractament);
    });
    return tractaments;
}

export async function insertTractament(animal) {
    let date = new Date();
    //AÑADE 0 A LOS NUMEROS MENORES DE 10
    Number.prototype.padLeft = function (base, chr) {
        let len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };
    //OBTENCION DE LA FECHA Y HORA FORMATEADA
    let dformat = [(date.getFullYear()).padLeft(),
            (date.getMonth() + 1).padLeft(),
            date.getDay()].join('/') +
        ' ' +
        [date.getHours().padLeft(),
            date.getMinutes().padLeft(),
            date.getSeconds().padLeft()].join(':');
    let objTract = {
        MethodName: 'insertTractament',
        params: {
            descripcio: document.getElementById('descripcio').value,
            idanimal: animal.id,
            data: dformat
        }
    };

    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objTract),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return await response;
}

export async function updateTractament() {
    let idTractament = document.getElementById('tractamentsId').value;
    let descripcio = document.getElementById('descripcio').value;
    if (!descripcio) descripcio = document.getElementById('descripcio').placeholder;
    let urlSelf = new URL(document.location);
    let idAnimal = urlSelf.searchParams.get("identificador");
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let dateTime = date + " " + time + ":00";
    let objTract = {
        MethodName: 'updateTractament',
        params: {
            id: idTractament,
            descripcio: descripcio,
            idanimal: idAnimal,
            data: dateTime
        }
    };

    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objTract),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return await response;
}

export async function getTractamentById(value) {

    let objTract = {
        MethodName: 'getTractamentById',
        params: {
            id: value,
        }
    };

    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objTract),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    let tractaments = await response.json();
    return tractaments;
}

export async function deleteTractament(values) {
    values.forEach(async idTractament => {
        let objTract = {
            MethodName: 'deleteTractament',
            params: {
                id: idTractament,
            }
        };

        const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
            method: 'POST',
            body: JSON.stringify(objTract),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return await response;
    });
}
