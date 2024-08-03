import { PurchaseRequestStatusesEnum } from 'src/infrastructure/enums/purchase-requests-statuses.enum'

export class UpdatePantryPurchaseRequestStatusDto {
  id: number
  status: PurchaseRequestStatusesEnum
}
