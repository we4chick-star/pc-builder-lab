import type { CatalogPart, MotherboardPart } from "@/lib/types";
import { IMG } from "./constants";

function mb(
  id: string,
  name: string,
  brand: string,
  socket: MotherboardPart["socket"],
  price: number,
  tier: MotherboardPart["tier"],
  form: string = "ATX"
): MotherboardPart {
  return {
    id,
    name,
    category: "motherboard",
    brand,
    tier,
    retailerQuery: name,
    priceUsd: price,
    image: IMG,
    specsSummary: `Socket ${socket} · ${form}`,
    socket,
  };
}

export function buildMotherboardCatalog(): CatalogPart[] {
  return [
    // Budget H610 / B660 Intel
    mb("mb-asus-prime-h610m", "ASUS Prime H610M-K", "ASUS", "LGA1700", 79, "Mid-Range", "mATX"),
    mb("mb-msi-h610m-pro", "MSI PRO H610M-G", "MSI", "LGA1700", 75, "Mid-Range", "mATX"),
    mb("mb-gb-h610m-s2h", "Gigabyte H610M S2H", "Gigabyte", "LGA1700", 72, "Mid-Range", "mATX"),
    mb("mb-asus-prime-b660m", "ASUS Prime B660M-A WIFI", "ASUS", "LGA1700", 129, "Mid-Range", "mATX"),
    mb("mb-msi-pro-b660m", "MSI PRO B660M-A WIFI", "MSI", "LGA1700", 119, "Mid-Range", "mATX"),
    mb("mb-gb-b660m-ds3h", "Gigabyte B660M DS3H AX", "Gigabyte", "LGA1700", 109, "Mid-Range", "mATX"),

    // Budget A520 / B450 AMD
    mb("mb-asus-prime-a520m", "ASUS Prime A520M-K", "ASUS", "AM4", 69, "Mid-Range", "mATX"),
    mb("mb-msi-a520m-pro", "MSI A520M PRO", "MSI", "AM4", 65, "Mid-Range", "mATX"),
    mb("mb-gb-a520m-ds3h", "Gigabyte A520M DS3H", "Gigabyte", "AM4", 67, "Mid-Range", "mATX"),
    mb("mb-asus-prime-b450m", "ASUS Prime B450M-A II", "ASUS", "AM4", 89, "Mid-Range", "mATX"),
    mb("mb-msi-b450m-mortar", "MSI MAG B450M Mortar Max", "MSI", "AM4", 99, "Mid-Range", "mATX"),
    mb("mb-gb-b450m-ds3h", "Gigabyte B450M DS3H V2", "Gigabyte", "AM4", 85, "Mid-Range", "mATX"),

    // High-end Z790 / B760 Intel
    mb("mb-asus-z790-hero", "ASUS ROG Maximus Z790 Hero", "ASUS", "LGA1700", 629, "Extreme"),
    mb("mb-asus-z790-formula", "ASUS ROG Maximus Z790 Formula", "ASUS", "LGA1700", 749, "Extreme"),
    mb("mb-asus-strix-z790-e", "ASUS ROG Strix Z790-E Gaming WIFI", "ASUS", "LGA1700", 449, "Extreme"),
    mb("mb-asus-strix-z790-f", "ASUS ROG Strix Z790-F Gaming WIFI", "ASUS", "LGA1700", 399, "High-End"),
    mb("mb-asus-strix-z790-a", "ASUS ROG Strix Z790-A Gaming WIFI", "ASUS", "LGA1700", 349, "High-End"),
    mb("mb-asus-tuf-z790-plus", "ASUS TUF Gaming Z790-Plus WIFI", "ASUS", "LGA1700", 249, "High-End"),
    mb("mb-asus-strix-b760-g", "ASUS ROG Strix B760-G Gaming WIFI", "ASUS", "LGA1700", 199, "Mid-Range", "mATX"),
    mb("mb-asus-strix-b760-a", "ASUS ROG Strix B760-A Gaming WIFI", "ASUS", "LGA1700", 219, "Mid-Range"),
    mb("mb-asus-prime-z790-p", "ASUS Prime Z790-P WIFI", "ASUS", "LGA1700", 189, "Mid-Range"),
    mb("mb-msi-meg-z790-ace", "MSI MEG Z790 ACE", "MSI", "LGA1700", 599, "Extreme"),
    mb("mb-msi-mpg-z790-carbon", "MSI MPG Z790 Carbon WIFI", "MSI", "LGA1700", 369, "High-End"),
    mb("mb-msi-mag-z790-tomahawk", "MSI MAG Z790 Tomahawk WIFI", "MSI", "LGA1700", 259, "High-End"),
    mb("mb-msi-mpg-b760-edge", "MSI MPG B760 Edge WIFI", "MSI", "LGA1700", 209, "Mid-Range"),
    mb("mb-msi-meg-x670e-ace", "MSI MEG X670E ACE", "MSI", "AM5", 699, "Extreme"),
    mb("mb-msi-mpg-x670e-carbon", "MSI MPG X670E Carbon WIFI", "MSI", "AM5", 349, "High-End"),
    mb("mb-msi-mag-b650-tomahawk", "MSI MAG B650 Tomahawk WIFI", "MSI", "AM5", 219, "High-End"),
    mb("mb-msi-mpg-b650-edge", "MSI MPG B650 Edge WIFI", "MSI", "AM5", 259, "High-End"),
    mb("mb-gb-z790-aorus-xtreme", "Gigabyte Z790 Aorus Xtreme", "Gigabyte", "LGA1700", 799, "Extreme"),
    mb("mb-gb-z790-aorus-master", "Gigabyte Z790 Aorus Master", "Gigabyte", "LGA1700", 399, "Extreme"),
    mb("mb-gb-z790-aorus-elite", "Gigabyte Z790 Aorus Elite AX", "Gigabyte", "LGA1700", 279, "High-End"),
    mb("mb-gb-b760-aorus-elite", "Gigabyte B760 Aorus Elite AX", "Gigabyte", "LGA1700", 179, "Mid-Range"),
    mb("mb-gb-x670e-aorus-master", "Gigabyte X670E Aorus Master", "Gigabyte", "AM5", 459, "Extreme"),
    mb("mb-gb-x670e-aorus-pro", "Gigabyte X670E Aorus Pro X", "Gigabyte", "AM5", 329, "High-End"),
    mb("mb-gb-b650e-aorus-master", "Gigabyte B650E Aorus Master", "Gigabyte", "AM5", 349, "High-End"),
    mb("mb-gb-b650-aorus-elite", "Gigabyte B650 Aorus Elite AX", "Gigabyte", "AM5", 189, "Mid-Range"),
    mb("mb-asus-b650e-strix", "ASUS ROG Strix B650E-E", "ASUS", "AM5", 289, "High-End"),
    mb("mb-asus-b650-tuf", "ASUS TUF Gaming B650-Plus WIFI", "ASUS", "AM5", 199, "Mid-Range"),
  ];
}
