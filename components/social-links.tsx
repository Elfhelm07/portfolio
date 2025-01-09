import { Github, Linkedin, Twitter, Code, Globe, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function SocialLinks() {
  return (
    <div className="flex space-x-2 justify-center">
      <Button variant="ghost" size="icon" asChild>
        <a href={`mailto:${siteConfig.email}`} aria-label="Email">
          <Mail className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://github.com/Elfhelm07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://www.linkedin.com/in/susmit-kulkarni-5a626124b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://leetcode.com/u/elfhelm/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
          <Code className="h-5 w-5" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href={siteConfig.links.hackerearth} target="_blank" rel="noopener noreferrer" aria-label="HackerEarth">
          <Globe className="h-5 w-5" />
        </a>
      </Button>
    </div>
  )
}

