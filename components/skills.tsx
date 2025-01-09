"use client"

import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { PiIcon as Python, Database, Server, Cloud, Code2, Binary, Cpu, Network } from 'lucide-react'

const skills = [
  { name: 'Python', icon: Python, level: 95 },
  { name: 'Machine Learning', icon: Binary, level: 90 },
  { name: 'Deep Learning', icon: Cpu, level: 85 },
  { name: 'Backend Development', icon: Server, level: 88 },
  { name: 'Databases', icon: Database, level: 85 },
  { name: 'Cloud Computing', icon: Cloud, level: 80 },
  { name: 'System Design', icon: Network, level: 85 },
  { name: 'API Development', icon: Code2, level: 90 },
]

export function Skills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <skill.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.name}</span>
                <Badge variant="secondary">{skill.level}%</Badge>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

