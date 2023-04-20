import chalk from "chalk";

function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checkStatus(arrURLs){
    const arrStatus = await Promise
    .all(
        arrURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return `${response.status} - ${response.statusText}`;
            } catch (error) {
                return manejaErros(error);
            }
        })
    );
    return arrStatus;
}

function manejaErros (error) {
    if(error.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    }
    else {
        return 'Ocorreu um erro';
    }
}

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checkStatus(links);

    return listaDeLinks.map((object, indice) => ({
        ...object,
        status: status[indice]
    }));
}