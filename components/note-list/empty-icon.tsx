import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const EmptyIcon = (props: SvgProps) => (
  <Svg
    width={150}
    height={150}
    viewBox="0 0 150 150"
    fill="none"
    {...props}
  >
    <Path
      d="M43.75 87.5H75"
      stroke="#D1D5DB"
      strokeWidth={6}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M43.75 37.2498L20.3125 13.8123"
      stroke="#D1D5DB"
      strokeWidth={6}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M43.5059 14.0625L20.0684 37.5"
      stroke="#D1D5DB"
      strokeWidth={6}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M43.75 62.5H93.75"
      stroke="#D1D5DB"
      strokeWidth={6}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M62.5 12.5H100C120.812 13.625 131.25 21.3125 131.25 49.9375V100"
      stroke="#6B7280"
      strokeWidth={6}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.75 56.3111V99.8738C18.75 124.936 25 137.499 56.25 137.499H75C76.0625 137.499 92.75 137.499 93.75 137.499"
      stroke="#6B7280"
      strokeWidth={6}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M131.25 100L93.75 137.5V118.75C93.75 106.25 100 100 112.5 100H131.25Z"
      stroke="#6B7280"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default EmptyIcon
