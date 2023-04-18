import chalk from "chalk";
import fs from 'fs';
import getArchive from "./index.js";

const path = process.argv;

function printList(result)
{
    console.log(chalk.yellow('Lista de links'), result);
}

async function processText(argumentos) {
    const path = argumentos[2];

    if (fs.lstatSync(path).isFile()){
        const result = await getArchive(path);
        printList(result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const arquivos = await fs.promises.readdir(path);
        arquivos.forEach(async (nomeDeArquivo) => {
            const list = await getArchive(`${path}/${nomeDeArquivo}`);
            printList(list);
        })
        console.log(arquivos);
    }
}

processText(path);