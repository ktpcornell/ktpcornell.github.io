import { campusClubs } from '@/lib/constants'
import { LogoCloud } from './PlacementsCloud'

export function CampusCloud() {
  return <LogoCloud title="Campus Involvements" items={campusClubs} dir="clubs" />
}
