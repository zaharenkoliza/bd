
const docEl = document.documentElement;

export const blockPage = {
	on() {
		if (!docEl.classList.contains('fixed')) {
			const scrollY = window.scrollY || docEl.scrollTop;
			docEl.style.setProperty('--scroll-position', `${scrollY}px`);
			docEl.classList.add('fixed');

			document.querySelectorAll(".fix-to-top").forEach(e => {
				e.classList.remove("hide");
			});
		}
	},

	off() {
		if (docEl.classList.contains('fixed')) {
			const scrollY = docEl.style.getPropertyValue('--scroll-position');
			docEl.style.removeProperty('--scroll-position');
			docEl.classList.remove('fixed');
			window.scrollTo({ left: 0, top: parseInt(scrollY || '0'), behavior: 'instant' });

			document.querySelectorAll(".fix-to-top").forEach(e => {
				e.classList.remove("hide");
			});
		}
	},

	toggle(element, elementClass) {
		if (element.classList.contains(elementClass)) {
			this.off();
		} else {
			this.on();
		}
	}
};
