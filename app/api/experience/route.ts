import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'experience.json')
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading experience data:', error)
    return NextResponse.json({ error: 'Failed to read experience data' }, { status: 500 })
  }
}

