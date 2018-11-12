import {Animal} from "../model/animal.js";
import {tipus} from "./tipusService.js";


export async function getById(id) {
    let objAnimals = {
        MethodName: 'getAnimalById',
        params: {
            id: id
        }
    };

    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objAnimals),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    let anim = await response.json();
    return new Animal(anim.idanimal, anim.nomAnimal, anim.sexe, anim.numregistre, null);
}

export async function getAnimals() {
    let objAnimals = {
        MethodName: 'getAnimals',
        params: ''
    };

    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objAnimals),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    let animals = await response.json();
    animals = animals.map(function (anim) {
        return new Animal(anim.idanimal, anim.nomAnimal, anim.sexe, anim.numregistre, null);
    });
    return animals;
}

export async function insertAnimal() {
    let nombre = document.getElementById('nom').value;
    let sexeParam;
    let reg = document.getElementById('reg').value;
    if (document.getElementById("MASC").checked) {
        sexeParam = document.getElementById("MASC").value;
    } else sexeParam = document.getElementById("FEM").value;
    let tipo = document.getElementById('tipos').value;
    let animales = await getAnimals();
    let lastId = -1;
    animales.forEach(function (animal) {
        if (animal.id > lastId) {
            lastId = animal.id;
        }
    });
    let objAnimals = {
        MethodName: 'insertAnimal',
        params: {
            id: lastId + 1,
            nom: nombre,
            sexe: sexeParam,
            numreg: reg,
            tipus: tipo
        }
    };
    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objAnimals),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return await response;
}

export async function updateAnimal(idAnimal) {
    let nombre = document.getElementById('nom').value;
    let sexeParam;
    let reg = document.getElementById('reg').value;
    if (document.getElementById("MASC").checked) {
        sexeParam = document.getElementById("MASC").value;
    } else sexeParam = document.getElementById("FEM").value;
    let tipo = document.getElementById('tipos').value;
    tipo = parseInt(tipo);
    let objAnimals = {
        MethodName: 'updateAnimal',
        params: {
            id: idAnimal,
            nom: nombre,
            sexe: sexeParam,
            numreg: reg,
            tipus: tipo
        }
    };
    console.log(idAnimal, nombre, sexeParam, reg, tipo);
    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objAnimals),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return await response;
}

export async function deleteAnimal(animal) {

    let objAnimals = {
        MethodName: 'deleteAnimal',
        params: {
            id: animal.id,
        }
    };
    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objAnimals),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return await response;
}


export function accion(animal) {
    if (animal === null) {
        insertAnimal()
    } else {
        updateAnimal(animal)
    }
}

export function confirmar(animal) {
    let confirmar = false;
    let retVal = confirm("Eliminar " + animal.nom + "?");
    if (retVal === true) {
        confirmar = true;
    }
    else {
        return false;
    }
    if (confirmar) deleteAnimal(animal)
}

