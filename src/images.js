// Coloque suas imagens em src/assets e importe aqui. Ex.:
// import apples from './assets/macas-secas.png'
// Depois troque o null pelo import: "maçãs secas": apples
// Enquanto estiver null, aparece um espaço tracejado no lugar.
// Wikimedia Commons (verificado nas categorias). Confira a licença/atribuição de cada arquivo antes de publicar.
import appleLibrary from './assets/apple-library.png'
const W = (f, w) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=${w}`
export const images = {
  'ma\u00e7\u00e3s secas': appleLibrary,            // hero: maçãs desidratadas (aprox. 280x240, PNG transparente)
  'Maçãs': W('Dehydrated Apple pieces.jpg',120),                 // miniatura histórico (48x48)
  'Alecrim': W('Rosemary leaves.jpg',120),                // miniatura histórico (48x48)
  'Cenouras': W('Carrot slice.JPG',120),               // miniatura histórico (48x48)
  'Chá': W('Loose chamomile tea.jpg',120),                    // miniatura histórico (48x48)
  'alimento-1': W('Dehydrated Apple pieces.jpg',200),             // alimentos salvos: maçã (100x100)
  'alimento-2': W('Rosemary leaves.jpg',200),             // alecrim
  'alimento-3': W('Carrot slice.JPG',200),             // cenoura
  'alimento-4': W('Loose chamomile tea.jpg',200),             // chá
  'alimento-5': W('Dried strawberry.jpg',200),             // frutas
  'alimento-6': W('Apples fruit.jpg',200),
  'alimento-7': W('Dried mint leaves tea.jpg',200),
  'alimento-8': W('Dried fruit tea.jpg',200),
  'equipamento Drytech': null,    // seção equipamento (aprox. 520x520, PNG transparente)
  'equipamento': null,            // dentro do celular, CTA final
}
