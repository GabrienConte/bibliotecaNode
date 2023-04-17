import fs from 'fs';
import chalk from "chalk";

function trataErro(error){
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório'));
}

function extrailinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captures = [...text.matchAll(regex)];
    const results = captures.map(capture => ({[capture[1]]: capture[2]}));
   return results;
}

async function getArchive(pathfile) {
    const enconding = 'utf-8';
    try {
        const text = await fs.promises.readFile
        (pathfile, enconding);
        console.log(extrailinks(text));
    } catch (error) {
        trataErro(error);
    } finally {
        console.log(chalk.grey('Operação Concluída'));
    }

}
getArchive('./arquivos/texto.md');