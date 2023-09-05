import { fail } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase, getSession }, request }) {
	const body = Object.fromEntries(await request.formData());
	const session = await getSession();
	if (session.user.id == body.user_id) {
		// console.log('fdjfdsljfd fd lafdjlkaf dkjaf dsalkf dsakfdjsafdksaf dsaf dsakl fdjsaklfdjksaf');
		const { error: err } = await supabase.from('snips').delete().eq('id', body.id);
		if (err) {
			fail(400, { error: ' unable to complete action' });
		} else {
			return new Response({ status: 200, message: 'donw' });
		}
	}
}
