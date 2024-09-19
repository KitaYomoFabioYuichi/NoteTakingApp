import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const AddIcon = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <Path
      d="M16 25.3333V6.66666"
      stroke="#030712"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.66663 16H25.3333"
      stroke="#030712"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default AddIcon