(() => {
    const yearEl = document.getElementById('lpYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const toggle = document.querySelector('.lp-menu-toggle');
    const dropdown = document.getElementById('lpDropdown');
    if (!toggle || !dropdown) return;

    const openDropdown = () => {
        dropdown.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
        dropdown.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
    };

    const isOpen = () => dropdown.hidden === false;

    toggle.addEventListener('click', () => {
        if (isOpen()) closeDropdown();
        else openDropdown();
    });

    dropdown.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => closeDropdown());
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDropdown();
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (toggle.contains(target) || dropdown.contains(target)) return;
        closeDropdown();
    });
})();
