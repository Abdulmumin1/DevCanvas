export function injectJavascript(iframeDoc, js) {
	const scriptElement = iframeDoc.createElement('script');
	scriptElement.id = 'mainScript12343REFDS!';
	scriptElement.textContent = `

console.log = function(message) {
// Send the console message to the parent page
window.parent.postMessage({ type: 'console', message: message }, '*');
};

try {

${js}

} catch(err){
console.log(err); 

}`;
	iframeDoc.body.appendChild(scriptElement);
}
