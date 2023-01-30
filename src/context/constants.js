export const userRoles = new Map([
  ["admin", 1],
  ["doctor", 2],
  ["client", 3],
  ["manager", 4],
]);

export const sexOptions = [
  { value: "male", label: "Masculin" },
  { value: "female", label: "Femenin" },
];

export const epidemiologicalOptions = [
  { value: "1", label: "Hepatita(A, B, C)" },
  { value: "2", label: "Tuberculoză" },
  { value: "3", label: "Boli sexual-transmisibile" },
  { value: "4", label: "Infecțiile virale sezoniere(SARS COV-2, Gripa)" },
  { value: "5", label: "Nu am suportat" },
];

export const diseasesOptions = [
  { value: "1", label: "Intervenții chirurgicale" },
  { value: "2", label: "Traumatizme" },
  { value: "3", label: "Boli cronice cu care sunteți la evidența" },
  { value: "4", label: "Altele" },
];

export const allergiesOptions = [
  { value: "1", label: "Polen" },
  { value: "2", label: "Insect" },
  { value: "3", label: "Animale" },
  { value: "4", label: "Alimente" },
  { value: "5", label: "Medicamente" },
  { value: "6", label: "Altele" },
];

export const CHAT_FLAGS = {
  OPEN: "Deschis",
  IN_WORK: "In lucru",
  CLOSED: "Inchis",
};
