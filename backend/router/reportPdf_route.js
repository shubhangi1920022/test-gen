import express from "express";
const router = express.Router();
import { download, fetchpdf } from "../controller/pdf_controller.js"


router.post('/download', download);
router.get('/fetch-pdf', fetchpdf)
export default router;