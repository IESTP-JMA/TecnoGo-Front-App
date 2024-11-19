import StyledDatePicker from "@components/form/StyledDatePicker";
import StyledLabel from "@components/form/StyledLabel";
import StyledTextInput from "@components/form/StyledTextInput";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { CalendarPlus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

const opciones = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

export default function TramiteForm({ formData, setFormData, inputs }) {
  const [date, setDate] = useState(new Date());

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  function showDatepicker(id) {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, selectedDate) => {
        if (!selectedDate) return;
        setDate(selectedDate);
        handleInputChange(id, selectedDate.getTime());
      },
      mode: "date",
    });
  }
  const dateFormated = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("es-ES", opciones);
  };

  return (
    <>
      {inputs.map(({ id, label, icon: Icon, type }) => (
        <View key={id} className="flex-row items-center mb-4">
          <View className="flex-1">
            <StyledLabel label={label} isRequired icon={Icon} />
            {type === "date" ? (
              <StyledDatePicker
                value={
                  formData[id]
                    ? dateFormated(formData[id])
                    : `Seleccione ${label.toLowerCase()}`
                }
                onPress={() => {
                  showDatepicker(id);
                }}
                icon={CalendarPlus}
                isPlaceHolder={formData[id] === undefined}
              />
            ) : (
              <StyledTextInput
                onChangeText={(value) => handleInputChange(id, value)}
                placeholder={`Ingrese ${label.toLowerCase()}`}
              />
            )}
          </View>
        </View>
      ))}
    </>
  );
}
