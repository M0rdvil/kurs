export function getMessageTime(messageTime: string) {
	const date = new Date(messageTime);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());

	return `${hours}:${minutes}`;
}

function padZero(number: number) {
	return number.toString().padStart(2, "0");
}
