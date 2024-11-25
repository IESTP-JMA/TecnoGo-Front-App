import { formatPrettyDate } from "@/utils/utilsFunctions";
import StyledDatePicker from "@components/form/StyledDatePicker";
import StyledLabel from "@components/form/StyledLabel";
import StyledTextInput from "@components/form/StyledTextInput";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { CalendarPlus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

const isFormValid = (formData, inputs) => {
  for (const input of inputs) {
    if (!formData[input.id] || formData[input.id] === "") {
      return false;
    }
  }
  return true;
};

export default function ProcedureForm({
  formData,
  setFormData,
  inputs,
  setIsFormValid,
}) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setIsFormValid(isFormValid(formData, inputs));
  }, [formData, inputs, setIsFormValid]);

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  function showDatePicker(id) {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, selectedDate) => {
        if (!selectedDate) return;
        setDate(selectedDate);
        handleInputChange(id, selectedDate.getTime());
      },
      mode: "date",
      minimumDate: date,
    });
  }

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
                    ? formatPrettyDate(formData[id])
                    : `Seleccione ${label.toLowerCase()}`
                }
                onPress={() => {
                  showDatePicker(id);
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
