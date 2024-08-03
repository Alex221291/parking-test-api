export enum ParkingPlaceTypesEnum {
  Standard = 0,
  Comfort = 1,
  Premium = 2,
}

export const statusLabelsParkingPlaceTypes: Record<ParkingPlaceTypesEnum, string> = {
  [ParkingPlaceTypesEnum.Standard]: "Стандарт",
  [ParkingPlaceTypesEnum.Comfort]: "Комфорт",
  [ParkingPlaceTypesEnum.Premium]: "Премиум",
};