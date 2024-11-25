export function removeIds(obj: any) {
  // Recorre todas las propiedades del objeto
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Si la propiedad es "id", la elimina
      if (key === 'id') {
        delete obj[key];
      }
      // Si la propiedad es un objeto, llama recursivamente a la función
      else if (typeof obj[key] === 'object' && obj[key] !== null) {
        removeIds(obj[key]);
      }
      // Si la propiedad es un array, recorre cada elemento y aplica la función
      else if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => removeIds(item));
      }
    }
  }
  return obj; // Devuelve el objeto modificado
}
