import { MapsContext } from "@/Context/MapsContext"
import { useContext } from "react"

const useMaps = () => {

    const context = useContext(MapsContext)

    if(!context) throw new Error("useMaps must be used within a MapsProvider")

    return {...context}
}

export default useMaps