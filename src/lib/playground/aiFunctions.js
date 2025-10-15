import { writable } from 'svelte/store';

export let aibox = writable(false);
export let aiprompt = writable('');
export let artifact_swap = writable('NONE');

//  export async function parserAI(response){
//     if (response.ok) {
//         let messageId = crypto.randomUUID();
//         const reader = response.body.getReader();
//         let decoder = new TextDecoder();
//         let result = '';
//         let htmlBuffer = '';
//         let insideMainBlock = false;

//         const startTag = '<DEVCANVAS_START>';
//         const endTag = '</DEVCANVAS_END>';

//         const innerBlocks = [
//             { start: '<DEVCANVAS_HEAD>', end: '</DEVCANVAS_HEAD>' },
//             { start: '<DEVCANVAS_STYLE>', end: '</DEVCANVAS_STYLE>' },
//             { start: '<DEVCANVAS_BODY>', end: '</DEVCANVAS_BODY>' },
//             { start: '<DEVCANVAS_SCRIPT>', end: '</DEVCANVAS_SCRIPT>' }
//         ];

//         let currentBlock = null;
//         let currentEndTag = '';
//         let innerContent = '';

//         function findTagPosition(buffer, tag, startPos = 0) {
//             let index = buffer.indexOf(tag, startPos);
//             if (index !== -1) return index;
//             for (let i = 1; i < tag.length; i++) {
//                 if (buffer.slice(-i) === tag.slice(0, i)) return -2;
//             }
//             return -1;
//         }

//         try {
//             while (fetchResponse) {
//                 const { done, value } = await reader.read();
//                 if (done) {
//                     $generating = false;
//                     break;
//                 }

//                 const chunk = decoder.decode(value);
//                 result += chunk;

//                 if (!insideMainBlock) {
//                     const mainStartIdx = findTagPosition(result, startTag);
//                     if (mainStartIdx >= 0) {
//                         insideMainBlock = true;
//                         htmlBuffer = result.slice(mainStartIdx + startTag.length);
//                         result = result.slice(0, mainStartIdx);
//                     }
//                 } else {
//                     htmlBuffer += chunk;
//                     let pos = 0;

//                     while (pos < htmlBuffer.length) {
//                         if (!currentBlock) {
//                             // Find next inner block
//                             let foundBlock = null;
//                             for (const block of innerBlocks) {
//                                 const tagPos = findTagPosition(htmlBuffer, block.start, pos);
//                                 if (tagPos >= 0) {
//                                     foundBlock = block;
//                                     pos = tagPos + block.start.length;
//                                     break;
//                                 }
//                             }

//                             if (foundBlock) {
//                                 currentBlock = foundBlock.start;
//                                 currentEndTag = foundBlock.end;
//                                 innerContent = '';
//                             } else {
//                                 pos = htmlBuffer.length;
//                             }
//                         } else {
//                             const endPos = findTagPosition(htmlBuffer, currentEndTag, pos);
//                             if (endPos >= 0) {
//                                 // Complete block found
//                                 innerContent += htmlBuffer.slice(pos, endPos);
//                                 debouncedUpdate({
//                                     blockType: currentBlock,
//                                     content: innerContent
//                                 });
//                                 currentBlock = null;
//                                 pos = endPos + currentEndTag.length;
//                             } else if (endPos === -2) {
//                                 // Handle partial end tag
//                                 const partialLength = currentEndTag.length - 1;
//                                 innerContent += htmlBuffer.slice(pos, htmlBuffer.length - partialLength);
//                                 htmlBuffer = htmlBuffer.slice(-partialLength);
//                                 pos = 0;
//                             } else {
//                                 // Continue accumulating content
//                                 innerContent += htmlBuffer.slice(pos);
//                                 pos = htmlBuffer.length;
//                             }
//                         }
//                     }

//                     // Check for main block end
//                     const mainEndPos = findTagPosition(htmlBuffer, endTag);
//                     if (mainEndPos >= 0) {
//                         insideMainBlock = false;
//                         htmlBuffer = htmlBuffer.slice(mainEndPos + endTag.length);
//                     } else {
//                         htmlBuffer = htmlBuffer.slice(pos);
//                     }
//                 }

//                 // Update messages array properly
//                 const aiResponse = {
//                     messageId,
//                     role: 'assistant',
//                     content: result
//                 };

//                 messages = messages.some(msg => msg.messageId === messageId)
//                     ? messages.map(msg =>
//                         msg.messageId === messageId ? aiResponse : msg
//                     )
//                     : [...messages, aiResponse];
//             }

//             fetchResponse = true;
//         } catch (error) {
//             console.error('Error processing stream:', error);
//             $generating = false;
//         }
//     }

// }
