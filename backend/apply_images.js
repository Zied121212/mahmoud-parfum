const fs = require('fs');
const Product = require('./models/Product');
const sequelize = require('./config/database');
const path = require('path');

const imgDir = 'd:/mahm/frontend/public/products';

async function updateImages() {
  await sequelize.authenticate();
  const products = await Product.findAll();
  
  const files = fs.readdirSync(imgDir);
  
  let updated = 0;
  for (let p of products) {
    // Manually matching since some names are special
    let match = null;
    if (p.name === 'Bleu de Chanel') match = 'bleu_de_chanel';
    else if (p.name === 'Sauvage') match = 'sauvage';
    else if (p.name === 'Gucci Bloom') match = 'gucci_bloom';
    else if (p.name === 'Prada L\'Homme') match = 'prada_lhomme';
    else if (p.name === 'Oud Wood') match = 'oud_wood';
    else if (p.name === 'Bois de Nuit') match = 'bois_de_nuit';
    else if (p.name === 'Thé Noir & Épices') match = 'the_noir_epices';
    else if (p.name === 'Musc Boréal') match = 'musc_boreal';
    else if (p.name === 'Cuir Sombre') match = 'cuir_sombre';
    else if (p.name === 'Vanille Exquise') match = 'vanille_exquise';
    else if (p.name === 'Néroli Soleil') match = 'neroli_soleil';
    else if (p.name === 'Élixir d\'Or') match = 'elixir_dor';
    else if (p.name === 'Ambre Impérial') match = 'ambre_imperial';
    else if (p.name === 'Vétiver Pamplemousse') match = 'vetiver_pamplemousse';
    else if (p.name === 'Aventus') match = 'aventus';
    else if (p.name === 'Bergamote Intense') match = 'bergamote_intense';
    else if (p.name === 'Fleur de Jasmin') match = 'fleur_de_jasmin';
    
    let assignedPath = null;
    if (match) {
        const found = files.find(f => f.startsWith(match) && f.endsWith('.png'));
        if (found) {
            assignedPath = `/products/${found}`;
        }
    }
    
    if (!assignedPath) {
        // Fallback for quota limited items
        const n = p.name.toLowerCase();
        if (n.includes('chanel') || n.includes('sauvage') || n.includes('hermès') || n.includes('million') || n.includes('vetiver') || n.includes('homme') || n.includes('eros') || n.includes('bleu')) {
          assignedPath = '/luxe/luxe_blue.png';
        } 
        else if (n.includes('bloom') || n.includes('belle') || n.includes('si') || n.includes('rose') || n.includes('fleur') || n.includes('omnia') || n.includes('poudré') || n.includes('opium') || n.includes('jasmin')) {
          assignedPath = '/luxe/luxe_floral.png';
        }
        else if (n.includes('oud') || n.includes('aventus') || n.includes('or') || n.includes('ambre') || n.includes('vanille') || n.includes('santal') || n.includes('épice') || n.includes('soleil')) {
          assignedPath = '/luxe/luxe_gold.png';
        }
        else {
          assignedPath = '/luxe/luxe_black.png';
        }
    }
    
    if (p.imageUrl !== assignedPath) {
        p.imageUrl = assignedPath;
        await p.save();
        updated++;
        console.log(`Updated ${p.name} -> ${assignedPath}`);
    }
  }
  console.log(`Finished updating ${updated} products.`);
  process.exit();
}

updateImages();
