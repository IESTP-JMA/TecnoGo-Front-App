import { router } from "expo-router";
import { Clock, MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function AsistenciaCalendario() {
  const [selectedDay, setSelectedDay] = useState(null);

  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene.",
      "Feb.",
      "Mar.",
      "Abr.",
      "May.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dic.",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    today: "Hoy",
  };
  LocaleConfig.defaultLocale = "es";

  const eventData = {
    "2024-10-15": {
      type: "asistencia",
      details: "Asistió a clase de matemáticas",
      hora: "9:00 AM",
      color: "#50C878",
    },
    "2024-10-10": {
      type: "falta",
      details: "No asistió a clase de física",
      justificacion: "Enfermedad",
      color: "#FF6B6B",
    },
    "2024-10-20": {
      type: "proximo",
      details: "Examen de química",
      hora: "10:30 AM",
      salon: "Lab 101",
      color: "#4A90E2",
    },
  };

  const markedDates = Object.keys(eventData).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: eventData[date].color,
      customStyles: {
        container: {
          backgroundColor: `${eventData[date].color}20`,
        },
        text: {
          color: "#000000",
        },
      },
    };
    if (selectedDay === date) {
      acc[date].selected = true;
      acc[date].customStyles.container.backgroundColor =
        `${eventData[date].color}40`;
    }
    return acc;
  }, {});

  const onDayPress = (day) => {
    setSelectedDay(day.dateString);
    console.log(day);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "asistencia":
        return "✅";
      case "falta":
        return "❌";
      case "proximo":
        return "📅";
      default:
        return "•";
    }
  };

  return (
    <View className="flex-1 bg-[#e6f7f1] p-4">
      <View className="px-4">
        <Calendar
          enableSwipeMonths={true}
          hideExtraDays={true}
          markedDates={markedDates}
          markingType={"custom"}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#4A90E2",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#4A90E2",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#4A90E2",
            selectedDotColor: "#ffffff",
            arrowColor: "#4A90E2",
            monthTextColor: "#2d4150",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
            "stylesheet.calendar.header": {
              dayTextAtIndex0: { color: "#FF6B6B" },
              dayTextAtIndex6: { color: "#FF6B6B" },
            },
          }}
        />
      </View>
      <View className="mt-6">
        <Pressable
          className="bg-emerald-600 items-center py-2 rounded-lg"
          onPress={() => {
            router.replace("./apuntes");
          }}
        >
          <Text className="font-SenMedium text-white">
            Registrar Actividad Diaria
          </Text>
        </Pressable>
      </View>
      <View className="mt-4">
        <Text className="text-lg font-semibold text-emerald-800 mb-3">
          Agenda para el {selectedDay}
        </Text>
        <View className="bg-white rounded-lg p-4 shadow-md">
          {selectedDay && eventData[selectedDay] ? (
            <View className="border-l-4 border-emerald-500 pl-3 mb-3">
              <View className="flex-row items-center mb-1">
                <Clock size={16} color="#666" />
                <Text className="ml-2 text-gray-600">
                  {eventData[selectedDay].hora}
                </Text>
              </View>
              <Text className="font-semibold text-gray-800">
                {eventData[selectedDay].details}
              </Text>
              <View className="flex-row items-center mt-1">
                <MapPin name="location-outline" size={16} color="#666" />
                <Text className="ml-2 text-gray-600">Sala de Seminarios 2</Text>
              </View>
            </View>
          ) : (
            <Text className="text-center text-gray-500 py-2">
              No hay actividades programadas para este día.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
