import { motion } from "framer-motion"

const FormAnimation = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <motion.div
    initial={{opacity: 0, scale: 0.9}}
    animate={{opacity: 1, scale: 1}}
    exit={{opacity: 0, scale: 0.9}}
    className="w-full"
    >
        {children}
    </motion.div>
    </>
  )
}

export default FormAnimation