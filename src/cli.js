import chalk from "chalk";
import fs from 'fs';
import getArchive from "./index.js";

const path = process.argv;

function printList(result, identificador = '')
{
    console.log(
        chalk.yellow('Lista de links'), 
        chalk.black.bgGreen(identificador),
        result);
}

async function processText(argumentos) {
    const path = argumentos[2];

    try {
        await fs.lstatSync(path);
    } catch (error) {
        if(error.code === 'ENOENT'){
            return console.log(chalk.bgRed('arquivo ou diretório não existente'));
        }
    }
    if (fs.lstatSync(path).isFile()){
        const result = await getArchive(path);
        printList(result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const arquivos = await fs.promises.readdir(path);
        arquivos.forEach(async (nomeDeArquivo) => {
            const list = await getArchive(`${path}/${nomeDeArquivo}`);
            printList(list, nomeDeArquivo);
        })
        console.log(arquivos);
    }
}

processText(path);