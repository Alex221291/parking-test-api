import {
  PantryPlacesAmountOn1Floor,
  PantryPlacesAmountOn2Floor,
  PantryPlacesAmountOn3Floor,
  PantryPlacesAmountOn4Floor,
  PantryPlacesAmountOn5Floor,
} from 'src/infrastructure/constants/pantry-places-amount.constant'
import { PantryPlaceDto } from 'src/pantry-places/dto/pantry-place.dto'
import { PlaceStatusesEnum } from 'src/infrastructure/enums/place-statuses.enum'

export const pantryPlacesSeedData: PantryPlaceDto[] = [
  ...Array.from(Array(PantryPlacesAmountOn1Floor).keys()).map(
    (number): PantryPlaceDto => {
      return {
        displayedNo: number + 1,
        floor: 1,
        area: 1,
        currentPrice: 1,
        previousPrice: 1,
        status: PlaceStatusesEnum.Free,
      }
    },
  ),
  ...Array.from(Array(PantryPlacesAmountOn2Floor).keys()).map(
    (number): PantryPlaceDto => {
      return {
        displayedNo: number + 4,
        floor: 2,
        area: 1,
        currentPrice: 1,
        previousPrice: 1,
        status: PlaceStatusesEnum.Free,
      }
    },
  ),
  ...Array.from(Array(PantryPlacesAmountOn3Floor).keys()).map(
    (number): PantryPlaceDto => {
      if (number === PantryPlacesAmountOn3Floor - 1) {
        return {
          displayedNo: 14,
          floor: 3,
          area: 1,
          currentPrice: 1,
          previousPrice: 1,
          status: PlaceStatusesEnum.Free,
        }
      }
      if (number === PantryPlacesAmountOn3Floor - 2) {
        return {
          displayedNo: 39,
          floor: 3,
          area: 1,
          currentPrice: 1,
          previousPrice: 1,
          status: PlaceStatusesEnum.Free,
        }
      }
      if (number === PantryPlacesAmountOn3Floor - 3) {
        return {
          displayedNo: 40,
          floor: 3,
          area: 1,
          currentPrice: 1,
          previousPrice: 1,
          status: PlaceStatusesEnum.Free,
        }
      }
      return {
        displayedNo: number + 53,
        floor: 3,
        area: 1,
        currentPrice: 1,
        previousPrice: 1,
        status: PlaceStatusesEnum.Free,
      }
    },
  ),
  ...Array.from(Array(PantryPlacesAmountOn4Floor).keys()).map(
    (number): PantryPlaceDto => {
      if (number === PantryPlacesAmountOn4Floor - 1) {
        return {
          displayedNo: 41,
          floor: 4,
          area: 1,
          currentPrice: 1,
          previousPrice: 1,
          status: PlaceStatusesEnum.Free,
        }
      }
      if (number === PantryPlacesAmountOn4Floor - 2) {
        return {
          displayedNo: 42,
          floor: 4,
          area: 1,
          currentPrice: 1,
          previousPrice: 1,
          status: PlaceStatusesEnum.Free,
        }
      }
      if (number === PantryPlacesAmountOn4Floor - 3) {
        return {
          displayedNo: 43,
          floor: 4,
          area: 1,
          currentPrice: 1,
          previousPrice: 1,
          status: PlaceStatusesEnum.Free,
        }
      }
      return {
        displayedNo: number + 274,
        floor: 4,
        area: 1,
        currentPrice: 1,
        previousPrice: 1,
        status: PlaceStatusesEnum.Free,
      }
    },
  ),
  ...Array.from(Array(PantryPlacesAmountOn5Floor).keys()).map(
    (number): PantryPlaceDto => {
      return {
        displayedNo: number + 18,
        floor: 5,
        area: 1,
        currentPrice: 1,
        previousPrice: 1,
        status: PlaceStatusesEnum.Free,
      }
    },
  ),
]
