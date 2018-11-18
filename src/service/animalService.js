import {Animal} from "../model/animal.js";
import {tipus} from "./tipusService.js";
import {Tractament} from "../model/tractament.js";
import {getTractaments} from "./tractamentService.js";
import {deleteTractament} from "./tractamentService.js";
import {parseInteger} from "./utils.js";
import {getTractamentById} from "./tractamentService.js";


export async function getById(id) {
    let tractaments = await getTractaments();
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
    let animalConstructor = await response.json();
    let animal = new Animal(animalConstructor.idanimal, animalConstructor.nomAnimal, animalConstructor.sexe, animalConstructor.numregistre, null);
    tractaments = tractaments.filter(function (tract) {
        return tract.animal_idanimal === animal.id;
    });
    animal.tractaments = tractaments;
    return animal;
}

export async function getAnimals() {
    let tipoAnims = await tipus();
    let tractaments = await getTractaments();
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
    //INSERTO EL TIPO DE ANIMAL Y LAS VACUNAS QUE TIENE PUESTAS(SI LAS TIENE)
    animals = animals.map(function (anim) {
        let tipoAnimal = tipoAnims.filter(function (tipo) {
            return tipo.id === anim.idtipus;
        });
        anim.tractaments = tractaments.filter(function (tract) {
            return anim.idanimal === tract.animal_idanimal
        });
        return new Animal(anim.idanimal, anim.nomAnimal, anim.sexe, anim.numregistre, tipoAnimal[0].nom, anim.tractaments)
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
            reg: reg,
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

export async function updateAnimal(animal) {
    let nombre = document.getElementById('nom').value;
    let sexeParam;
    let reg = document.getElementById('reg').value;
    if (document.getElementById("MASC").checked) {
        sexeParam = document.getElementById("MASC").value;
    } else sexeParam = document.getElementById("FEM").value;
    let tipo = document.getElementById('tipos').value;

    let objAnimals = {
        MethodName: 'updateAnimal',
        params: {
            id: animal.id,
            nom: nombre,
            sexe: sexeParam,
            reg: reg,
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
//MODIFICA LOS ANIMALES AÑADIENDOLES A CADA UNO SUS TRATAMIENTOS
export function modificaAnimals(animals, tractaments) {

    let animalsModificats = animals.map(function (animal) {
        animal.tractaments = tractaments.filter(function (tract) {
            return animal.id === tract.animal_idanimal
        });
        return animal
    });

    //CREA UN OBJETO TRACTAMENT VACIO (PARA ANIMALES SIN TRATAMIENTO) Y LO METE EN ANIMALSMODIFICATS
    animalsModificats.forEach(function (a) {
        if (a.tractaments.length === 0) {
            noTract(a)
        }
    });
    return animalsModificats;
}
//AÑADE UN TRACTAMIENTO NULO A LOSANIMALES QUE NO TIENEN TRATAMIENTOS
export function noTract(animal) {
    let noTract = new Tractament(animal.id, null, null, null);
    animal.tractaments.push(noTract)
}
