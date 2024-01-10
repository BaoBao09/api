import { khachhang } from "../models/khachhang.model";
import { KhachhangRepository } from "../repositories/KhachhangRepository";


export class khachhangService {
    constructor(private khachhangRepository: KhachhangRepository) {}
    async getkhachhang(): Promise<khachhang[]>{
        return this.khachhangRepository.getkhachhang();
    }
    async getkhachhangById(kh_id: number): Promise<khachhang| null> {
        return this.khachhangRepository.getkhachhangById(kh_id);
    }
}