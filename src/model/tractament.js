export function Tractament(animalId,data,descripcio,id){
    this.animal_idanimal = animalId;
    this.data = data || "Sin fecha de tratamiento";
    this.descripcio = descripcio || "Sin descripcion";
    this.idtractament = id || "Sin tratamiento";
}
