import { khachhang } from "../models/khachhang.model";
import { Connection, RowDataPacket } from 'mysql2/promise';

export class KhachhangRepository {
    constructor(private connection: Connection) { }
  
    async getkhachhang(): Promise<khachhang[]> {
      const [rows] = await this.connection.execute('CALL GetkhachhangAll()');
      // Ép kiểu dữ liệu của rows sang RowDataPacket[] để TypeScript biết về kiểu của mảng
      const rowDataPackets = rows as RowDataPacket[];
      // Trả về chỉ phần tử đầu tiên của mảng nhận được từ stored procedure
      return rowDataPackets[0] as khachhang[];
    }
  
    async getkhachhangById(kh_id: number): Promise<khachhang | null> {
      const [rows] = await this.connection.execute('CALL GetkhachhangById(?)', [kh_id]);
      // Ép kiểu dữ liệu của rows sang RowDataPacket[] để TypeScript biết về kiểu của mảng
      if (Array.isArray(rows) && rows.length > 0) {
        const genre = rows[0] as khachhang[];
        return genre[0] || null;
      }
      return null;
    }
  }