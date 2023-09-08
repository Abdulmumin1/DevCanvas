<script>
	import EmbedComponent from '../embedComponent.svelte';
	import SectionCard from './sectionCard.svelte';

	let details = {
		code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        else:
            raise IndexError("pop from empty stack")

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        else:
            raise IndexError("peek from empty stack")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Usage

stack = Stack()

stack.push(5)
stack.push(10)
stack.push(15)

print("Stack size:", stack.size())
print("Top element:", stack.peek())

popped_item = stack.pop()
print("Popped item:", popped_item)

print("Is stack empty?", stack.is_empty())
`,
		lang: 'python'
	};

	let c = `
<iframe
 src="https://snippet-bice.vercel.app/v4H9dW/embed"
/>`;
</script>

<div class=" h-[100vh] mb-8 flex p-7 py-9 justify-center">
	<div class="w-full flex flex-col md:flex-row gap-6 justify-between max-w-5xl">
		<div class="flex justify-center flex-col w-full md:w-3/5">
			<h2 class="text-3xl md:text-4xl text-black font-semibold mb-2 dark:text-sky-400">
				Easily embed beautifully with just <span class="text-error">iframe</span>
			</h2>
			<pre class="text-[9px] md:text-sm bg-secondary-dark rounded-xl px-4 text-white">
				<code>{c}</code>
			</pre>
		</div>
		<div class=" w-full h-full">
			<iframe
				title="embed"
				src="https://snippet-bice.vercel.app/v4H9dW/embed"
				width="100%"
				class="rounded-xl h-full md:h-[80%]"
			>
				<p>
					<a href="/en-US/docs/Glossary"> Fallback link for browsers that don't support iframes </a>
				</p>
			</iframe>
		</div>
	</div>
</div>
