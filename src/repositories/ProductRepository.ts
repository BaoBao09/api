import { sanpham } from './../models/product.model';
import { Connection, RowDataPacket } from 'mysql2/promise';

export class ProductRepository {
    constructor(private connection: Connection) { }
  
    async getsanpham(): Promise<sanpham[]> {
      const [rows] = await this.connection.execute('CALL GetsanphamAll()');
      // Ép kiểu dữ liệu của rows sang RowDataPacket[] để TypeScript biết về kiểu của mảng
      const rowDataPackets = rows as RowDataPacket[];
      // Trả về chỉ phần tử đầu tiên của mảng nhận được từ stored procedure
      return rowDataPackets[0] as sanpham[];
    }
  
    async getLoaispById(p_id: number): Promise<sanpham | null> {
      const [rows] = await this.connection.execute('CALL GetsanphamById(?)', [p_id]);
      // Ép kiểu dữ liệu của rows sang RowDataPacket[] để TypeScript biết về kiểu của mảng
      if (Array.isArray(rows) && rows.length > 0) {
        const genre = rows[0] as sanpham[];
        return genre[0] || null;
      }
      return null;
    }
    async addsanpham(sp: sanpham): Promise<number> {
        const [result] = await this.connection.execute(
          'CALL Addsanpham(?, ?, ?, ?, ?, ?, ?, ?, @sanphamId)',
          [sp.name,sp.id_loai_sp,sp.id_ncc,sp.mota_sp,sp.unit_price,sp.so_luong,sp.image,sp.Delet]
        );
    
        const [output] = await this.connection.execute('SELECT @sanphamId as sanphamId');
        return (output as RowDataPacket[])[0].productId;
    
    }
    async Updatesanpham(sp: sanpham): Promise<void> {
        await this.connection.execute(
          'CALL Updatesanpham(?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [sp.id, sp.name, sp.id_loai_sp, sp.id_ncc, sp.mota_sp, sp.unit_price, sp.so_luong, sp.image, sp.Delet]
        );
    }
    async deletesanpham(sanphamId: number): Promise<void> {
        await this.connection.execute('CALL deletesanpham(?)', [sanphamId]);
    }


}
    