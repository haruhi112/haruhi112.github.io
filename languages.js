(() => {
const dictionary={
'详细了解这项研究 ↗':'Explore this research ↗',
'研究':'Research','继续探索 ↗':'Explore ↗',
'理解人。':'Understanding people.','也理解人与数字世界的关系。':'And their digital worlds.',
'从教育心理学到人格测评，':'From educational psychology to personality assessment,',
'探索技术如何参与我们的学习、感受与自我理解。':'exploring technology, learning, wellbeing and self-understanding.',
'如果测评不只是回答问题，':'What if assessment went beyond answering questions,',
'而是走进一个故事呢？':'and invited us into a story?',
'SELECTED RESEARCH / 研究项目':'SELECTED RESEARCH',
'关心的问题，':'Meaningful questions.','一步一步探索。':'Careful exploration.',
'01 / 进行中':'01 / ONGOING','AI与故事化人格测评':'AI and story-based personality assessment',
'中国科学院心理研究所 ·':'Institute of Psychology, Chinese Academy of Sciences ·',
'周明洁 ↗':'Mingjie Zhou ↗','课题组 · 研究支持':'’s group · Research support',
'参与将大六人格模型的测试题转化为连贯、完整的故事，故事编写、故事审查和测评条目编写均通过AI完成。当前工作聚焦测评内容开发，项目正在进行中。':'Supporting a story-based adaptation of Big Six personality test questions. Story writing, story review and assessment-item writing are all carried out using AI. This ongoing project focuses on assessment content development.',
'02 / 2026':'02 / 2026','英国教育差异中的心理因素':'Psychological factors in educational disparities in the UK',
'教育公平 · 定量研究 · 可解释机器学习':'Educational equity · Quantitative research · Interpretable machine learning',
'结合GCSE统计资料、LSYPE2纵向数据与英国PISA 2022样本，探索社会经济状况、教育抱负、学校归属感等因素与学业表现的关系，使用加权随机森林与SHAP进行分析。':'Drawing on GCSE statistics, LSYPE2 longitudinal data and the UK PISA 2022 sample to explore socioeconomic and psychological correlates of attainment, including educational aspirations and school belonging, using weighted random forests and SHAP.',
'七天在线正念干预的可行性':'Feasibility of a seven-day online mindfulness intervention',
'谢菲尔德大学 · 硕士论文':'University of Sheffield · MSc dissertation','导师：':'Supervisor: ',
'通过Gorilla设计并实施在线随机对照可行性研究，比较引导式正念练习与轻音乐主动对照。分析重点为招募、知情同意与研究推进流程；由于随访结果数据不完整，不据此判断干预有效性。':'Designed and implemented an online randomised controlled feasibility study in Gorilla, comparing guided mindfulness with a light-music active control. Analysis focused on recruitment, consent and study progression. Incomplete follow-up data prevented conclusions about intervention effectiveness.',
'ON THE PAGE / 论文':'ON THE PAGE','让思考，':'Ideas,','落于文字。':'on the page.',
'2026 · 已录用':'2026 · ACCEPTED','2024 · 已发表':'2024 · PUBLISHED','2023 · 已发表':'2023 · PUBLISHED',
'英国族裔教育分层的心理驱动因素与数字干预策略':'Psychological drivers of ethnic educational stratification in the UK and digital intervention strategies',
'教育心理学视角下儿童过度沉迷短视频与直播的探讨 ↗':'An Exploration of Children’s Excessive Addiction to Short Video and Live Broadcast from an Educational Psychology Perspective ↗',
'高维时空数据的可视化分析 ↗':'Visual Analysis of High-Dimensional Spatiotemporal Data ↗',
'ALONG THE WAY / 学习与实践':'ALONG THE WAY','跨越学科，':'Across disciplines.','保持好奇。':'Always curious.',
'进行中':'ONGOING','中国科学院心理研究所':'Institute of Psychology, Chinese Academy of Sciences',
'谢菲尔德大学':'University of Sheffield','心理学与教育学硕士（转换课程）':'MSc Psychology and Education (Conversion)',
'论文导师：':'Dissertation supervisor: ','查看成绩汇总 PDF ↗':'View results summary PDF ↗',
'北京信息科技大学':'Beijing Information Science and Technology University','管理学学士 · 财务管理':'Bachelor of Management · Financial Management',
'2025年3–4月':'MAR–APR 2025','心理服务实习生':'Psychological Services Intern',
'北京心海导航教育科技有限公司':'Beijing Xinhai Navigation Education Technology Co., Ltd.',
'2024年3–5月':'MAR–MAY 2024','咨询预约协调与初访接待':'Appointment Coordinator & Intake Interviewer',
'北京信息科技大学学生心理健康教育中心':'Student Mental Health Education Center, BISTU',
'LET’S CONNECT / 联系我':'LET’S CONNECT','好的问题，':'Good questions','让我们相遇。':'bring us together.',
'下载英文简历 ↓':'Download CV ↓','概念示意 · 非研究数据':'Conceptual illustration · Not research data',
'NARRATIVE / 不同的观察方式':'NARRATIVE / WAYS OF SEEING','CONNECTIONS / 从个体到环境':'CONNECTIONS / INDIVIDUAL & CONTEXT',
'A MOMENT OF STILLNESS / 片刻平静':'A MOMENT OF STILLNESS','人格 · 故事 · 视角':'PERSONALITY / STORY / PERSPECTIVE','让思考落于文字':'IDEAS ON THE PAGE'
};
const button=document.createElement('button');
button.type='button';button.className='language-toggle';
document.querySelector('.links').append(button);
const nodes=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
const node=walker.currentNode;
if(['SCRIPT','STYLE'].includes(node.parentElement.tagName))continue;
const chinese=node.textContent;
if(dictionary[chinese.trim()])nodes.push({node,chinese,english:chinese.replace(chinese.trim(),dictionary[chinese.trim()])});
}
function setLanguage(language){
const english=language==='en';
nodes.forEach(entry=>{entry.node.textContent=english?entry.english:entry.chinese;});
document.documentElement.lang=english?'en':'zh-CN';
button.textContent=english?'中文':'EN';
button.setAttribute('aria-label',english?'切换为中文':'Switch to English');
document.title=english?'Xiwen Wan — Learning, minds & digital life':'Xiwen Wan — 学习、心理与数字生活';
try{localStorage.setItem('xiwen-language',language);}catch{}
}
button.addEventListener('click',()=>setLanguage(document.documentElement.lang==='en'?'zh-CN':'en'));
let language='zh-CN';try{language=localStorage.getItem('xiwen-language')||language;}catch{}
setLanguage(language);
})();
