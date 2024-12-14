'use client'

import { Button } from "../ui/button"
import { motion } from 'framer-motion'

 

export default function HomePhase({gameState, onLobbyStart}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative top-12">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-black/30 backdrop-blur-xl rounded-3xl p-8 space-y-8 border border-white/10 shadow-2xl"
      >
        {/* Logo section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8 flex justify-center"
        >
          <div         
          className="rounded-lg border-8 border-gray-950 bg-black -rotate-[-3deg] py-4 shadow-lg relative w-96 h-60">
  <div className="relative">
    <video autoPlay loop muted className="w-full h-full object-cover rounded-lg">
      <source src="/videos/logo_bg.webm" type="video/webm" />
    </video>
   <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-[368px] h-[224px] py-4 absolute -top-4 left-0 opacity-30" />
   <img src="/images/nftko_logo.svg" alt="Logo" className="w-full h-[200px] mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
  </div>
</div>
         {/* Character illustration */}
          <motion.div 
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute -top-[244px] w-[666px] -z-10  "
          >
            <img
              src="/images/mascot.avif"
              alt="Game character"
       
            />
          </motion.div>
        </motion.div>

        {/* Menu buttons */}
        <div className="space-y-4 w-full max-w-md mx-auto ">
          {[
            { title: "PLAY GAME", subtitle: "CREATE/JOIN A GAME ROOM", onclick: () => onLobbyStart() },
            { title: "LEADERBOARD", subtitle: "PLAYER STATISTICS", onclick: () => {} },
            { title: "SETTINGS", subtitle: "GAME OPTIONS", onclick: () => {} },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 text-white py-8 rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 group"
                variant="ghost"
                onClick={item.onclick}
              >
                <div className="text-center w-full">
                  <div className="text-xl font-bold group-hover:text-purple-400 transition-colors duration-300">{item.title}</div>
                  <div className="text-amber-500 text-sm">{item.subtitle}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80"
        >          
        </motion.div>
      </motion.div>
    </div>
  )
}

