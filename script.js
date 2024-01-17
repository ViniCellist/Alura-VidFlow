const containerVideos = document.querySelector('.videos-container');


async function searchAndShow(){
    try {
        const search = await fetch("http://localhost:3000/videos")
        const videos = await search.json()

            videos.forEach((video) => {
                if(video.categoria == "") {
                    throw new Error('Vídeo não tem categoria')
                }
                containerVideos.innerHTML += `
                <li class="videos-item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                    </div>
                </li>
                `;
            })
    } catch(error){
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

searchAndShow()