'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Server, Cloud, Code2, Terminal } from 'lucide-react'

const skillCategories = [
  {
    name: "Machine Learning",
    icon: Brain,
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Neural Networks", "Computer Vision", "NLP"]
  },
  {
    name: "Backend Development",
    icon: Server,
    skills: ["Python", "Node.js", "FastAPI", "Express", "REST APIs", "GraphQL"]
  },
  {
    name: "Data Engineering",
    icon: Database,
    skills: ["SQL", "MongoDB", "Redis", "PostgreSQL", "Data Modeling", "ETL"]
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Microservices", "Serverless"]
  },
  {
    name: "Software Engineering",
    icon: Code2,
    skills: ["System Design", "Design Patterns", "Testing", "Git", "Agile", "Documentation"]
  },
  {
    name: "Tools & Technologies",
    icon: Terminal,
    skills: ["Linux", "Bash", "VSCode", "Jupyter", "Git", "Docker"]
  }
]

export function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

