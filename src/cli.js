import chalk from "chalk";
import fs from 'fs';
import getArchive from "./index.js";
import listaValidada from "./http-validacao.js";

const path = process.argv;

async function printList(valida, result, identificador = '')
{

    if(valida){
        console.log(
            chalk.yellow('Lista Validada'), 
            chalk.black.bgGreen(identificador),
            await listaValidada(result));
    } else
    {
        console.log(
            chalk.yellow('Lista de links'), 
            chalk.black.bgGreen(identificador),
            result);
    }
}

async function processText(argumentos) {
    const path = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        fs.lstatSync(path);
    } catch (error) {
        if(error.code === 'ENOENT'){
            return console.log(chalk.bgRed('arquivo ou diretório não existente'));
        }
    }

    if (fs.lstatSync(path).isFile()){
        const result = await getArchive(path);
        printList(valida, result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const arquivos = await fs.promises.readdir(path);
        arquivos.forEach(async (nomeDeArquivo) => {
            const list = await getArchive(`${path}/${nomeDeArquivo}`);
            printList(valida, list, nomeDeArquivo);
        })
        console.log(arquivos);
    }
}

processText(path);