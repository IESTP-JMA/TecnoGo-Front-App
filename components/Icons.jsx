import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const BellIcon = (color) => (
  <FontAwesome6 name="bell" size={24} color={color} />
);

export const NotificationIcon = (props) => (
  <FontAwesome6 name="home" size={24} color="black" {...props} />
);

export const ArrowLeftIcon = () => (
  <FontAwesome6 name="arrow-left" size={24} color="#065F46" />
);
