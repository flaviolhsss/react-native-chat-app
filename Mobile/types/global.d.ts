// src/types/global.d.ts

// Données recues du backend

export interface DataUser {
  _id: string;
  userName: string;
  dateInscription: Date;
  avatar: number;
}

// Interfaces d'utilisation

export interface DataMessage {
  userId: string;
  userName: string;
  userAvatar: number;
  contenu: string;
  dateSended: Date;
}
