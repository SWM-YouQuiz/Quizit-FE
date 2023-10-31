import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";

export const markdownToHtmlString = async (markdownText: string) => {
    const correctedMarkdown = markdownText.replace(/(\*\*[^*]+\*\*)(\S)/g, "$1 $2").replace(/\\`\\`\\`/g, "```");

    const processedContent = await remark().use(remarkRehype).use(rehypePrism).use(rehypeStringify).process(correctedMarkdown);
    return processedContent.toString();
};
