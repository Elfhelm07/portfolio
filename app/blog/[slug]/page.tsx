'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, Tags, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  content: Array<{
    type: string
    content: string
    items?: string[]
    language?: string
  }>
  tags: string[]
}

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.slug) {
        setError('No slug provided')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/blog-posts/${params.slug}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching blog post:', error)
        setError('Failed to fetch blog post. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Error</h1>
      <p className="text-red-500">{error}</p>
      <Link href="/blog" className="mt-4 text-blue-500 hover:underline">
        Return to blog list
      </Link>
    </div>
  )
  if (!post) return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
      <p>The requested blog post could not be found.</p>
      <Link href="/blog" className="mt-4 text-blue-500 hover:underline">
        Return to blog list
      </Link>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </Link>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="mb-8">
              {post.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return <p key={index}>{block.content}</p>
                  case 'heading':
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{block.content}</h2>
                  case 'list':
                    return (
                      <ul key={index} className="list-disc pl-6 mb-4">
                        {block.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="mb-2">{item}</li>
                        ))}
                      </ul>
                    )
                  case 'code':
                    return (
                      <div key={index} className="mb-6">
                        <SyntaxHighlighter
                          language={block.language}
                          style={atomDark}
                          className="rounded-lg p-4"
                        >
                          {block.content}
                        </SyntaxHighlighter>
                      </div>
                    )
                  default:
                    return null
                }
              })}
            </div>

            <div className="flex items-center gap-2 mt-8">
              <Tags className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  )
}

