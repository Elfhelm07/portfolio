'use client'

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap } from 'lucide-react'

export function ExperienceSection() {
  const [experienceData, setExperienceData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/experience');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExperienceData(data);
      } catch (error) {
        console.error('Error fetching experience data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading experience data...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!experienceData) {
    return <div>No experience data available</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <Briefcase className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Work Experience</h3>
        </div>
        <div className="space-y-4">
          {experienceData.work.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{exp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-sm">{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      <div>
        <div className="flex items-center space-x-2 mb-6">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Education</h3>
        </div>
        <div className="space-y-4">
          {experienceData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{edu.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  <p className="mt-2">{edu.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {edu.achievements.map((achievement) => (
                      <Badge key={achievement} variant="secondary">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

