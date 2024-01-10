import { sanpham } from './../models/product.model';
import { ProductRepository } from './../repositories/ProductRepository';


export class ProductService {
    constructor(private productRepository: ProductRepository) {}
    async getsanpham(): Promise<sanpham[]>{
        return this.productRepository.getsanpham();
    }
    async getsanphamById(p_id: number): Promise<sanpham| null> {
        return this.productRepository.getLoaispById(p_id);
    }
    async addsanpham(sp: sanpham): Promise<number> {
        return this.productRepository.addsanpham(sp);
    
    }
    async Updatesanpham(sp: sanpham): Promise<void> {
        await this.productRepository.Updatesanpham(sp);
    }
    async deletesanpham(sanphamId: number): Promise<void> {
        return this.productRepository.deletesanpham(sanphamId);
    }
    
    async searchProductsByName(name: string): Promise<sanpham[]| null>{
        const sanphams = (await this.productRepository.getsanpham())
        return await sanphams.filter(
            (sp1) => sp1.name.toLowerCase().includes(name)
        );
    }
}
