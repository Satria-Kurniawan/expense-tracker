import { motion } from "motion/react"

export default function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <motion.img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={50}
        height={50}
        className="rounded-full border dark:border-none"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "50%", "20%", "20%", "50%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  )
}
