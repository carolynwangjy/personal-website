export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  const isMonthOnly = /^\d{4}-\d{2}$/.test(date)
  
  // Check if date is in YYYY-MM format (no day specified)
  if (isMonthOnly) {
    date = `${date}-01T00:00:00`
  } else if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = isMonthOnly
    ? targetDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : targetDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}


