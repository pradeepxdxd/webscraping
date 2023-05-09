import axios from "axios";
import cheerio from "cheerio";
import puppeteer from "puppeteer";

export const useCheerio = async (req, res) => {
  try {
    const response = await axios.get(
      "https://webscraper.io/test-sites/e-commerce/allinone"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const result = [];

    $("div.thumbnail").each((index, ele) => {
      const image = $(ele).find(".img-responsive").attr("src");
      const title = $(ele).find(".title").text();
      const desc = $(ele).find(".description").text();
      const reviews = $(ele).find("p.pull-right").text();
      const price = $(ele).find(".price").text();

      result.push({
        title,
        reviews,
        price,
        desc,
        image,
      });
    });

    res.send(result);
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
    });
  }
};

export const usePuppeteer = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });

    const page = await browser.newPage();
    await page.goto(
      "https://www.amazon.in/s?k=books&crid=5ADSXDF1XKII&sprefix=boo%2Caps%2C373&ref=nb_sb_noss_2"
    );
    // let's just call them productHandle
    // const productHandles = await page.$$(
    //   "div.puis.puis-v8k5arjo44v2a24wdqi50we14f.s-latency-cf-section"
    // );
    const productHandles = await page.$$(
      "div.sg-col-inner"
    );

    console.log(productHandles);
    const items = [];
    // loop thru all handles
    for (const producthandle of productHandles) {
      try {
        const title = await page.evaluate(
          (el) => el.querySelector("h2 > a > span").textContent,
          producthandle
        );
        const price = await page.evaluate(
          (el) => el.querySelector(".a-price > .a-offscreen").textContent,
          producthandle
        );
        const image = await page.evaluate(
          (el) => el.querySelector("img.s-image").getAttribute("src"),
          producthandle
        );
        const rating = await page.evaluate(
          (el) => el.querySelector("span.a-icon-alt").textContent,
          producthandle
        );
        const realPrice = await page.evaluate(
          (el) => el.querySelector(".a-text-price > .a-offscreen").textContent,
          producthandle
        );
        const deliveryDay = await page.evaluate(
          (el) => el.querySelector("span.a-color-base.a-text-bold").textContent,
          producthandle
        );

        items.push({
          title,
          image,
          price,
          realPrice,
          rating,
          deliveryDay,
        });
      } catch (err) {}
    }
    res.send(items);
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
    });
  }
};

export const useAmazon = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.amazon.in/s?k=game&crid=2BSLWONKV4ITS&sprefix=game%2Caps%2C360&ref=nb_sb_noss_1"
    );

    const $ = cheerio.load(response.data);

    const result = [];

    $("div.a-section.a-spacing-base").each((index, ele) => {
      const image = $(ele).find("img.s-image").attr("src");
      const title = $(ele)
        .find("span.a-size-base-plus.a-color-base.a-text-normal")
        .text();
      const price = $(ele).find("span.a-price-whole").text();
      const realPrice = $(ele).find("span.a-offscreen").text();
      const review = $(ele).find("span.a-icon-alt").text();

      result.push({
        title,
        image,
        price,
        realPrice,
        review,
      });
    });

    res.send(result);
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
    });
  }
};

export const useScrapIphone = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.amazon.in/s?k=iphone&crid=2VBRLS8PJ4SJU&sprefix=ipho%2Caps%2C454&ref=nb_sb_noss_2"
    );
    const $ = cheerio.load(response.data);

    const result = [];

    $("div.puis-v3hsi2aa679q922264tuy443l4m").each((index, ele) => {
      const image = $(ele).find("img.s-image").attr("src");
      const title = $(ele)
        .find("h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2")
        .text();
      const rating = $(ele).find("span.a-icon-alt").text();
      const price = $(ele).find("span.a-price-whole").text();
      const deliveryDay = $(ele).find("span.a-text-bold").text();
      const realPrice = $(ele).find("span.a-offscreen").text();

      result.push({
        title,
        price,
        image,
        rating,
        deliveryDay,
        realPrice,
      });
    });

    res.send(result);
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
    });
  }
};
