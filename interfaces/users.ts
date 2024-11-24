
export interface Users{
    id:number;
    username:string;
    email:string;
    password:string;
    isactive: boolean;
    imagen?: string;
}

export interface UserNuevo{
    username:string;
    email:string;
    password:string;
    isactive: boolean;
}

export interface Clase {
    id: string;
    asignatura: string;
    horario: string;
    asistentes?: [{
        id: string;
        nombre: string;
        correo: string;
    }]; 
    justificaciones?: [{
      id: string;         
      nombre: string;
      justificacion: string;
    }];
  }

  export interface nuevaClase {
    id: string;
    asignatura: string;
    horario: string;
    asistentes?: [{
        id: string;
        nombre: string;
        correo: string;
    }]; 
    justificaciones?: [{
      id: string;         
      nombre: string;
      justificacion: string;
    }];
  }