import { getCollection } from 'astro:content';
import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	// Reseñas de autos (src/content/blog)
	const posts = await getCollection('blog');
	const resenas = posts.map((post) => ({
		...post.data,
		link: `/blog/${post.id}/`,
	}));

	// Entradas del tutorial (src/pages/posts/*.md)
	const entradasTutorial = await pagesGlobToRssItems(import.meta.glob('./**/*.md'));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: [...resenas, ...entradasTutorial],
		customData: `<language>es-mx</language>`,
	});
}
