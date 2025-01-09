import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  try {
    const filePath = path.join(process.cwd(), 'data', 'blog-posts', `${slug}.json`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error reading blog post data for slug ${slug}:`, error)
    return NextResponse.json({ error: 'Failed to read blog post data' }, { status: 500 })
  }
}

