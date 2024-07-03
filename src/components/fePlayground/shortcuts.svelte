<script>
    // Object containing shortcuts and their descriptions
    const shortcuts = {
      'Ctrl + /': 'Toggle settings menu',
      'Ctrl + S': 'Save current document',
      'Ctrl + K': 'Toggle Navigation',
    };
  
    // Function to format the key combination
    function formatKey(key) {
      return key.replace('Ctrl', 'Cmd') + ' or ' + key;
    }
  </script>
  
  <div class="hidden md:block">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Available Shortcuts</h2>
    <ul class="space-y-3">
      {#each Object.entries(shortcuts) as [key, description]}
        <li class="flex justify-between items-center">
          <span class="font-mono bg-gray-100 text-gray-800 px-2 py-1 rounded">{formatKey(key)}</span>
          <span class="text-gray-600">{description}</span>
        </li>
      {/each}
    </ul>
  </div>