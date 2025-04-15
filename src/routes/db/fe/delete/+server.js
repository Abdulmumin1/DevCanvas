import { fail, json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase }, request }) {
	const body = Object.fromEntries(await request.formData());
	// const session = await getSession();
	// console.log('fdjfdsljfd fd lafdjlkaf dkjaf dsalkf dsakfdjsafdksaf dsaf dsakl fdjsaklfdjksaf');
	const { error: err } = await supabase.from('htmlPlayground').delete().eq('project_key', body.id);
	if (err) {
		// console.log(err);
		return json({ message: 'failed' }, { status: 400 });
	} else {
		// console.log('sucs');
		return json({ body }, { status: 201 });
	}
}
