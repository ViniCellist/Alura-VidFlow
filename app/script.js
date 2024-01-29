const containerVideos = document.querySelector('.videos-container');


async function searchAndShow(){
    try {
        const search = await fetch("http://localhost:3000/videos");
        const videos = await search.json();

        videos.forEach((video) => {
            if(video.categoria == "") {
                throw new Error('Vídeo não tem categoria');
            };
            containerVideos.innerHTML += `
                <li class="videos-item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `
        });
    } catch(error){
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
    };
};

searchAndShow();

const searchBar = document.querySelector('.search-input');

searchBar.addEventListener('input', filterSearch);

function filterSearch() {
    const videos = document.querySelectorAll('.videos-item');
    const filterValue = searchBar.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        video.style.display = filterValue ? titulo.includes(filterValue) ? 'block' : 'none' : 'block';
    });
};

const btnCategory = document.querySelectorAll('.section-item');

btnCategory.forEach((botao) => {
    let nameCategory = botao.getAttribute("name");
    botao.addEventListener("click", () => filterCategory(nameCategory));
});

function filterCategory(filtro) {
    const videos = document.querySelectorAll('.videos-item');
    for(let video of videos){
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let filterValue = filtro.toLowerCase();

        if(!categoria.includes(filterValue) && filterValue !='tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        };
    };
};