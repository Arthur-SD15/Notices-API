let requisicaoURL = 'https://www.luizpicolo.com.br/api.json';
let requisicao = new XMLHttpRequest();
requisicao.open('get', requisicaoURL);
requisicao.responseType = 'json';
requisicao.send();

requisicao.onload = function() {
  class Noticia {
    constructor(author, publishedAt, title, url, description) {
      this.author = author;
      this.publishedAt = publishedAt;
      this.title = title;
      this.url = url;
      this.description = description;
    }
  
    mostrar_noticia() {
      return `<div class="noticia">
                <div class="flex">
                  <p class="author">${this.author}</p>
                  <p class="data">Publicado em: ${this.publishedAt}</p>
                </div>
                <a href="${this.url}"><h2 class="titulo">${this.title}</h2></a>
                <p class="data">${this.description}</p>
              </div>`
    }
  }

  class Destaque extends Noticia { 
    constructor(urlToImage, author, publishedAt, title, url, description){
      super(author, publishedAt, title, url, description)
        this.urlToImage = urlToImage;
    }
    
    mostarDestaque(){
      return `<div class="noticia">
                <div class="bloc">
                  <img src="${this.urlToImage}">
                  <div class="flex">
                    <p class="author">${this.author}</p>
                    <p class="data">Publicado em: ${this.publishedAt}</p>
                  </div>
                  <a href="${this.url}"><h2>${this.title}</h2></a>
                  <p class="data">${this.description}</p>
                </div>
              </div>`
    }
  }

  let noticias = requisicao.response;
  const elemento = document.getElementById('lista');

  let titulo = `<h1 class="centralizado">Noticias</h1>`;
  elemento.insertAdjacentHTML('beforebegin', titulo);

  noticias.articles.forEach(noticia => {
    let nots = new Noticia(noticia.author, noticia.publishedAt, noticia.title, noticia.url, noticia.description)
    elemento.insertAdjacentHTML('beforeend', nots.mostrar_noticia());
  });

  let noticiaDestaque = new Destaque(noticias.articles[0].urlToImage, noticias.articles[0].author, noticias.articles[0].publishedAt, noticias.articles[0].title, noticias.articles[0].url, noticias.articles[0].description)
  elemento.insertAdjacentHTML('beforebegin', noticiaDestaque.mostarDestaque());
}