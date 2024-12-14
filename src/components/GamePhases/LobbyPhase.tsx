'use client'

import { useState, useEffect } from 'react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ScrollArea } from "../ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, MessageSquare, Settings, Users, Play, Circle } from 'lucide-react'

export default function GameLobby({gameState, onStartGame, onExit}) {
  const [activeTab, setActiveTab] = useState('rooms')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [noiseOpacity, setNoiseOpacity] = useState(0.03)

  useEffect(() => {
    const interval = setInterval(() => {
      setNoiseOpacity((prev) => (Math.random() * 0.02) + 0.02)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const rooms = [
    { id: 1, name: "Crypto Arena", players: ["CryptoWarrior", "NFTHunter"], maxPlayers: 8, status: "open" },
    { id: 2, name: "Blockchain Battleground", players: ["BlockchainBeast", "TokenMaster", "CoinCollector", "HashMaster", "DeFiDemon", "WalletWizard", "MiningMaverick", "LedgerLegend"], maxPlayers: 8, status: "full" },
    { id: 3, name: "NFT Colosseum", players: ["PixelPuncher", "RareBitFighter"], maxPlayers: 6, status: "open" },
    { id: 4, name: "DeFi Dojo", players: [], maxPlayers: 4, status: "open" },
  ]

  const friends = [
    { id: 1, name: "CryptoWarrior", status: "online", avatar: "/placeholder.svg" },
    { id: 2, name: "NFTHunter", status: "offline", avatar: "/placeholder.svg" },
    { id: 3, name: "BlockchainBeast", status: "online", avatar: "/placeholder.svg" },
    { id: 4, name: "TokenMaster", status: "away", avatar: "/placeholder.svg" },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
          opacity: noiseOpacity,
        }}
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-black/30 backdrop-blur-xl rounded-3xl p-8 flex flex-col gap-8 min-h-[762px] relative z-10 shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Lobby
          </motion.h1>
          <Button 
            onClick={onExit}
            variant="outline" 
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all duration-300 ease-in-out hover:scale-105"
          >
            Leave Lobby
          </Button>
        </div>

        <div className="flex space-x-4 border-b border-white/10">
          {['rooms', 'chat', 'settings'].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              className={`relative px-6 py-3 rounded-none border-b-2 transition-all duration-300 ${
                activeTab === tab 
                  ? 'text-purple-400 border-purple-400' 
                  : 'text-white/70 hover:text-white border-transparent'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'rooms' && <Users className="mr-2 h-4 w-4" />}
              {tab === 'chat' && <MessageSquare className="mr-2 h-4 w-4" />}
              {tab === 'settings' && <Settings className="mr-2 h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <ScrollArea className="h-[400px] rounded-xl">
              <AnimatePresence>
                {activeTab === 'rooms' && rooms.map((room, index) => (
                  <motion.div 
                    key={room.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-center justify-between py-4 px-4 hover:bg-white/5 cursor-pointer rounded-lg transition-all duration-300 ${
                      index !== rooms.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="space-y-1">
                      <h3 className="text-white font-semibold">{room.name}</h3>
                      <p className="text-white/60 text-sm">
                        {room.players.length}/{room.maxPlayers} players
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      room.status === "open" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  {/* Chat messages would go here */}
                  <div className="text-white/60 text-center">Chat coming soon...</div>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="space-y-4 p-4 text-white">
                  <h3 className="text-lg font-semibold">Game Settings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Game Mode:</span>
                      <span className="text-purple-400">Knockout</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Map:</span>
                      <span className="text-purple-400">Neon City</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Players:</span>
                      <span className="text-purple-400">8</span>
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>

          <div className="col-span-1">
            {activeTab === 'rooms' && (
              <div className="space-y-4">
                <motion.div 
                  className="bg-black/20 rounded-xl p-4 min-h-96"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {selectedRoom ? selectedRoom.name : 'Select a room'}
                  </h3>
                  {selectedRoom && (
                    <ScrollArea className="h-[320px]">
                      <AnimatePresence>
                        {selectedRoom.players.map((player, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center space-x-3 mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className='bg-cyan-500/50'>{player[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-white">{player}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </ScrollArea>
                  )}
                </motion.div>
               
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 ease-in-out hover:scale-105"
                  disabled={!selectedRoom || selectedRoom.status === 'full'}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Join Room
                </Button>
             
              </div>
            )}
            {activeTab === 'chat' && (
              <>
              <motion.div 
                className="bg-black/20 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Friends</h3>
                <ScrollArea className="h-[300px]">
                  <AnimatePresence>
                    {friends.map((friend, index) => (
                      <motion.div 
                        key={friend.id} 
                        className="flex items-center space-x-3 mb-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback className='bg-cyan-500/50'>{friend.name[0]}</AvatarFallback>
                          </Avatar>
                          <Circle className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${
                            friend.status === 'online' ? 'text-green-500' : 
                            friend.status === 'away' ? 'text-yellow-500' : 'text-gray-500'
                          } fill-current`} />
                        </div>
                        <span className="text-white">{friend.name}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
              </motion.div>
              <div className='min-h-24' />
              </>
            )}
          </div>
        </div>

        <div className="w-full mt-auto">
          {activeTab === 'chat' && (
            <div className="flex space-x-2">
              <Input placeholder="Type a message..." className="flex-grow bg-white/10 border-white/20 text-white placeholder-white/50" />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 ease-in-out hover:scale-105">Send</Button>
            </div>
          )}
          {activeTab === 'rooms' && (
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 transition-all duration-300 ease-in-out hover:scale-105"
              onClick={onStartGame}
              disabled={!selectedRoom || selectedRoom.players.length < 2}
            >
              <Play className="mr-2 h-5 w-5" />
              Start Game
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

