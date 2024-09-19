import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CheckIcon = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <Path
      d="M8 17.1111L12.9231 22L24 11"
      stroke="#6B7280"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default CheckIcon
