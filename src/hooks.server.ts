import { startMongo } from '$db/mongo';

startMongo()
	.then(() => {
		console.log('Mongo DB started');
	})
	.catch((err) => {
		console.error('Mongo DB could not start', err);
	});

export async function handle({ event, resolve }) {
	return resolve(event);
}
