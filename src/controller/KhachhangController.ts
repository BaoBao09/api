import { khachhang } from './../models/khachhang.model';
import { Request, Response } from 'express';
import { khachhangService } from "../service/khachhangService";

export class KhachhangController {
    constructor(private khachhangService: khachhangService) {}
  
    async getkhachhang(req: Request, res: Response): Promise<void> {
      try {
        const khachhang = await this.khachhangService.getkhachhang();
        res.status(200).json(khachhang);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
    async getkhachangById(req: Request, res: Response): Promise<void> {
        try {
          const kh_id: number = parseInt(req.params.id, 10);
          const khachhang = await this.khachhangService.getkhachhangById(kh_id);
    
          if (khachhang) {
            res.status(200).json(khachhang);
          } else {
            res.status(404).json({ message: 'Product not found' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
    }
}