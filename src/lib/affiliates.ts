import type { RegionCode, RetailerLink } from "./types";

/**
 * Exactly three retailer links per region (UA / KZ / RU / EN).
 */
export function getRegionalRetailerLinks(
  region: RegionCode,
  query: string
): RetailerLink[] {
  const q = query.trim();
  const enc = encodeURIComponent(q);

  switch (region) {
    case "UA":
      return [
        { label: "Rozetka", href: `https://rozetka.com.ua/search/?text=${enc}` },
        { label: "Telemart", href: `https://telemart.ua/search/?q=${enc}` },
        { label: "Brain", href: `https://brain.com.ua/search/?search=${enc}` },
      ];
    case "KZ":
      return [
        { label: "Kaspi", href: `https://kaspi.kz/shop/search/?q=${enc}` },
        { label: "Shop.kz", href: `https://shop.kz/search/?search_q=${enc}` },
        { label: "Alser", href: `https://www.alser.kz/search/?search_q=${enc}` },
      ];
    case "RU":
      return [
        { label: "DNS", href: `https://www.dns-shop.ru/search/?q=${enc}` },
        { label: "Citilink", href: `https://www.citilink.ru/search/?text=${enc}` },
        { label: "Yandex Market", href: `https://market.yandex.ru/search?text=${enc}` },
      ];
    case "EN":
      return [
        { label: "Amazon", href: `https://www.amazon.com/s?k=${enc}` },
        { label: "Newegg", href: `https://www.newegg.com/p/pl?d=${enc}` },
        { label: "Best Buy", href: `https://www.bestbuy.com/site/searchpage.jsp?st=${enc}` },
      ];
  }
}
