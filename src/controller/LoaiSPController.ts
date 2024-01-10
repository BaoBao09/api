import { LoaiSPService } from '../service/LoaiSPService';
import { loaisp } from '../models/Loaisp.model';
import { Request, Response } from 'express';

export class LoaiSPController {
  constructor(private loaispService: LoaiSPService) {}

  async getLoaisp(req: Request, res: Response): Promise<void> {
    try {
      const loaisp = await this.loaispService.getLoaisp();
      res.status(200).json(loaisp);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getLoaispById(req: Request, res: Response): Promise<void> {
    try {
      const p_id: number = parseInt(req.params.id, 10);
      const loaisp = await this.loaispService.getLoaispById(p_id);

      if (loaisp) {
        res.status(200).json(loaisp);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async addLoaisp(req: Request, res: Response): Promise<void> {
    try {
      const lsp: loaisp = req.body;
      const loaispId = await this.loaispService.addLoaisp(lsp);
      res.status(201).json({ id: loaispId, message: 'Genre added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateLoaisp(req: Request, res: Response): Promise<void> {
    try {
      const p_id: number = parseInt(req.params.id, 10);
      const lsp: loaisp = req.body;
      lsp.id = p_id;

      await this.loaispService.updateLoaisp(lsp);
      res.status(200).json({ message: 'Genre updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteLoaisp(req: Request, res: Response): Promise<void> {
    try {
      const loaispId: number = parseInt(req.params.id, 10);

      await this.loaispService.deleteLoaisp(loaispId);

      res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

