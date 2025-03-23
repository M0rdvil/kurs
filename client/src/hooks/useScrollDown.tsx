// hook for scrolling down whenever the new message is being recieved
import { useEffect, useRef } from "react";

function useScrollDown(dep: any) {
	const ref = useRef<HTMLElement>();

	useEffect(() => {
		setTimeout(() => {
			if (ref.current) {
				ref.current.scrollTop = ref.current.scrollHeight;
			}
		}, 100);
	}, [dep]);

	return ref;
}

export default useScrollDown;
