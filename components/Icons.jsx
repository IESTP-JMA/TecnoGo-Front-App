import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Svg, { Path, Rect } from "react-native-svg";

export const BellIcon = () => (
  <FontAwesome6 name="bell" size={24} color="white" />
);

export const NotificationIcon = (props) => (
  <FontAwesome6 name="home" size={24} color="black" {...props} />
);

export const ArrowLeftIcon = () => (
  <FontAwesome6 name="arrow-left" size={24} color="#065F46" />
);

export const UserIcon = ({ color }) => (
  <FontAwesome6 name="user" size={24} color={color} />
);

export const EditIcon = ({ color }) => (
  <FontAwesome6 name="edit" size={24} color={color} />
);

export const ChevronLeftIcon = ({ color, size = 24 }) => (
  <FontAwesome6 name="chevron-left" size={size} color={color} />
);

export const CheckIcon = ({ color }) => (
  <FontAwesome6 name="check" size={24} color={color} />
);
export const CameraIcon = ({ color, size = 24 }) => (
  <FontAwesome6 name="camera" size={size} color={color} />
);

export function PersonIcon({
  size = 24,
  color = "black",
  filled = false,
  strokeWidth = 32,
}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
    >
      <Path
        fill={filled ? color : "none"}
        stroke={filled ? "none" : color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
      />
      <Path
        fill={filled ? color : "none"}
        stroke={filled ? "none" : color}
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
        d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
      />
    </Svg>
  );
}

export function EmailIcon({
  size = 24,
  color = "black",
  filled = false,
  strokeWidth = 32,
}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
    >
      <Rect
        x={48}
        y={96}
        width={416}
        height={320}
        rx={40}
        ry={40}
        fill={filled ? color : "none"}
        stroke={filled ? color : color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M112 160L256 272 400 160"
        fill="none"
        stroke={filled ? "white" : color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
