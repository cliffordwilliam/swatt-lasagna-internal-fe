import { useCallback, useEffect, useRef } from "react";

const DEFAULT_DEBOUNCE_MS = 300;

export function useDebouncedCallback<TArgs extends unknown[]>(
	fn: (...args: TArgs) => void | Promise<void>,
	delay: number = DEFAULT_DEBOUNCE_MS,
): [(...args: TArgs) => void, () => void] {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fnRef = useRef(fn);
	fnRef.current = fn;

	const cancel = useCallback(() => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const debouncedFn = useCallback(
		(...args: TArgs) => {
			cancel();
			timeoutRef.current = setTimeout(() => {
				timeoutRef.current = null;
				fnRef.current(...args);
			}, delay);
		},
		[delay, cancel],
	);

	useEffect(() => cancel, [cancel]);

	return [debouncedFn, cancel];
}
