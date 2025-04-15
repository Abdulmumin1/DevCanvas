<script>
	import MessageProcessor from "./MessageProcessor.svelte";

    export let messages = [];
    let versionCount = 0;
    
    // Process content to replace code blocks with version indicators
    function processContent(content) {
      // If no content, return empty string
      if (!content) return '';
      
      // Count how many code versions are in the content
      const startTags = '<!DOCTYPE html>';
      const endTags = '</html>';
      let processedContent = content;
      
      // Replace each code block with a version indicator
      while (processedContent.includes(startTags)) {
        versionCount++;
        const startIndex = processedContent.indexOf(startTags);
        const endIndex = processedContent.indexOf(endTags, startIndex);
        
        if (endIndex !== -1) {
          // Replace the code block with a version indicator
          let beforeBlock = processedContent.substring(0, startIndex);
          let afterBlock = processedContent.substring(endIndex + endTags.length);
          return beforeBlock + `<span class="inline-block bg-sky-50 text-sky-700 px-2 py-0.5 rounded text-xs font-medium border border-sky-200 my-1">Code Version ${versionCount}</span>` + afterBlock;
        } else {
          // If no end tag, replace from start tag to the end
          let beforeBlock = processedContent.substring(0, startIndex);
          return beforeBlock + `<span class="inline-block bg-sky-50 text-sky-700 px-2 py-0.5 rounded text-xs font-medium border border-sky-200 my-1">Code Version ${versionCount} (in progress)</span>`;
        }
      }
      
      return processedContent;
    }
    
    function hasCodeBlock(content) {
      if (!content) return false;
      return content.includes('<span class="inline-block w-full bg-gradient-to-r from-sky-400 to-sky-300 text-sky-700 px-2 py-0.5 rounded text-xs font-medium border border-sky-200 my-1">');
    }
  </script>
  
  <div class="flex flex-col w-full gap-3 p-2 max-h-full overflow-y-auto overflow-x-hidden">
    {#each messages as message (message.messageId)}
      <div class="p-2 rounded-lg max-w-full text-white {message.role === 'user' ? 'bg-neutral-700 ml-5' : 'bg-stone-800 mr-5'}">
        <div class="flex items-center mb-1">
          <div class="size-3 rounded-full mr-1.5 {message.role === 'user' ? 'bg-neutral-400' : 'bg-stone-100'}"></div>
          <div class="font-medium text-xs">{message.role === 'user' ? 'You' : 'AI Assistant'}</div>
        </div>
        {#key message.content}
        <div class="whitespace-pre-wrap leading-normal text-sm">
          <MessageProcessor content={message.content}/>
       </div>
        {/key}
      </div>
    {/each}
  </div>