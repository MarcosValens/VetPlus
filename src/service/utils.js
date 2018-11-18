import {deleteTractament, insertTractament, updateTractament} from "./tractamentService.js";
import {deleteAnimal, insertAnimal, updateAnimal} from "./animalService.js";

export async function accion(animal) {
    if (animal === null) {
        await insertAnimal();
        window.location.href = "animals.html";
    } else {
        if (location.href.includes("animalForm.html")) {
            await updateAnimal(animal);
            window.location.href = "animals.html";
        } else if (location.href.includes("tractamentsForm.html")) {
            if (animal.tractaments[0].idtractament === "Sin tratamiento" || document.getElementById('tractamentsId').value === "nuevo tratamiento") {
                await insertTractament(animal);
                window.location.href = "tractaments.html";
            } else {
                await updateTractament();
                window.location.href = "tractaments.html";
            }
        }
    }
}

export async function confirmar(inputValues) {
    let confirmar = false;
    //BORRA ANIMALES
    if (location.href.includes("animals.html")) {
        let confirmacion = confirm("Eliminar " + inputValues.nom + "?");
        if (confirmacion === true) {
            confirmar = true;
        }
        else {
            return false;
        }
        if (confirmar) {
            let tractamentsForDelete = [];
            inputValues.tractaments.forEach(tract => tractamentsForDelete.push(tract.idtractament));
            let values = parseInteger(tractamentsForDelete);
            let eliminaTract = await deleteTractament(values);
            setTimeout(function () {
                alert("test")
            },100000);
            console.log("Elimina Tractament ",eliminaTract);

            //INTENTOS DE BORRAR ANIMALES CON TRATAMIENTOS

            /*let promise = new Promise(function (resolve, reject){
                let anim = deleteAnimal(inputValues);
                console.log(inputValues,"values deleteanim");
                resolve(anim)
                console.log(anim)
            });*/
           /* var x = new Promise(function (resolve) {
                    resolve(deleteAnimal(inputValues));
            });
            console.log('x')
            x.then(function (valor /!*este valor es el valor que tiene x*!/) {
                console.log(valor,"valor");
                return new Promise(function (resolve) {
                    console.log(resolve,"resolve")
                    resolve(x);
                }).then(function (valor) {
                    console.log(valor,"test")
                })
            });*/
            let eliminaAnimal = await deleteAnimal(inputValues);
            console.log("Elimina Animal", eliminaAnimal);
        }
         animalsGo()
    }
        //BORRA TRATAMIENTOS
    else if (location.href.includes("tractaments.html")) {
        //CONSTRUYO LA FRASE DEL CONFIRM
        let stringify = inputValues.map(value => value.toString());
        let string = "";
        for (let i = 0; i < stringify.length; i++) {
            if (i === stringify.length - 1 && i > 0) {
                string += "y " + stringify[i];
            } else if (i === stringify.length - 2) {
                string += stringify[i] + " ";
            } else if (i > 0) {
                string += stringify[i] + ", ";
            } else string = stringify[i] + " ";
        }
        let confirmacion = confirm("Eliminar los tratamientos " + string + "?");
        if (confirmacion === true) {
            confirmar = true;
        }
        else {
            return false;
        }
        if (confirmar) await deleteTractament(inputValues);
       /* tractamentsGo();*/
    }
}

export function parseInteger(select) {
    let arrayInt = [];
    select = Array.from(select);
    if (location.href.includes("tractaments.html")) {
        select = select.filter(value => value.checked === true);
    }
    select.forEach(function (input) {
        if (location.href.includes("tractaments.html")) {
            let int = parseInt(input.value);
            arrayInt.push(int)
        } else {
            let int = parseInt(input);
            arrayInt.push(int)
        }

    });
    return arrayInt
}

export function animalsGo(){
    window.location.href = "animals.html";
}
export function tractamentsGo(){
    window.location.href = "tractaments.html";
}



