import { Router } from "express";
import { useCheerio, usePuppeteer, useAmazon, useScrapIphone } from "../controllers/main.controller.js";

const router = Router();

router.get('/cheerio', useCheerio);
router.get('/puppeteer', usePuppeteer);

// practice
router.get('/amazon', useAmazon);
router.get('/amazon/iphone', useScrapIphone)

export default router;
