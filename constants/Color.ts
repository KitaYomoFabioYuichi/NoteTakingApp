import { NoteColor } from "@/types/note"

export const NoteColors:{[key in NoteColor]:{fill:string,border:string}} = {
    "WHITE":{ fill:"#EAEDEF", border:"#8897A9" },
    "RED":{ fill:"#FECACA", border:"#F87171" },
    "YELLOW":{ fill:"#FEF08A", border:"#FACC15" },
    "GREEN":{ fill:"#BBF7D0", border:"#4ADE80" },
    "BLUE":{ fill:"#BFDBFE", border:"#60A5FA" },
    "PURPLE":{ fill:"#E9D5FF", border:"#C084FC" },
}