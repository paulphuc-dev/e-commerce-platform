export enum OrderException{
  STATUS = 'không tìm thấy trạng thái',
  NOTFOUND = 'không tìm thấy đơn đặt'
}
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum Message{
  GET_ALL_SUCCESSFULLY = "Lấy danh sách đơn hàng thành công !",
  GET_BY_ID_SUCCESSFULLY = "Lấy đơn hàng thành công !",
  CREATE_SUCCESSFULLY = "Đã đặt hàng !",
  UPDATE_SUCCESSFULLY = "Cập nhật trạng thái đơn hàng !",
}