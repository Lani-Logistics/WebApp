import { motion } from "framer-motion"

const FormAnimation = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <motion.div
    initial={{opacity: 0, x: 100}}
    animate={{opacity: 1, x: 0}}
    exit={{opacity: 0, x: -100}}
    className="w-full"
    >
        {children}
    </motion.div>
    </>
  )
}

export default FormAnimation