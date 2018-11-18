import {Tipo} from "../model/tipo.js";

export async function tipus() {

    let objTipus = {
        MethodName: 'getTipus',
        params: ''
    };
    const response = await fetch("http://35.194.72.13/vetplus/serveis.php", {
        method: 'POST',
        body: JSON.stringify(objTipus),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    let tipos = await response.json();
    tipos = tipos.map(function (tipo) {
        return new Tipo(tipo.idtipus, tipo.nom)
    });
    return tipos
}
