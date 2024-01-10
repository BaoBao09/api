import { Request, Response } from 'express';
import { loaisp } from '../models/Loaisp.model';
import { Connection, RowDataPacket } from 'mysql2/promise';


export class LoaiSPRepository {
  constructor(private connection: Connection) { }

  async getLoaisp(): Promise<loaisp[]> {
    const [rows] = await this.connection.execute('CALL GetLoaispcAll()');
    // Ép kiểu dữ liệu của rows sang RowDataPacket[] để TypeScript biết về kiểu của mảng
    const rowDataPackets = rows as RowDataPacket[];
    // Trả về chỉ phần tử đầu tiên của mảng nhận được từ stored procedure
    return rowDataPackets[0] as loaisp[];
  }

  async getLoaispById(p_id: number): Promise<loaisp | null> {
    const [rows] = await this.connection.execute('CALL GetLoaispById(?)', [p_id]);
    // Ép kiểu dữ liệu của rows sang RowDataPacket[] để TypeScript biết về kiểu của mảng
    if (Array.isArray(rows) && rows.length > 0) {
      const genre = rows[0] as loaisp[];
      return genre[0] || null;
    }
    return null;
  }
  

  async addLoaisp(lsp: loaisp): Promise<number> {
    const [result] = await this.connection.execute(
      'CALL Addloaisp(?, @loaispId)',
      [lsp.tenloai]
    );

    const [output] = await this.connection.execute('SELECT @loaispId as loaispId');
    return (output as RowDataPacket[])[0].productId;

  }

  async updateLoaisp(lsp: loaisp): Promise<void> {
    await this.connection.execute(
      'CALL UpdateLoaisp(?, ?)',
      [lsp.id, lsp.tenloai]
    );
  }

  async deleteLoaisp(loaispId: number): Promise<void> {
    await this.connection.execute('CALL deleteLoaisp(?)', [loaispId]);
  }
  
}