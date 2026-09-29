import records from './publications.json';

// Publication year first; arXiv order breaks ties within a year.
// A new record can be added anywhere in the JSON file.
export default [...records].sort((a,b)=>b.year-a.year || b.arxiv.localeCompare(a.arxiv));
