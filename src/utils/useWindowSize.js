import { useEffect, useState } from 'react';

function useWindowSize() {
	const [isMobile, setIsMobile] = useState(false);
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 840) {
				if (!isMobile) {
					setIsMobile(true);
					setWindowHeight(window.innerHeight);
				}
			} else {
				// eslint-disable-next-line no-lonely-if
				if (isMobile) {
					setIsMobile(false);
					setWindowHeight(window.innerHeight);
				}
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	});

	return { isMobile, windowHeight };
}

export default useWindowSize;
