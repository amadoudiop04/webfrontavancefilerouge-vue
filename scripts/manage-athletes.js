import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const athletesPath = path.join(__dirname, '../app/data/athletes.json')

// Lire le fichier
function readAthletes() {
  try {
    const data = fs.readFileSync(athletesPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du fichier:', error.message)
    process.exit(1)
  }
}

// Valider la structure
function validateAthlete(athlete) {
  const errors = []

  if (!athlete.id) errors.push('id manquant')
  if (!athlete.name) errors.push('name manquant')
  if (!athlete.weightClass) errors.push('weightClass manquant')
  if (!athlete.record || typeof athlete.record !== 'object') {
    errors.push('record manquant ou invalide')
  } else {
    if (typeof athlete.record.wins !== 'number') errors.push('record.wins invalide')
    if (typeof athlete.record.losses !== 'number') errors.push('record.losses invalide')
    if (typeof athlete.record.draws !== 'number') errors.push('record.draws invalide')
  }
  if (typeof athlete.knockouts !== 'number') errors.push('knockouts manquant ou invalide')
  if (typeof athlete.submissions !== 'number') errors.push('submissions manquant ou invalide')
  if (!['Actif', 'Blessé', 'Retraité', 'En pause'].includes(athlete.status)) {
    errors.push('status invalide')
  }
  if (typeof athlete.inCompetition !== 'boolean') errors.push('inCompetition manquant ou invalide')

  return errors
}

// Commande: validate
function validate() {
  console.log('🔍 Validation du fichier athletes.json...\n')

  const athletes = readAthletes()

  if (!Array.isArray(athletes)) {
    console.error('❌ Le fichier doit contenir un tableau')
    process.exit(1)
  }

  let hasErrors = false
  const ids = new Set()

  athletes.forEach((athlete, index) => {
    const errors = validateAthlete(athlete)

    if (errors.length > 0) {
      hasErrors = true
      console.log(`❌ Athlète #${index + 1} (${athlete.name || 'sans nom'}):`)
      errors.forEach(error => console.log(`   - ${error}`))
      console.log()
    }

    // Vérifier les doublons d'ID
    if (athlete.id) {
      if (ids.has(athlete.id)) {
        hasErrors = true
        console.log(`❌ ID dupliqué: ${athlete.id} (${athlete.name})`)
      }
      ids.add(athlete.id)
    }
  })

  if (!hasErrors) {
    console.log('✅ Validation réussie!')
    console.log(`📊 ${athletes.length} athlètes validés`)
  } else {
    console.log('\n⚠️  Validation échouée - Corriger les erreurs ci-dessus')
    process.exit(1)
  }
}

// Commande: backup
function backup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const backupPath = path.join(__dirname, `../app/data/athletes.backup.${timestamp}.json`)

  try {
    fs.copyFileSync(athletesPath, backupPath)
    console.log(`✅ Sauvegarde créée: ${path.basename(backupPath)}`)
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error.message)
    process.exit(1)
  }
}

// Commande: stats
function stats() {
  const athletes = readAthletes()

  console.log('📊 Statistiques des athlètes\n')
  console.log(`Total d'athlètes: ${athletes.length}`)

  // Par catégorie
  const byWeight = {}
  athletes.forEach((athlete) => {
    byWeight[athlete.weightClass] = (byWeight[athlete.weightClass] || 0) + 1
  })

  console.log('\nPar catégorie de poids:')
  Object.entries(byWeight).sort((a, b) => b[1] - a[1]).forEach(([weight, count]) => {
    console.log(`  ${weight}: ${count}`)
  })

  // Par statut
  const byStatus = {}
  athletes.forEach((athlete) => {
    byStatus[athlete.status] = (byStatus[athlete.status] || 0) + 1
  })

  console.log('\nPar statut:')
  Object.entries(byStatus).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`)
  })

  // En compétition
  const inCompetition = athletes.filter(a => a.inCompetition).length
  console.log(`\nEn compétition: ${inCompetition} / ${athletes.length}`)
}

// Main
const command = process.argv[2]

switch (command) {
  case 'validate':
    validate()
    break
  case 'backup':
    backup()
    break
  case 'stats':
    stats()
    break
  default:
    console.log(`
Usage: node scripts/manage-athletes.js [command]

Commands:
  validate  - Valider le fichier athletes.json
  backup    - Créer une sauvegarde du fichier
  stats     - Afficher les statistiques

Examples:
  node scripts/manage-athletes.js validate
  node scripts/manage-athletes.js backup
  node scripts/manage-athletes.js stats
    `)
}
