// import { lsqz } from '$lib/lemonsq';
import { fail, redirect } from '@sveltejs/kit';
import { kStringMaxLength } from 'buffer';

async function verifyLicense(url, options) {
	try {
		const response = await fetch(url, options);
		const data = await response.json();

		if (data['activated'] === false) {
			// return a message with the error.
			// return data['error']
			return { active: false, data };
		} else if (data['activated'] === true) {
			// update database with license key and instance id
			return { active: true, data };
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	update_license: async ({ request, locals: { supabase, getSession } }) => {
		let session = await getSession();
		const url = 'https://api.lemonsqueezy.com/v1/licenses/activate';
		let body = Object.fromEntries(await request.formData());
		let license = body.license;
		let user_id = session.user_id;
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `license_key=${license}&instance_name=Test`
		};

		// const licenseKeys = await lsqz.getLicenseKeys();
		// console.log(licenseKeys);

		// const { data: profile, error: err } = await supabase
		// 	.from('profiles')
		// 	.update([{ license }])
		// 	.eq('user_id', user_id);

		console.log(body);

		let res = await verifyLicense(url, options);
		if (!res.active) {
			// console.log('in')
			return fail(400, { error: true, errors: [{ message: res.data['error'] }] });
		}
	}
};
