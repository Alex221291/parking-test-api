import { PurchaseRequestStatusesEnum } from 'src/infrastructure/enums/purchase-requests-statuses.enum'

export class UpdatePurchaseRequestStatusDto {
  id: number
  status: PurchaseRequestStatusesEnum
}
