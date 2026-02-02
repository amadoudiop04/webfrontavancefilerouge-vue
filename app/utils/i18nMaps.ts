export const WEIGHT_CLASS_KEY_MAP: Record<string, string> = {
  'Poids plume': 'athlete.weightClasses.featherweight',
  'Poids léger': 'athlete.weightClasses.lightweight',
  'Poids welter': 'athlete.weightClasses.welterweight',
  'Poids moyen': 'athlete.weightClasses.middleweight',
  'Poids lourd léger': 'athlete.weightClasses.lightHeavyweight',
  'Poids lourd': 'athlete.weightClasses.heavyweight'
}

export const STATUS_KEY_MAP: Record<string, string> = {
  Actif: 'athlete.status.active',
  Blessé: 'athlete.status.injured',
  Retraité: 'athlete.status.retired',
  'En pause': 'athlete.status.paused'
}

export const COUNTRY_KEY_MAP: Record<string, string> = {
  Arménie: 'athlete.countries.armenia',
  Australie: 'athlete.countries.australia',
  Brésil: 'athlete.countries.brazil',
  Espagne: 'athlete.countries.spain',
  Irlande: 'athlete.countries.ireland',
  Mexique: 'athlete.countries.mexico',
  'Nigéria/États-Unis': 'athlete.countries.nigeriaUsa',
  'Nouvelle-Zélande': 'athlete.countries.newZealand',
  'Royaume-Uni': 'athlete.countries.uk',
  Russie: 'athlete.countries.russia',
  'République tchèque': 'athlete.countries.czechRepublic',
  Suède: 'athlete.countries.sweden',
  'États-Unis': 'athlete.countries.usa'
}

export const translateI18nValue = (
  value: string | undefined,
  t: (key: string) => string,
  map: Record<string, string>
) => {
  if (!value) return ''
  const key = map[value]
  return key ? t(key) : value
}
