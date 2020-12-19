const api = {
  key: '248d06a550fa4bad91ee3602e006e6d3',
  base_url: 'http://newsapi.org/v2/'
}
const proxyurl = "https://cors-anywhere.herokuapp.com/";

const keyword = document.querySelector('.keyword');
const endpoint = document.querySelector('.endpoint');
const newsForm = document.querySelector('.news-form');
const result = document.querySelector('.result');

newsForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  clearDisplay();
  getResult();
}

function getResult() {
  fetch (proxyurl+`${api.base_url}${endpoint.value}?language=en&q=${keyword.value}&apiKey=${api.key}`)
  .then(news=> {
    console.log(news.status);
    console.log(`${api.base_url}${endpoint.value}?language=en&q=${keyword.value}&apiKey=${api.key}`);
    return news.json();
  })
  .then(displayResults);
}


function displayResults(news) {
  let articles = news.articles;
  console.log(articles);
  if(articles.length === 0) {alert('No articles found'); return;}
  articles.forEach(article => {
    createNewsCard(article);
  });
}

function clearDisplay() {
  while(result.children.length--){
    result.removeChild(result.childNodes[0]);
  }
}

function createNewsCard(article) {
  const div = document.createElement('div');
  div.classList.add('result-div');

  const h2 = document.createElement('h2');
  h2.textContent = article.title;
  h2.classList.add('result-h2');
  div.appendChild(h2);

  const h3 = document.createElement('h3');
  h3.textContent = `Written by - ${article.author}`;
  h3.classList.add('result-h3');
  div.appendChild(h3);

  const h32 = document.createElement('h3');
  h32.textContent = `Source - ${article.source.name}`;
  h32.classList.add('result-h32');
  div.appendChild(h32);

  const p1 = document.createElement('p');
  p1.textContent = article.description;
  p1.classList.add('result-p1');
  div.appendChild(p1);

  const a = document.createElement('a');
  a.textContent = 'read more';
  a.setAttribute('href',`${article.url}`);
  a.setAttribute('target',`_blank`)
  p1.appendChild(a);

  result.appendChild(div);
}