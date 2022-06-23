import { EnumMdtb } from "./enums";
import { EnumLoaiTb } from "./enums";

export const DataSourceMucDoThongBao = [
  { _id: EnumMdtb.HOA_TOC, ten: 'Hỏa tốc' },
  { _id: EnumMdtb.THUONG_KHAN, ten: 'Thượng khẩn' },
  { _id: EnumMdtb.KHAN, ten: 'Khẩn' },
  { _id: EnumMdtb.THUONG, ten: 'Thường' }
];

export const DataSourceLoaiThongBao = [
  { _id: EnumLoaiTb.TBC, ten: 'Thông báo chung' },
  { _id: EnumLoaiTb.PHONG_CTSV, ten: 'Thông báo của Phòng CTCT-HSSV' },
  { _id: EnumLoaiTb.PHONG_DT, ten: 'Thông báo của Phòng Đào tạo' },
  { _id: EnumLoaiTb.TCNH, ten: 'Thông báo Tài chính người học' },
  { _id: EnumLoaiTb.QLKT, ten: 'Thông báo từ Ban Quản lý ký túc xá' },
];
