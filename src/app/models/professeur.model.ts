export class Professeur {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public dateNaissance: Date,
    public CIN: string,
    public RIB: string,
    public date_debut_contrat: Date,
    public date_fin_contrat: Date,
    public email: string,
    public telephone: string,
    public adresse: string,
    public matiere: string,
    public experience: number,
    public username: string,
    public password: string,
    public disponibilite: string[], // Ex: ["Lundi 9h-12h", "Mercredi 14h-17h"]
    public image: string
  ) {}
}

// Exemple d'instance
export const PROFESSEUR_EXEMPLE = new Professeur(
  1,
  "Dupont",
  "Jean",
  new Date("1985-03-15"),
  "AB123456",
  "FR7630001007941234567890185",
  new Date("2023-01-01"),
  new Date("2024-12-31"),
  "jean.dupont@ecole.fr",
  "+33123456789",
  "12 Rue de Paris, 75001",
  "Mathématiques",
  8,
  "jdupont",
  "motdepasse123",
  ["Lundi 9h-12h", "Jeudi 14h-17h"],
  "assets/images/professeurs/dupont.jpg"
);
