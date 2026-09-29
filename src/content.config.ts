import {defineCollection,z} from 'astro:content';
import {glob} from 'astro/loaders';
const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value=>!Number.isNaN(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value,'Use a valid ISO calendar date');
const digests=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/digests'}),schema:z.object({lang:z.enum(['en','pt']),issue:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),title:z.string().min(1),start:date,end:date,description:z.string().min(1),highlights:z.number().int().positive(),categories:z.array(z.string().min(1)).min(1)}).refine(data=>data.start<=data.end,'Digest start must not follow end')});
export const collections={digests};
