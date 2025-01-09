'use client'

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Card, CardContent } from "@/components/ui/card"
import { TechStack } from "@/components/tech-stack"
import { ExperienceSection } from "@/components/experience-section"
import SocialLinks from "@/components/social-links"
import { Mail } from 'lucide-react'

export default function Home() {
  const [profileData, setProfileData] = useState(null)
  const [projectsData, setProjectsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, projectsResponse] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/projects')
        ]);

        if (!profileResponse.ok || !projectsResponse.ok) {
          throw new Error(`HTTP error! status: ${profileResponse.status}, ${projectsResponse.status}`);
        }

        const [profileData, projectsData] = await Promise.all([
          profileResponse.json(),
          projectsResponse.json()
        ]);

        setProfileData(profileData);
        setProjectsData(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>
  if (!profileData || projectsData.length === 0) return <div className="flex justify-center items-center h-screen">No data available</div>

  return (
    <div className="w-full">
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20 scroll-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4">{profileData.name}</h1>
          <p className="text-2xl mb-8 text-muted-foreground">{profileData.title}</p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="introduction" className="py-20 scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image src="/placeholder.svg?height=400&width=400" alt={profileData.name} width={400} height={400} className="rounded-full" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                {profileData.about.map((paragraph, index) => (
                  <p key={index} className="text-lg mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="tech-stack" className="py-20 bg-secondary/10 scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Tech Stack</h2>
            <TechStack />
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  techStack={project.techStack}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-secondary/10 scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Experience & Education</h2>
            <ExperienceSection />
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-secondary/10 scroll-mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">Contact Me</h2>
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <p className="text-lg mb-4">
                      I'm always open to new opportunities and collaborations. Feel free to reach out!
                    </p>
                    <div className="flex justify-center items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <a href={`mailto:${profileData.email}`} className="text-primary hover:underline">
                        {profileData.email}
                      </a>
                    </div>
                    <div className="pt-4">
                      <SocialLinks />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

