import { sanpham } from "./../models/product.model";
import { ProductService } from "./../service/ProductService";
import { Request, Response } from "express";

export class ProductController {
  constructor(private productService: ProductService) {}

  async getsanpham(req: Request, res: Response): Promise<void> {
    try {
      const sanpham = await this.productService.getsanpham();
      res.status(200).json(sanpham);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getsanphamById(req: Request, res: Response): Promise<void> {
    try {
      const p_id: number = parseInt(req.params.id, 10);
      const sanpham = await this.productService.getsanphamById(p_id);

      if (sanpham) {
        res.status(200).json(sanpham);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async addsanpham(req: Request, res: Response): Promise<void> {
    try {
      const sp: sanpham = req.body;
      const sanphamId = await this.productService.addsanpham(sp);
      res
        .status(201)
        .json({ id: sanphamId, message: "Genre added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updatesanpham(req: Request, res: Response): Promise<void> {
    try {
      const p_id: number = parseInt(req.params.id, 10);
      const sp: sanpham = req.body;
      sp.id = p_id;

      await this.productService.Updatesanpham(sp);
      res.status(200).json({ message: "Genre updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async deletesanpham(req: Request, res: Response): Promise<void> {
    try {
      const sanphamId: number = parseInt(req.params.id, 10);

      await this.productService.deletesanpham(sanphamId);

      res.status(200).json({ message: "Genre deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async timkiemsanpham(req: Request, res: Response): Promise<void> {
    try {
      const sp: string = req.body;
      const sanphams = await this.productService.searchProductsByName(sp);
      if (sanphams) {
        res.status(200).json(sanphams);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
