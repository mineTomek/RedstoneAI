import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(request: NextRequest) {
  if (!request.nextUrl.searchParams.has('circuit')) {
    return new NextResponse("Missing query parameter 'circuit'", {
      status: 400,
    })
  }

  const jsonDirectory = path.join(process.cwd(), 'circuits')

  const circuitName = request.nextUrl.searchParams.get('circuit')

  const circuitPath = `${jsonDirectory}/${circuitName}.json`

  if (!fs.existsSync(circuitPath) || circuitName === 'schema') {
    return new NextResponse("Can't find the given circuit", {
      status: 404,
    })
  }

  const fileContents = JSON.parse(
    await fs.promises.readFile(circuitPath, 'utf8')
  )

  return NextResponse.json(fileContents)
}
