export type AlumniSubmission = {
  id: string
  name: string
  year: string
  role: string
  bio: string
  photoUrl: string
  videos: string[]
}

type Row = Record<string, string>

const NAME_KEYS = ['name', 'player name', 'full name']
const YEAR_KEYS = ['year', 'year played', 'gold cup year', 'edition year']
const ROLE_KEYS = ['role', 'playing role', 'player role']
const BIO_KEYS = ['bio', 'biography', 'profile', 'about', 'journey', 'achievement', 'achievements']
const CONSENT_KEYS = ['disclaimer & consent', 'consent', 'disclaimer and consent']
const APPROVE_KEYS = ['approve', 'approved', 'approval']

function parseCsv(csv: string) {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i]
    const next = csv[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      field += '"'
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(field)
      field = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1
      row.push(field)
      if (row.some(cell => cell.trim())) rows.push(row)
      row = []
      field = ''
      continue
    }

    field += char
  }

  row.push(field)
  if (row.some(cell => cell.trim())) rows.push(row)

  return rows
}

function normalizeKey(key: string) {
  return key.trim().toLowerCase().replace(/\s+/g, ' ')
}

function rowValue(row: Row, keys: string[]) {
  for (const key of keys) {
    const value = row[key]
    if (value?.trim()) return value.trim()
  }

  for (const [header, value] of Object.entries(row)) {
    if (!value?.trim()) continue
    if (keys.some(key => header.startsWith(`${key} `) || header.startsWith(`${key}:`))) {
      return value.trim()
    }
  }

  return ''
}

function isYes(value: string) {
  return value.trim().toLowerCase() === 'yes'
}

function extractDriveId(url: string) {
  const trimmed = url.trim()
  if (!trimmed.includes('drive.google.com')) return ''

  const filePathMatch = trimmed.match(/\/file\/d\/([^/]+)/)
  if (filePathMatch?.[1]) return filePathMatch[1]

  const idParamMatch = trimmed.match(/[?&]id=([^&]+)/)
  if (idParamMatch?.[1]) return idParamMatch[1]

  return ''
}

function getDrivePreviewUrl(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`
}

function getDriveThumbnailUrl(id: string) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`
}

function getFallback(values: string[], index: number) {
  return values[index]?.trim() ?? ''
}

function pickBio(row: Row, values: string[]) {
  const directBio = rowValue(row, BIO_KEYS)
  if (directBio) return directBio

  const driveStartIndex = values.findIndex(value => value.includes('drive.google.com'))
  const candidates = values
    .slice(7, driveStartIndex > -1 ? driveStartIndex : undefined)
    .map(value => value.trim())
    .filter(value => value && !value.includes('@') && !value.includes('drive.google.com'))

  return candidates[0] ?? ''
}

export function parseAlumniSubmissions(csv: string): AlumniSubmission[] {
  const rows = parseCsv(csv)
  const [headers = [], ...dataRows] = rows
  const normalizedHeaders = headers.map(normalizeKey)

  return dataRows
    .map((values, index) => {
      const row = normalizedHeaders.reduce<Row>((acc, header, headerIndex) => {
        acc[header] = values[headerIndex]?.trim() ?? ''
        return acc
      }, {})

      const approved = rowValue(row, APPROVE_KEYS)
      const consent = rowValue(row, CONSENT_KEYS)

      if (!isYes(approved) || (consent && !isYes(consent))) {
        return null
      }

      const driveIds = values
        .map(extractDriveId)
        .filter(Boolean)

      if (driveIds.length === 0) return null

      const photoId = driveIds.length > 1 ? driveIds[0] : ''
      const videoIds = driveIds.length > 1 ? driveIds.slice(1) : driveIds
      const videos = videoIds.map(getDrivePreviewUrl)

      if (videos.length === 0) return null

      const name = rowValue(row, NAME_KEYS) || getFallback(values, 1)
      const year = rowValue(row, YEAR_KEYS) || getFallback(values, 4)
      const role = rowValue(row, ROLE_KEYS) || getFallback(values, 6)
      const bio = pickBio(row, values)

      if (!name) return null

      return {
        id: `${name}-${year || index}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name,
        year,
        role,
        bio,
        photoUrl: photoId ? getDriveThumbnailUrl(photoId) : '',
        videos,
      }
    })
    .filter((submission): submission is AlumniSubmission => Boolean(submission))
}

export async function getApprovedAlumniSubmissions() {
  const sheetId = '1UgjafaVQT1Qd2UBotNJo8k0XtYK5GDPKqxmf3jSlx1k'
  const gid = '474934449'
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`

  if (!csvUrl) {
    return []
  }

  const response = await fetch(csvUrl, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Unable to load alumni sheet: ${response.status}`)
  }

  const csv = await response.text()

  if (csv.trimStart().startsWith('<')) {
    throw new Error('Google Sheet returned HTML instead of CSV. Check that the sheet is shared or published for public access.')
  }

  return parseAlumniSubmissions(csv)
}
