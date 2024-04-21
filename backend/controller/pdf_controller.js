import pdf from "html-pdf";
import pdfTemplate from "../helper/pdfTemplate.js";

export const download = async (req, res) => {

  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
}

export const fetchpdf = async (req, res) => {
  res.sendFile(`${process.cwd()}/result.pdf`)
}