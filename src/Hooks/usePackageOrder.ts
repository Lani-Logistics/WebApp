import { useContext } from "react"
import { PackageOrderContext } from "@/Context"
import { storage, STORAGE } from "@/Backend/appwrite"
const usePackageOrder = () => {
const context = useContext(PackageOrderContext)
if (!context) {
    throw new Error("usePackageOrder must be used within a PackageOrderProvider")
}

const imgUrl = (id: string) => {
  return storage.getFilePreview(STORAGE, id)
}
  return {
    ...context,
    imgUrl
  }
}

export default usePackageOrder