import fs from 'fs'
import path from 'path'

type HobbySection = {
  title: string
  id: string
  content: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  if (!match) {
    return { metadata: {}, content: fileContent.trim() }
  }
  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Record<string, string> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim()] = value
  })

  return { metadata, content }
}

function getMarkdownFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx' || path.extname(file) === '.md')
}

function readMarkdownFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

export function getHobbySections(): HobbySection[] {
  const sectionsDir = path.join(process.cwd(), 'app', 'hobbies', 'sections')
  let markdownFiles = getMarkdownFiles(sectionsDir)
  return markdownFiles.map((file) => {
    let { metadata, content } = readMarkdownFile(path.join(sectionsDir, file))
    let id = path.basename(file, path.extname(file))

    return {
      title: metadata.title || id,
      id: metadata.id || id,
      content,
    }
  })
}

