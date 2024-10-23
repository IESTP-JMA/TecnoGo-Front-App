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
        stroke={filled ? color : "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
      />
      <Path
        fill={filled ? color : "none"}
        stroke={filled ? color : "black"}
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

export function HomeIcon({ size = 24, color = "black" }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill={color}
    >
      <Path d="M261.56,101.28a8,8,0,0,0-11.06,0L66.4,277.15a8,8,0,0,0-2.47,5.79L63.9,448a32,32,0,0,0,32,32H192a16,16,0,0,0,16-16V328a8,8,0,0,1,8-8h80a8,8,0,0,1,8,8l0,136a16,16,0,0,0,16,16h96.06a32,32,0,0,0,32-32l0-165.06a8,8,0,0,0-2.47-5.79Z" />
      <Path d="M490.91,244.15l-74.8-71.56,0-108.59a16,16,0,0,0-16-16h-48a16,16,0,0,0-16,16l0,32L278.19,40.62C272.77,35.14,264.71,32,256,32h0c-8.68,0-16.72,3.14-22.14,8.63L21.16,244.13c-6.22,6-7,15.87-1.34,22.37A16,16,0,0,0,43,267.56L250.5,69.28a8,8,0,0,1,11.06,0L469.08,267.56a16,16,0,0,0,22.59-.44C497.81,260.76,497.3,250.26,490.91,244.15Z" />
    </Svg>
  );
}

export function HomeIconOutline({ size = 24, color = "black" }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
    >
      <Path
        d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
      <Path
        d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
      <Path
        d="M400 179L400 64 352 64 352 133"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
    </Svg>
  );
}
