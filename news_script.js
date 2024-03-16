const API_KEY="28d343fc988e42659b5b89ae52af3819";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.getElementById("card-container");
    const newCardTemplate=document.getElementById("template-news-card");


    cardContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardClone=newCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;


    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/jakarta"
    });

    newsSource.innerHTML=`${article.source.name}.${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
  
}
let selectednav=null;
function onnavitemclick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    selectednav?.classList.remove('active');
    selectednav=navitem;
    selectednav.classList.add('active');
}
const searchButton=document.getElementById('search-btn');
const searText=document.getElementById('search-txt');

searchButton.addEventListener("click",()=>{
    const query=searText.value;
    if(!query) return;
    fetchNews(query);
    selectednav?.classList.remove('active');
    selectednav=null;
});
