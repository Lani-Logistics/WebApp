import { useEffect } from "react";
import { SquareMousePointer, X } from "lucide-react";
import { headerLinks } from "@/Constants/data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Variants for staggered animation
const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }, 
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const SideMenu = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 1 }}
        className="w-[300px] h-full flex flex-col bg-secondary p-4 z-20"
      >
        <div className="flex items-center justify-end">
          <X size={24} onClick={onClose} />
        </div>

        {/* Animated List */}
        <motion.ul
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex flex-col gap-4 flex-1 mt-6"
        >
          {headerLinks.map((link) => (
            <motion.li key={link.title} variants={itemVariants} onClick={onClose}>
              <a
                href={`#${link.path}`}
                className="text-main font-sora text-base block p-2 hover:bg-background rounded-md font-medium"
              >
                {link.title}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/track"
            className="bg-background text-main btn h-[50px] w-full rounded-full"
          >
            Track Order
          </Link>
          <Link
            to="/app"
            className="btn bg-primary font-sora text-white h-[50px] px-6 rounded-full flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <SquareMousePointer size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SideMenu;
