import { format, formatDistance, formatRelative, isValid, parseISO, differenceInDays, differenceInHours, differenceInMinutes, isToday, isYesterday, isTomorrow, startOfDay, endOfDay, addDays, subDays } from 'date-fns'
import { fr } from 'date-fns/locale'

// Configuration locale française
const locale = fr

// Formatage de base
export function formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Date invalide'
  }
  
  return format(dateObj, formatStr, { locale })
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd/MM/yyyy HH:mm')
}

export function formatTime(date: string | Date): string {
  return formatDate(date, 'HH:mm')
}

export function formatDateLong(date: string | Date): string {
  return formatDate(date, 'dd MMMM yyyy')
}

export function formatDateShort(date: string | Date): string {
  return formatDate(date, 'dd/MM/yy')
}

// Formatage relatif
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Date invalide'
  }
  
  return formatDistance(dateObj, new Date(), { 
    addSuffix: true, 
    locale 
  })
}

export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Date invalide'
  }
  
  return formatRelative(dateObj, new Date(), { locale })
}

// Vérifications de dates
export function isDateToday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isToday(dateObj)
}

export function isDateYesterday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isYesterday(dateObj)
}

export function isDateTomorrow(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isTomorrow(dateObj)
}

export function isDateOverdue(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return dateObj < new Date()
}

// Calculs de différences
export function getDaysDifference(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return differenceInDays(d2, d1)
}

export function getHoursDifference(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return differenceInHours(d2, d1)
}

export function getMinutesDifference(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2
  return differenceInMinutes(d2, d1)
}

// Manipulation de dates
export function addDaysToDate(date: string | Date, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return addDays(dateObj, days)
}

export function subtractDaysFromDate(date: string | Date, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return subDays(dateObj, days)
}

export function getStartOfDay(date: string | Date): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return startOfDay(dateObj)
}

export function getEndOfDay(date: string | Date): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return endOfDay(dateObj)
}

// Formatage pour les tâches
export function formatTaskDueDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Date invalide'
  }
  
  if (isDateToday(dateObj)) {
    return `Aujourd'hui à ${formatTime(dateObj)}`
  }
  
  if (isDateTomorrow(dateObj)) {
    return `Demain à ${formatTime(dateObj)}`
  }
  
  if (isDateOverdue(dateObj)) {
    return `En retard - ${formatDateTime(dateObj)}`
  }
  
  return formatDateTime(dateObj)
}

export function getTaskDueStatus(date: string | Date): {
  status: 'overdue' | 'due-soon' | 'due-today' | 'upcoming'
  daysLeft: number
  message: string
} {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  const now = new Date()
  const daysLeft = getDaysDifference(now, dateObj)
  
  if (isDateOverdue(dateObj)) {
    return {
      status: 'overdue',
      daysLeft: Math.abs(daysLeft),
      message: `En retard de ${Math.abs(daysLeft)} jour${Math.abs(daysLeft) > 1 ? 's' : ''}`
    }
  }
  
  if (isDateToday(dateObj)) {
    return {
      status: 'due-today',
      daysLeft: 0,
      message: 'À faire aujourd\'hui'
    }
  }
  
  if (daysLeft <= 3) {
    return {
      status: 'due-soon',
      daysLeft,
      message: `À faire dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`
    }
  }
  
  return {
    status: 'upcoming',
    daysLeft,
    message: `À faire dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`
  }
}

// Formatage pour les messages
export function formatMessageDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Date invalide'
  }
  
  if (isDateToday(dateObj)) {
    return `Aujourd'hui à ${formatTime(dateObj)}`
  }
  
  if (isDateYesterday(dateObj)) {
    return `Hier à ${formatTime(dateObj)}`
  }
  
  return formatDateTime(dateObj)
}

// Formatage pour les notifications
export function formatNotificationDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Date invalide'
  }
  
  const minutesDiff = getMinutesDifference(dateObj, new Date())
  
  if (minutesDiff < 1) {
    return 'À l\'instant'
  }
  
  if (minutesDiff < 60) {
    return `Il y a ${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`
  }
  
  const hoursDiff = getHoursDifference(dateObj, new Date())
  
  if (hoursDiff < 24) {
    return `Il y a ${hoursDiff} heure${hoursDiff > 1 ? 's' : ''}`
  }
  
  return formatRelativeTime(dateObj)
}

// Utilitaires pour les calendriers
export function getWeekDays(): string[] {
  return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
}

export function getMonthNames(): string[] {
  return [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]
}

export function getMonthName(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'MMMM', { locale })
}

export function getDayName(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'EEEE', { locale })
}

// Validation de dates
export function isValidDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isValid(dateObj)
}

export function parseDate(dateString: string): Date | null {
  const date = parseISO(dateString)
  return isValid(date) ? date : null
}

// Utilitaires pour les plages de dates
export function getDateRange(startDate: string | Date, endDate: string | Date): Date[] {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate
  const dates: Date[] = []
  
  let current = start
  while (current <= end) {
    dates.push(current)
    current = addDays(current, 1)
  }
  
  return dates
}

// Formatage pour les exports
export function formatDateForExport(date: string | Date): string {
  return formatDate(date, 'yyyy-MM-dd')
}

export function formatDateTimeForExport(date: string | Date): string {
  return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
}

// Utilitaires pour les fuseaux horaires
export function getCurrentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function formatDateInTimezone(date: string | Date, timezone: string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: timezone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
} 