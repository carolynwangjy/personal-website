import { execSync } from 'child_process'

let cachedCommitDate: Date | null = null

export function getLatestCommitDate(): Date {
  if (cachedCommitDate) {
    return cachedCommitDate
  }

  try {
    // Get the latest commit date in ISO format
    const dateString = execSync('git log -1 --format=%ci', { encoding: 'utf-8' }).trim()
    cachedCommitDate = new Date(dateString)
    return cachedCommitDate
  } catch (error) {
    // Fallback to current date if git command fails (e.g., in production builds without git)
    console.warn('Failed to get git commit date, using current date:', error)
    cachedCommitDate = new Date()
    return cachedCommitDate
  }
}

