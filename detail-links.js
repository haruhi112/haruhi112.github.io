(() => {
const projects=['personality','uk-education','mindfulness'];
const publications=['uk-education','short-video','visual-analysis'];
function link(article,slug){
const anchor=document.createElement('a');
anchor.className='detail-link';anchor.href=`${slug}.html`;anchor.textContent='详细了解这项研究 ↗';
const destination=article.querySelector('.flow-meta')?.parentElement||article;
destination.append(anchor);
}
document.querySelectorAll('.flow-project').forEach((article,index)=>link(article,projects[index]));
document.querySelectorAll('.flow-publications .flow-paper').forEach((article,index)=>{
link(article,publications[index]);
const heading=article.querySelector('h3');
heading.innerHTML=`<a href="${publications[index]}.html">${heading.textContent.replace(' ↗','')}</a>`;
});
})();
