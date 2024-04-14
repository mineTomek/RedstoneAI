import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(request: NextRequest) {
  if (!request.nextUrl.searchParams.has('circuit')) {
    return new NextResponse("Missing query parameter 'circuit'", {
      status: 400,
    })
  }

  const jsonDirectory = path.join(process.cwd(), 'circuits')

  const fileContents = JSON.parse(
    await fs.readFile(
      jsonDirectory +
        '/' +
        request.nextUrl.searchParams.get('circuit') +
        '.json',
      'utf8'
    )
  )

  return NextResponse.json(fileContents)
}
