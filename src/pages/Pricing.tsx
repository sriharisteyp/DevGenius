import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Particles */}
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-16 w-16 rounded-full blur-3xl opacity-60"
            style={{
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center px-4 relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Coming Soon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-gray-300 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Exciting features are on their way. Stay tuned for updates!
        </motion.p>

        {/* Interactive Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.button
            whileHover={{
              scale: 1.1,
              rotate: [0, 3, -3, 0],
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 shadow-lg transform transition-all duration-300"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home Page
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Visual Enhancements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-xl opacity-30"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-30"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -360],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

export default ComingSoon;
