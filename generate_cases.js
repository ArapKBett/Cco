const fs = require('fs');
const path = require('path');

const NUM_CASES = 50;
const ITEMS_PER_CASE = [3, 3]; // Fixed to 3 items per case
const HOUSE_EDGE = 0.15; // 15% house edge (adjustable 10-25%)
const OUTPUT_DIR = path.join(__dirname, 'src', 'cases'); // Changed to src/cases
const IMAGE_DIR = path.join(__dirname, 'src', 'images'); // Changed to src/images

const itemCategories = {
  watches: { items: ['Patek Philippe Nautilus', 'Rolex Submariner', 'Omega Seamaster', 'Tag Heuer Carrera', 'Tissot PRX Powermatic', 'Hamilton Khaki Field', 'Citizen Eco-Drive Promaster', 'Seiko 5 Sports', 'Fossil Gen 6', 'Timex Weekender', 'Casio G-Shock'], range: [5, 35000] },
  supercars: { items: ['Ferrari 488 Pista', 'Lamborghini Huracan', 'Porsche 911 Turbo S', 'McLaren 570S', 'Audi R8 V10 Plus', 'BMW M8 Competition', 'Mercedes-AMG GT', 'Chevrolet Corvette Z06', 'Ford Mustang Shelby GT500'], range: [50, 350000] },
  vr_headsets: { items: ['Valve Index', 'Meta Quest 3 Pro', 'HTC Vive Pro 2', 'Pimax 8KX', 'Meta Quest 2', 'PlayStation VR2', 'Oculus Rift S', 'Samsung Odyssey+'], range: [20, 1000] },
  designer_bags: { items: ['Hermès Himalaya Birkin', 'Louis Vuitton Speedy', 'Chanel Classic Flap', 'Gucci Dionysus', 'Prada Re-Edition 2005', 'Fendi Baguette', 'Michael Kors Jet Set', 'Kate Spade Outlet', 'Coach Crossbody'], range: [10, 300000] },
  tech_gadgets: { items: ['Apple Vision Pro', 'Sony PlayStation 5 Pro', 'Microsoft Surface Pro 9', 'Samsung Galaxy Z Fold 5', 'Apple iPad Pro', 'Google Pixel 8 Pro', 'JBL Boombox 3', 'Anker PowerCore 20K', 'Bose QuietComfort Earbuds'], range: [5, 3500] },
  jewelry: { items: ['Cartier Love Bracelet', 'Tiffany & Co. Necklace', 'Van Cleef & Arpels Ring', 'Bulgari Serpenti Watch', 'David Yurman Cable Bracelet'], range: [100, 50000] },
  sneakers: { items: ['Nike Air Force 1', 'Adidas Yeezy Boost 350', 'Jordan 1 Retro', 'New Balance 990', 'Puma Suede Classic'], range: [50, 1000] },
  wine: { items: ['Château Lafite Rothschild', 'Dom Pérignon Vintage', 'Penfolds Grange', 'Screaming Eagle Cabernet'], range: [50, 5000] }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCase(theme, category) {
  const numItems = getRandomInt(ITEMS_PER_CASE[0], ITEMS_PER_CASE[1]); // Fixed to 3
  const items = [];
  const availableItems = [...category.items];
  let totalProbability = 0;

  for (let i = 0; i < numItems; i++) {
    if (availableItems.length === 0) {
      console.warn(`Warning: Ran out of items for ${theme} case. Reusing last item.`);
      availableItems.push(category.items[category.items.length - 1]);
    }
    const itemIndex = getRandomInt(0, availableItems.length - 1);
    const itemName = availableItems.splice(itemIndex, 1)[0];
    if (!itemName) continue;
    const price = getRandomPrice(category.range[0], category.range[1]);
    let probability;

    if (i === 0) probability = getRandomInt(0.1, 1); // Rare
    else if (i === 1) probability = getRandomInt(10, 30); // Uncommon
    else probability = getRandomInt(69, 89.9); // Common (adjusted to sum to ~100%)

    items.push({ item_name: itemName, price, probability });
    totalProbability += probability;
  }

  // Normalize probabilities to sum to 100%
  items.forEach(item => {
    item.probability = (item.probability / totalProbability) * 100;
  });

  // Sort by price high to low
  items.sort((a, b) => b.price - a.price);

  // Calculate Expected Value (EV)
  const ev = items.reduce((sum, item) => sum + (item.price * item.probability / 100), 0);

  // Set case price with house edge
  const casePrice = Math.round(ev / (1 - HOUSE_EDGE));
  return {
    case_name: `${theme.charAt(0).toUpperCase() + theme.slice(1)} Crate`,
    case_price: casePrice > 1000 ? 1000 : casePrice,
    items
  };
}

function generateAllCases() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

  const themes = Object.keys(itemCategories);
  for (let i = 0; i < NUM_CASES; i++) {
    const themeIndex = i % themes.length;
    const theme = themes[themeIndex];
    const category = itemCategories[theme];
    const caseData = generateCase(theme, category);
    const fileName = `${theme.toLowerCase().replace(/ /g, '_')}_${i}.json`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    fs.writeFileSync(filePath, JSON.stringify(caseData, null, 2));
    console.log(`Generated: ${fileName}`);

    caseData.items.forEach(item => {
      if (item.item_name) {
        const imageName = `${item.item_name.toLowerCase().replace(/ /g, '_')}.png`;
      }
    });
  }

  console.log(`Generated ${NUM_CASES} cases in ${OUTPUT_DIR}`);
}

generateAllCases();
