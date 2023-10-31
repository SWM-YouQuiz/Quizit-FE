import { useEffect, useState } from "react";
import { Message } from "ai";
import { markdownToHtmlString } from "@/util/markdown";

export const useMessageToHtmlString = (messages: Message[], isLoading: boolean) => {
    const [convertedMessages, setConvertedMessages] = useState<Message[]>(messages);

    useEffect(() => {
        if (isLoading) {
            const processMarkdownToString = async () => {
                const temp: Message[] = await Promise.all(messages.map((message) => markdownToHtmlString(message.content))).then((htmlStrings) =>
                    htmlStrings.map((result, idx) => ({
                        ...messages[idx],
                        content: result,
                    })),
                );

                setConvertedMessages(temp);
            };
            // console.log("converted", JSON.stringify(convertedMessages));
            processMarkdownToString();
        }
    }, [messages, isLoading]);

    return convertedMessages;
};
