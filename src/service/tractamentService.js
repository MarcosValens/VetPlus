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

export async function insertTractament(animal, dformat) {

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

export async function updateTractament(idTractament, descripcio, idAnimal, dateTime) {

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
    await response.json();
}

export async function deleteTractament(values) {
    return values.map(async idTractament => {
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
