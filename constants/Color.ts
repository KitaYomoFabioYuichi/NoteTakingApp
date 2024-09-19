import { NoteColor } from "@/types/note"

export const NoteColorValues:{[key in NoteColor]:{fill:string,border:string,fillShade:string}} = {
    "WHITE":{ fill:"#E5E7EB", border:"#9ca3af", fillShade:"#d1d5db"},
    "RED":{ fill:"#FECACA", border:"#F87171", fillShade:"#fca5a5" },
    "YELLOW":{ fill:"#FEF08A", border:"#FACC15", fillShade:"#fde047" },
    "GREEN":{ fill:"#BBF7D0", border:"#4ADE80", fillShade:"#86efac" },
    "BLUE":{ fill:"#BFDBFE", border:"#60A5FA", fillShade:"#93c5fd" },
    "PURPLE":{ fill:"#E9D5FF", border:"#C084FC", fillShade:"#d8b4fe" },
}