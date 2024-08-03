import { PlaceStatusesEnum } from 'src/infrastructure/enums/place-statuses.enum'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'

export class ParkingPlaceDto {
  displayedNo: number
  floor: number
  type: ParkingPlaceTypesEnum
  area: number
  currentPrice: number
  previousPrice: number
  status: PlaceStatusesEnum
}
