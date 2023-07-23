import {remark} from "remark";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";

export const markdownToHtmlString = async (markdownText: string) => {
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(markdownText);
    return processedContent.toString();
}