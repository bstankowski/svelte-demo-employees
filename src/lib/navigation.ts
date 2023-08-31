import { goto } from '$app/navigation';

export function goBack() {
	const ref = document.referrer;
	goto(ref.length > 0 ? ref : '/');
}
