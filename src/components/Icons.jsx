import Svg, { Circle, Path, Rect } from 'react-native-svg'

export function PersonIcon ({
  size = 24,
  color = 'black',
  filled = false,
  strokeWidth = 32
}) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
    >
      <Path
        fill={filled ? color : 'none'}
        stroke={filled ? color : 'black'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
        d='M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z'
      />
      <Path
        fill={filled ? color : 'none'}
        stroke={filled ? color : 'black'}
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
        d='M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z'
      />
    </Svg>
  )
}

export function EmailIcon ({
  size = 24,
  color = 'black',
  filled = false,
  strokeWidth = 32
}) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
    >
      <Rect
        x={48}
        y={96}
        width={416}
        height={320}
        rx={40}
        ry={40}
        fill={filled ? color : 'none'}
        stroke={filled ? color : color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
      />
      <Path
        d='M112 160L256 272 400 160'
        fill='none'
        stroke={filled ? 'white' : color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
      />
    </Svg>
  )
}

export function HomeIcon ({ size = 24, color = 'black' }) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
      fill={color}
    >
      <Path d='M261.56,101.28a8,8,0,0,0-11.06,0L66.4,277.15a8,8,0,0,0-2.47,5.79L63.9,448a32,32,0,0,0,32,32H192a16,16,0,0,0,16-16V328a8,8,0,0,1,8-8h80a8,8,0,0,1,8,8l0,136a16,16,0,0,0,16,16h96.06a32,32,0,0,0,32-32l0-165.06a8,8,0,0,0-2.47-5.79Z' />
      <Path d='M490.91,244.15l-74.8-71.56,0-108.59a16,16,0,0,0-16-16h-48a16,16,0,0,0-16,16l0,32L278.19,40.62C272.77,35.14,264.71,32,256,32h0c-8.68,0-16.72,3.14-22.14,8.63L21.16,244.13c-6.22,6-7,15.87-1.34,22.37A16,16,0,0,0,43,267.56L250.5,69.28a8,8,0,0,1,11.06,0L469.08,267.56a16,16,0,0,0,22.59-.44C497.81,260.76,497.3,250.26,490.91,244.15Z' />
    </Svg>
  )
}

export function HomeIconOutline ({ size = 24, color = 'black' }) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
    >
      <Path
        d='M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      />
      <Path
        d='M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      />
      <Path
        d='M400 179L400 64 352 64 352 133'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      />
    </Svg>
  )
}

export function ChevronBackIcon ({
  size = 24,
  color = 'black',
  strokeWidth = 48
}) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
    >
      <Path
        d='M328 112L184 256 328 400'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
      />
    </Svg>
  )
}

export function ChatsIcon ({ size = 24, color = 'black', strokeWidth = 0.8 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 21 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <Path
        d='M4.167 8.064h4.116a.317.317 0 100-.633H4.167a.317.317 0 100 .633zM12.4 9.33H4.167a.317.317 0 100 .634H12.4a.317.317 0 100-.633zM12.4 11.23H4.167a.317.317 0 100 .634H12.4a.316.316 0 100-.633z'
        stroke={color}
        strokeWidth={strokeWidth - 0.3}
      />
      <Path
        d='M18.123.803L7.31.78a1.88 1.88 0 00-1.878 1.877v1.623l-2.555.005A1.88 1.88 0 001 6.164v6.695a1.88 1.88 0 001.878 1.877H4.8v3.167a.317.317 0 00.551.213l3.073-3.38 5.265-.022a1.88 1.88 0 001.878-1.877V12.8l1.665 1.832a.317.317 0 00.551-.213v-3.167h.34A1.88 1.88 0 0020 9.376V2.68A1.88 1.88 0 0018.123.803zm-3.19 12.033c0 .687-.558 1.245-1.245 1.245l-5.406.022a.317.317 0 00-.233.103l-2.616 2.878v-2.665a.317.317 0 00-.316-.316h-2.24a1.246 1.246 0 01-1.244-1.244V6.164c0-.686.559-1.245 1.245-1.245l2.872-.006s0 0 0 0l7.939-.016c.686 0 1.244.558 1.244 1.244v6.695zm4.434-3.46c0 .685-.559 1.243-1.245 1.243h-.655a.317.317 0 00-.317.317v2.665l-1.583-1.742V6.142a1.88 1.88 0 00-1.879-1.878l-7.621.015V2.66c0-.687.558-1.245 1.244-1.245l10.81.022h.002c.686 0 1.244.558 1.244 1.244v6.695z'
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  )
}

export function ChevronRigthIcon ({
  size = 24,
  color = 'black',
  strokeWidth = 48
}) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
    >
      <Path
        d='M184 112L328 256 184 400'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={strokeWidth}
      />
    </Svg>
  )
}

export function BriefcaseIcon ({
  size = 24,
  color = 'black',
  strokeWidth = 48
}) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
    >
      <Rect
        x={32}
        y={128}
        width={448}
        height={320}
        rx={48}
        ry={48}
        fill='none'
        stroke={color}
        strokeLinejoin='round'
        strokeWidth='32px'
      />
      <Path
        d='M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      />
      <Path
        d='M480 240L32 240'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      />
      <Path
        d='M320 240v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      />
    </Svg>
  )
}

export function UserFolderIcon ({ size = 64, accentColor = '#56aaff' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 64 64'
      style={{ enableBackground: 'new 0 0 64 64' }}
    >
      {/* Blue triangle corner */}
      <Path
        d='M39.5 8.6l10 10-8.5 2.3s-3.1-5.4-3.1-5.6 1.6-6.7 1.6-6.7z'
        fill='#be123c'
        // fill="#0478ed"
      />

      {/* Gray background document */}
      <Path
        d='M48 18h-6c-1.1 0-2-.9-2-2v-6c-0-1.1-.9-2-2-2H16c-1.1 0-2 .9-2 2v39c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2V20c0-1.1-.9-2-2-2z'
        fill='#d9dce1'
      />

      {/* Blue document */}
      <Path
        d='M53 27H27v-2c0-1.1-.9-2-2-2H11c-1.1 0-2 .9-2 2v29c0 1.1.9 2 2 2h42c1.1 0 2-.9 2-2V29c0-1.1-.9-2-2-2z'
        fill={accentColor}
      />

      {/* White circle (head) */}
      <Circle cx={32} cy={38.8} r={3.6} fill='#ffffff' />

      {/* White shape (body) */}
      <Path
        d='M38 49v-1c0-.5-.1-1.1-.4-1.6-.9-1.7-3.1-2.4-5.6-2.4s-4.7.7-5.6 2.5c-.3.5-.3 1-.4 1.6v1h12z'
        fill='#ffffff'
      />
    </Svg>
  )
}

export function TramiteIcon ({ size = 64, style }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 64 64'
      style={{ enableBackground: 'new 0 0 64 64' }}
    >
      {/* Blue triangle corner */}
      <Path
        d='m39.5 9.6 10 10-8.5 2.3s-3.1-5.4-3.1-5.6 1.6-6.7 1.6-6.7z'
        fill='#be123c'
        // fill="#56aaff"
      />

      {/* Gray document background */}
      <Path
        d='M48 19h-6c-1.1 0-2-.9-2-2v-6c0-1.1-.9-2-2-2H16c-1.1 0-2 .9-2 2v42c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2V21c0-1.1-.9-2-2-2z'
        fill='#d9dce1'
      />

      {/* White horizontal lines */}
      <Path
        d='M25 36h14M25 24h14M25 30h14'
        stroke='#ffffff'
        strokeWidth={2}
        strokeLinecap='square'
        strokeMiterlimit={10}
        fill='none'
      />

      {/* Blue signature line */}
      <Path
        d='M24 42s3 1 4 3-3 3-3 1c0-1.4 2.1-3.4 3.3-4.4.4-.3 1-.2 1.3.2l.5.7c.4.6 1.3.5 1.5-.2v0c.2-.6 1-.8 1.4-.3l1 1'
        stroke='black'
        // stroke="#0478ed"
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        fill='none'
      />

      {/* Blue edit pencil */}
      <Path
        d='m44.1 46.7-4.6 1.1c-.4.1-.7-.2-.6-.6l1.1-4.6c0-.2.1-.3.3-.5l9.8-9.8c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2l-9.8 9.8c0 .2-.2.3-.4.4z'
        fill='#9f1239'
        // fill="#0478ed"
      />
    </Svg>
  )
}

export function DocumentCheckIcon ({ size = 64, accentColor = '#0478ed' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 64 64'
      style={{ enableBackground: 'new 0 0 64 64' }}
    >
      {/* Blue triangle corner */}
      <Path
        d='m39.5 9.6 10 10-8.5 2.3s-3.1-5.4-3.1-5.6 1.6-6.7 1.6-6.7z'
        fill='#be123c'
        // fill="#56aaff"
      />

      {/* Gray document background */}
      <Path
        d='M48 19h-6c-1.1 0-2-.9-2-2v-6c0-1.1-.9-2-2-2H16c-1.1 0-2 .9-2 2v42c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2V21c0-1.1-.9-2-2-2z'
        fill='#d9dce1'
      />

      {/* White horizontal lines */}
      <Path
        d='M24 38h7M24 32h16'
        stroke='#ffffff'
        strokeWidth={2}
        strokeLinecap='square'
        strokeMiterlimit={10}
        fill='none'
      />

      {/* Blue circle with check */}
      <Circle cx={44} cy={47} r={10} fill={accentColor} />

      {/* White check mark */}
      <Path
        d='m40.1 47.1 2.8 2.9 5-5'
        stroke='#ffffff'
        strokeWidth={2}
        strokeLinecap='square'
        strokeMiterlimit={10}
        fill='none'
      />

      {/* White circles */}
      <Circle cx={24.9} cy={19.9} r={1.8} fill='#ffffff' />
      <Circle cx={31.1} cy={26.1} r={1.8} fill='#ffffff' />

      {/* White connecting line */}
      <Path
        d='m31.7 19.3-7.4 7.4'
        stroke='#ffffff'
        strokeWidth={2}
        strokeMiterlimit={10}
        fill='none'
      />
    </Svg>
  )
}

export function DocumentPlusIcon ({ size = 64 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 64 64'
      style={{ enableBackground: 'new 0 0 64 64' }}
    >
      {/* Blue triangle corner */}
      <Path
        d='m39.5 9.6 10 10-8.5 2.3s-3.1-5.4-3.1-5.6 1.6-6.7 1.6-6.7z'
        fill='#be123c'
        // fill="#56aaff"
      />

      {/* Gray document background */}
      <Path
        d='M48 19h-6c-1.1 0-2-.9-2-2v-6c0-1.1-.9-2-2-2H16c-1.1 0-2 .9-2 2v42c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2V21c0-1.1-.9-2-2-2z'
        fill='#d9dce1'
      />

      {/* White plus symbol */}
      <Path
        d='M26 38h12M32 44V32'
        stroke='#ffffff'
        strokeWidth={4}
        strokeLinecap='square'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        fill='none'
      />
    </Svg>
  )
}

export function CalendarIcon ({ size = 64, accentColor = '#56aaff' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 64 64'
      style={{ enableBackground: 'new 0 0 64 64' }}
    >
      {/* Gray calendar background */}
      <Path
        d='M54 13H10c-1.1 0-2 .9-2 2v37c0 1.1.9 2 2 2h44c1.1 0 2-.9 2-2V15c0-1.1-.9-2-2-2z'
        fill='#d9dce1'
      />

      {/* Blue header */}
      <Path
        d='M54 13H10c-1.1 0-2 .9-2 2v7h48v-7c0-1.1-.9-2-2-2z'
        fill={accentColor}
      />

      {/* Calendar hangers */}
      <Path
        d='M21 18h-3v-6.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V18zM46 18h-3v-6.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V18z'
        fill='#4c0519'
        // fill="#0478ed"
      />

      {/* Calendar dots - Row 1 */}
      <Circle cx={32} cy={30} r={2} fill='#ffffff' />
      <Circle cx={40} cy={30} r={2} fill='#ffffff' />
      <Circle cx={48} cy={30} r={2} fill='#ffffff' />

      {/* Calendar dots - Row 2 */}
      <Circle cx={32} cy={38} r={2} fill='#ffffff' />
      <Circle cx={40} cy={38} r={2} fill='#ffffff' />
      <Circle cx={48} cy={38} r={2} fill='#ffffff' />
      <Circle cx={16} cy={38} r={2} fill='#ffffff' />
      <Circle cx={24} cy={38} r={2} fill='#ffffff' />

      {/* Calendar dots - Row 3 */}
      <Circle cx={32} cy={46} r={2} fill='#ffffff' />
      <Circle cx={40} cy={46} r={2} fill='#ffffff' />
      <Circle cx={16} cy={46} r={2} fill='#ffffff' />
      <Circle cx={24} cy={46} r={2} fill='#ffffff' />
    </Svg>
  )
}
