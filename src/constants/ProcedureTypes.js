import { Calendar, MapPin } from "lucide-react-native";

export const ProcedureTypes = {
  "PROCEDURE-CDP": {
    title: "Solicitud Carta de Presentación",
    inputs: [
      {
        id: "placeOfExecution",
        label: "Lugar de Ejecucion",
        icon: MapPin, // Icono asociado al campo
        type: "text",
      },
      {
        id: "startDate",
        label: "Fecha de Inicio",
        icon: Calendar,
        type: "date",
      },
    ],
  },
  "PROCEDURE-CDE": {
    title: "Solicitud Certificados de Estudios",
    inputs: [],
  },
  "PROCEDURE-CAWS": {
    title: "Solicitud Certificado AWS",
    inputs: [
      {
        id: "startDate",
        label: "Fecha de Inicio",
        icon: Calendar,
        type: "date",
      },
      {
        id: "endDate",
        label: "Nivel de Estudios",
        icon: null,
        type: "text",
      },
      {
        id: "some",
        label: "rason",
        icon: null,
        type: "text",
      },
    ],
  },
};

export function getProcedureTypes() {
  return Object.keys(ProcedureTypes);
}

//   minimumDate: today,
//   maximumDate: new Date(
//     today.getFullYear(),
//     today.getMonth() + 6,
//     // eslint-disable-next-line prettier/prettier
//     today.getDate()
//   ),
