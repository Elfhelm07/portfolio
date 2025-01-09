import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'blog-list.json')
    
    if (!fs.existsSync(filePath)) {
      console.warn('Blog list file not found. Returning empty array.')
      return NextResponse.json([])
    }

    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading blog list data:', error)
    return NextResponse.json({ error: 'Failed to read blog list data' }, { status: 500 })
  }
}

