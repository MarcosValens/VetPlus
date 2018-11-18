export function Animal(id, nom, sexe, numreg, tipus, tractaments) {
    this.nom = nom || "sin especificar";
    this.id = id;
    this.sexe = sexe;
    this.numreg = numreg || "sin especificar";
    this.tipus = tipus;
    this.tractaments = tractaments || "Sin tratamientos";
}
