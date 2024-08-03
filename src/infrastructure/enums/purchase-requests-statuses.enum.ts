export enum PurchaseRequestStatusesEnum {
  Idle = 0,
  Rejected = 1,
  Approved = 2,
  InProcess = 3,
}

export const statusLabelsPurchaseRequest: Record<PurchaseRequestStatusesEnum, string> = {
  [PurchaseRequestStatusesEnum.Idle]: "Незанятый",
  [PurchaseRequestStatusesEnum.Rejected]: "Отклонено",
  [PurchaseRequestStatusesEnum.Approved]: "Продано",
  [PurchaseRequestStatusesEnum.InProcess]: "Забронировано",
};