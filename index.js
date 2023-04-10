import fs from 'fs';
import chalk from "chalk";

function trataErro(error){
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório'));
}

async function getArchive(pathfile) {
    const enconding = 'utf-8';
    try {
        const text = await fs.promises.readFile
        (pathfile, enconding);
        console.log(chalk.greenBright(text));
    } catch (error) {
        trataErro(error);
    } finally {
        console.log(chalk.grey('Operação Concluída'));
    }

}

// function getArchive(pathfile) {
//     const enconding = 'utf-8';
//     fs.promises
//       .readFile(pathfile, enconding)
//       .then((text) => console.log(chalk.greenBright(text)))
//       .catch(trataErro);
// }

getArchive('./arquivos/texto.md');