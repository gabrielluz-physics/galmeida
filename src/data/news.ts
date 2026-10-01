import {nsfcGrant,zhishanFellowship} from './academic';
// Records share titles and descriptions with the CV; dates sort newest first.
export const news = [zhishanFellowship,nsfcGrant].map(item => ({...item,featured:true}));
export const recentNews = news.filter(item=>item.featured).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
