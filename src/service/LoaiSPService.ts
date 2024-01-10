import { loaisp } from './../models/Loaisp.model';
import { LoaiSPRepository } from './../repositories/LoaiSPRepository';

export class LoaiSPService {
  constructor(private loaispRepository: LoaiSPRepository) {}

  async getLoaisp(): Promise<loaisp[]> {
    return this.loaispRepository.getLoaisp();
  }

  async getLoaispById(p_id: number): Promise<loaisp| null> {
    return this.loaispRepository.getLoaispById(p_id);
  }

  async addLoaisp(lsp: loaisp): Promise<number> {
    return this.loaispRepository.addLoaisp(lsp);
  }

  async updateLoaisp(lsp: loaisp): Promise<void> {
    await this.loaispRepository.updateLoaisp(lsp);
  }

  async deleteLoaisp(loaispId: number): Promise<void> {
    return this.loaispRepository.deleteLoaisp(loaispId);
  }

}