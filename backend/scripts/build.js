const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");

function copiarDiretorio(origem, destino) {
  fs.mkdirSync(destino, { recursive: true });

  const itens = fs.readdirSync(origem, {
    withFileTypes: true
  });

  for (const item of itens) {
    const origemItem = path.join(origem, item.name);
    const destinoItem = path.join(destino, item.name);

    if (item.isDirectory()) {
      copiarDiretorio(origemItem, destinoItem);
    } else {
      fs.copyFileSync(origemItem, destinoItem);
    }
  }
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, {
    recursive: true,
    force: true
  });
}

fs.mkdirSync(distDir, {
  recursive: true
});

copiarDiretorio(
  srcDir,
  path.join(distDir, "src")
);

fs.copyFileSync(
  path.join(rootDir, "package.json"),
  path.join(distDir, "package.json")
);

fs.copyFileSync(
  path.join(rootDir, "package-lock.json"),
  path.join(distDir, "package-lock.json")
);

const packageJson = require("../package.json");

const buildInfo = {
  name: packageJson.name,
  version: packageJson.version,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(distDir, "build-info.json"),
  JSON.stringify(buildInfo, null, 2)
);

console.log(
  `Build DevStore v${packageJson.version} gerado com sucesso.`
);

console.log(
  `Artefato criado em: ${distDir}`
);