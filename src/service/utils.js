export function getListId(animales) {
    let lastId = -1;
    animales.forEach(function (animal) {
        if (animal.id > lastId) {
            lastId = animal.id;
        }
    });
    return lastId + 1;
}

export function getCurrentTime() {
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

    return dformat;
}
