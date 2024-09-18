import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SaveIcon = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <Path
      d="M5.33325 16.8148L11.8974 23.3333L26.6666 8.66667"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SaveIcon
