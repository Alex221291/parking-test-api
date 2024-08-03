import { PlaceStatusesEnum } from 'src/infrastructure/enums/place-statuses.enum'

export class PantryPlaceDto {
  displayedNo: number
  floor: number
  area: number
  currentPrice: number
  previousPrice: number
  status: PlaceStatusesEnum
}
