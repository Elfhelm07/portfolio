'use client'

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Tags } from 'lucide-react'

export default function BlogPage() {
  const [blogData, setBlogData] = useState([])
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogListResponse, profileResponse] = await Promise.all([
          fetch('/api/blog-list'),
          fetch('/api/profile')
        ]);

        if (!blogListResponse.ok || !profileResponse.ok) {
          throw new Error(`HTTP error! status: ${blogListResponse.status}, ${profileResponse.status}`);
        }

        const [blogList, profile] = await Promise.all([
          blogListResponse.json(),
          profileResponse.json()
        ]);

        setBlogData(blogList);
        setProfileData(profile);
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
  if (!profileData || blogData.length === 0) return <div className="flex justify-center items-center h-screen">No data available</div>

  const stats = {
    posts: blogData.length,
    categories: Array.from(new Set(blogData.flatMap(post => post.tags))).length,
    tags: Array.from(new Set(blogData.flatMap(post => post.tags))).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Image
            src="/placeholder.svg?height=120&width=120"
            alt={profileData.name}
            width={120}
            height={120}
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
          <p className="text-muted-foreground mb-6">
            Thoughts on AI, Machine Learning, and Software Engineering
          </p>
          
          <div className="flex justify-center gap-8">
            <div>
              <p className="text-2xl font-bold">{stats.posts}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.categories}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.tags}</p>
              <p className="text-sm text-muted-foreground">Tags</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {blogData.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl hover:text-primary">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

