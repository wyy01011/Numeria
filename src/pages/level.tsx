import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LevelSelection() {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    if (selectedLevel !== null) {
        return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-center text-4xl text-white">Loading Level {selectedLevel}...</h1>
        </motion.div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl mb-6">Select Your Level</h1>
            <div className="grid grid-cols-3 gap-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedLevel(1)}
                    className="px-6 py-3 bg-blue-500 rounded-lg shadow-lg"
                >
                    Level 1: Face Mojo Jojo
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="px-6 py-3 bg-gray-600 rounded-lg shadow-lg cursor-not-allowed"
                >
                    Level 2: Coming Soon
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="px-6 py-3 bg-gray-600 rounded-lg shadow-lg cursor-not-allowed"
                >
                    Level 3: Coming Soon
                </motion.button>
            </div>
        </div>
    );
}
