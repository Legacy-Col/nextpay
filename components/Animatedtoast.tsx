import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Custom Animated Toast
const AnimatedToast = ({ message }: { message: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }} // Start above
            animate={{ opacity: 1, y: 0 }} // Slide in
            exit={{ opacity: 0, y: -50 }} // Slide out
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white text-black p-3 rounded-lg shadow-lg"
        >
            {message}
        </motion.div>
    );
};

// Function to trigger animated toast
export const showToast = (message: string, type: "success" | "error" | "info") => {
    toast(<AnimatedToast message={message} />, { type });
};
