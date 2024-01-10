import { ProductController } from './../controller/ProductController';

// import { LoaiSPController } from './../controller/LoaiSPController';
// src/app.ts
import express, { Request, Response } from 'express';
import { connectDatabase } from './database';
import bodyParser from 'body-parser';
import cors from 'cors';

import { LoaiSPRepository } from '../repositories/LoaiSPRepository';
import { LoaiSPService } from '../service/LoaiSPService';
import { LoaiSPController } from '../controller/LoaiSPController';
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductService } from './../service/ProductService';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/upload', express.static('upload'));


async function startServer() {
  try {
    const connection = await connectDatabase();

    // genre route
    const loaispRepository = new LoaiSPRepository(connection);
    const loaispService = new LoaiSPService(loaispRepository);
    const loaispController = new LoaiSPController(loaispService);

    const productRepository = new ProductRepository(connection);
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    app.get('/api/loaisp/get-all', (req: Request, res: Response) => loaispController.getLoaisp(req, res));

    app.get('/api/loaisp/:id', (req: Request, res: Response) => loaispController.getLoaispById(req, res));

    app.post('/api/loaisp/add', (req: Request, res: Response) => loaispController.addLoaisp(req, res));

    app.put('/api/loaisp/update/:id', (req: Request, res: Response) => loaispController.updateLoaisp(req, res));

    app.delete('/api/loaisp/:id', (req: Request, res: Response) => loaispController.deleteLoaisp(req, res));
    //product
    app.get('/api/sanpham/get-all', (req: Request, res: Response) => productController.getsanpham(req, res));

    app.get('/api/sanpham/:id', (req: Request, res: Response) => productController.getsanphamById(req, res));

    app.post('/api/sanpham/add', (req: Request, res: Response) => productController.addsanpham(req, res));

    app.put('/api/sanpham/update/:id', (req: Request, res: Response) => productController.updatesanpham(req, res));

    app.delete('/api/sanpham/:id', (req: Request, res: Response) => productController.deletesanpham(req, res));

    app.post('/api/sanpham/timkiem',(req: Request, res: Response) => productController.timkiemsanpham(req, res));

    //khachhang
    app.listen(port, () => {
      console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();