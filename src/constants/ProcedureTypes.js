import { Calendar, MapPin } from "lucide-react-native";

export const ProcedureTypes = {
  "PROCEDURE-CDP": {
    inputs: [
      {
        id: "placeOfExecution",
        label: "Lugar de Ejecucion",
        icon: MapPin,
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
    inputs: [],
  },
  "PROCEDURE-CAWS": {
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
