// 1. Sidebar Active Link Logic
// This ensures the sidebar highlights the current page even if you reload.
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {
        link.parentElement.classList.remove("active");
        if (link.getAttribute("href") === currentPath) {
            link.parentElement.classList.add("active");
        }
    });
});

// 2. Application Form Logic (for application.html)
const cccspForm = document.getElementById('cccspForm');
if (cccspForm) {
    cccspForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to button
        const submitBtn = this.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.classList.add('loading');
        }
        
        const income = this.querySelector('input[type="number"]').value;
        const barangay = this.querySelector('select').value;

        // Cebu City Specific Rule: Income Limit
        if (income > 400000) {
            alert("Note: Family income exceeds ₱400,000. Your application will require additional manual review by the board.");
        }

        // Cebu City Specific Rule: Mountain Barangay Bonus
        if (barangay === 'busay') {
            alert("Detected: Mountain Barangay resident. You may qualify for the additional ₱5,000 transpo allowance!");
        }

        // Remove loading state
        if (submitBtn) {
            submitBtn.classList.remove('loading');
        }
        
        alert("Application Submitted Successfully! Please save your Control Number: CCCSP-2026-" + Math.floor(Math.random() * 9000));
    });
}

// 3. Status Search Logic (for status.html)
function checkStatus() {
    const searchInput = document.getElementById('statusSearch');
    const resultCard = document.querySelector('.result-card');

    if (searchInput && searchInput.value.length > 5) {
        // Add pulse effect to button
        const searchBtn = document.querySelector('.btn-search');
        if (searchBtn) {
            searchBtn.classList.add('pulse');
        }
        
        // Show the hidden result card with animation
        if (resultCard) {
            resultCard.classList.add('show');
        }
        
        // Remove pulse after animation
        setTimeout(() => {
            if (searchBtn) {
                searchBtn.classList.remove('pulse');
            }
        }, 2000);
    } else {
        alert("Please enter a valid Control Number (e.g., CCCSP-2026-1024)");
    }
}

// Attach the search function to the button if it exists
const searchBtn = document.querySelector('.btn-search');
if (searchBtn) {
    searchBtn.addEventListener('click', checkStatus);
}

// Auto-Play Logic for the Home Page Carousel (removed, keeping for future use if needed)
// let counter = 1;

// Function to move to the next slide
// function autoSlide() {
//     const radioBtn = document.getElementById('radio' + counter);
//     if (radioBtn) {
//         radioBtn.checked = true;
//         counter++;
//         
//         // Reset to the first slide after reaching the last one (3 slides in our case)
//         if (counter > 3) {
//             counter = 1;
//         }
//     }
// }

// Start the timer (5000ms = 5 seconds)
// let slideInterval = setInterval(autoSlide, 5000);

// Optional: Stop the timer if the user manually clicks a navigation button
const manualBtns = document.querySelectorAll('.manual-btn');
manualBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (typeof slideInterval !== 'undefined') {
            clearInterval(slideInterval); // Stop auto-play so it doesn't jump while they are looking
        }
        // Optional: Restart it after 10 seconds of inactivity
        setTimeout(() => {
            if (typeof autoSlide !== 'undefined') {
                slideInterval = setInterval(autoSlide, 5000);
            }
        }, 10000);
    });
});

// 4. Enhanced Input Focus Effects
const inputFields = document.querySelectorAll('.input-field input, .input-field select, .input-group input, .input-group textarea');
inputFields.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// 5. Intersection Observer for Scroll-triggered Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// 6. Stat Counter Animation (home page)
function animateCount(el) {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target) || target <= 0) return;

    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const durationMs = 1100;
    const startTime = performance.now();

    const step = (now) => {
        const progress = Math.min(1, (now - startTime) / durationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('[data-count]');
if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            counterObserver.unobserve(entry.target);
        });
    }, { threshold: 0.35 });

    statNumbers.forEach(el => counterObserver.observe(el));
}

// 6.1 File input helper (application page)
document.querySelectorAll('.file-box input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
        const wrapper = input.closest('.file-box');
        const meta = wrapper ? wrapper.querySelector('.file-meta') : null;
        if (!meta) return;

        const fileName = input.files && input.files[0] ? input.files[0].name : '';
        meta.textContent = fileName ? `Selected: ${fileName}` : 'No file selected';
    });
});

// 6.2 Contact form helper
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const sendBtn = this.querySelector('.btn-send');
        if (sendBtn) sendBtn.classList.add('loading');

        setTimeout(() => {
            if (sendBtn) sendBtn.classList.remove('loading');
            alert('Message sent! Our team will reply to your email as soon as possible.');
            this.reset();
        }, 700);
    });
}

// 6. Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 7. Nav Link Active Animation Enhancement
const navLinksAll = document.querySelectorAll('.nav-menu a');
navLinksAll.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// 8. Admin login/dashboard helpers (temporary hardcoded credentials)
const ADMIN_CREDENTIALS = {
    email: 'admin@cccsp.local',
    password: 'TempPass123!'
};

function ensureAdminNavItem() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    if (navMenu.querySelector('a[href="admin-login.html"]')) return;

    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = '<a href="admin-login.html" title="Admin login"><i class="fas fa-user-shield" aria-hidden="true"></i> <span>Admin</span></a>';
    navMenu.appendChild(li);
}

function setAdminLoggedIn(state) {
    if (state) {
        localStorage.setItem('cccspAdminLoggedIn', 'true');
    } else {
        localStorage.removeItem('cccspAdminLoggedIn');
    }
}

function isAdminLoggedIn() {
    return localStorage.getItem('cccspAdminLoggedIn') === 'true';
}

function requireAdminAuth() {
    if (!isAdminLoggedIn()) {
        window.location.href = 'admin-login.html';
    }
}

function adminLogout() {
    setAdminLoggedIn(false);
    window.location.href = 'admin-login.html';
}

function bindAdminLogoutLink() {
    const logoutLink = document.getElementById('adminLogoutLink');
    if (!logoutLink) return;
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        adminLogout();
    });
}

function exportTableToCSV(table, filenamePrefix) {
    if (!table) return;

    const csvEscape = (value) => {
        const text = String(value ?? '').replace(/\s+/g, ' ').trim();
        if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
        return text;
    };

    const headerCells = Array.from(table.querySelectorAll('thead th')).map((th) => csvEscape(th.textContent));
    const bodyRows = Array.from(table.querySelectorAll('tbody tr'))
        .filter((row) => row.style.display !== 'none')
        .map((row) => Array.from(row.querySelectorAll('td')).map((td) => csvEscape(td.textContent)).join(','));

    const csv = [headerCells.join(','), ...bodyRows].join('\n') + '\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const filename = `${filenamePrefix}-${new Date().toISOString().slice(0, 10)}.csv`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
}

function initAdminLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    const messageBox = document.getElementById('adminLoginMessage');
    if (!loginForm) return;

    if (isAdminLoggedIn()) {
        window.location.href = 'admin-dashboard.html';
        return;
    }

    const useDemoBtn = document.getElementById('adminUseDemo');
    if (useDemoBtn) {
        useDemoBtn.addEventListener('click', () => {
            const emailInput = loginForm.querySelector('#adminEmail');
            const passwordInput = loginForm.querySelector('#adminPassword');
            if (emailInput) emailInput.value = ADMIN_CREDENTIALS.email;
            if (passwordInput) passwordInput.value = ADMIN_CREDENTIALS.password;

            if (messageBox) {
                messageBox.textContent = 'Demo credentials filled. Click “Sign In” to continue.';
                messageBox.style.color = 'rgba(255, 255, 255, 0.86)';
            }

            if (passwordInput) passwordInput.focus();
        });
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = loginForm.querySelector('#adminEmail').value.trim();
        const password = loginForm.querySelector('#adminPassword').value;

        if (email.toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            setAdminLoggedIn(true);
            window.location.href = 'admin-dashboard.html';
            return;
        }

        setAdminLoggedIn(false);

        if (messageBox) {
            messageBox.textContent = 'Invalid credentials. Please use the temporary demo credentials shown above.';
            messageBox.style.color = '#ffcc00';
        }
    });
}

function bindAdminDashboardActions() {
    bindAdminLogoutLink();

    const refreshBtn = document.getElementById('actionRefresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            document.getElementById('totalApplications').textContent = String(5000 + Math.floor(Math.random() * 75));
            document.getElementById('pendingApplications').textContent = String(150 + Math.floor(Math.random() * 80));
            document.getElementById('approvedApplications').textContent = String(2800 + Math.floor(Math.random() * 50));
            document.getElementById('rejectedApplications').textContent = String(120 + Math.floor(Math.random() * 40));
        });
    }

    const resetBtn = document.getElementById('actionReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('totalApplications').textContent = '5,003';
            document.getElementById('pendingApplications').textContent = '284';
            document.getElementById('approvedApplications').textContent = '2,882';
            document.getElementById('rejectedApplications').textContent = '137';
        });
    }

    const statusFilter = document.getElementById('adminStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            const selected = String(statusFilter.value || 'all').toLowerCase();
            const rows = document.querySelectorAll('#recentApplicationsBody tr');
            rows.forEach((row) => {
                const badge = row.querySelector('.badge');
                const status =
                    badge?.classList.contains('pending') ? 'pending'
                        : badge?.classList.contains('approved') ? 'approved'
                            : badge?.classList.contains('rejected') ? 'rejected'
                                : 'unknown';
                row.style.display = (selected === 'all' || selected === status) ? '' : 'none';
            });
        });
    }

    const exportBtn = document.getElementById('actionExportCSV');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTableToCSV(document.querySelector('.admin-data-table'), 'cccsp-admin-export');
        });
    }
}

function bindAdminUsersPage() {
    bindAdminLogoutLink();

    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;

    const searchInput = document.getElementById('userSearch');
    const roleFilter = document.getElementById('userRoleFilter');

    const filterRows = () => {
        const query = String(searchInput?.value || '').trim().toLowerCase();
        const role = String(roleFilter?.value || 'all');

        const rows = Array.from(tableBody.querySelectorAll('tr'));
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const name = String(cells[0]?.textContent || '').toLowerCase();
            const email = String(cells[1]?.textContent || '').toLowerCase();
            const roleText = String(cells[2]?.textContent || '').trim();

            const matchesQuery = !query || name.includes(query) || email.includes(query);
            const matchesRole = role === 'all' || roleText === role;
            row.style.display = (matchesQuery && matchesRole) ? '' : 'none';
        });
    };

    if (searchInput) searchInput.addEventListener('input', filterRows);
    if (roleFilter) roleFilter.addEventListener('change', filterRows);
    filterRows();

    tableBody.addEventListener('click', (e) => {
        const button = e.target?.closest?.('.admin-row-toggle');
        if (!button) return;

        const row = button.closest('tr');
        const statusBadge = row?.querySelector('td:nth-child(4) .badge');
        if (!statusBadge) return;

        const current = String(statusBadge.textContent || '').trim().toLowerCase();
        if (current === 'invited') {
            statusBadge.textContent = 'Invited (resent)';
            statusBadge.classList.remove('approved', 'rejected');
            statusBadge.classList.add('pending');
            return;
        }

        if (current === 'disabled') {
            statusBadge.textContent = 'Active';
            statusBadge.classList.remove('pending', 'rejected');
            statusBadge.classList.add('approved');
            button.textContent = 'Disable';
            return;
        }

        // Treat anything else as active
        statusBadge.textContent = 'Disabled';
        statusBadge.classList.remove('pending', 'approved');
        statusBadge.classList.add('rejected');
        button.textContent = 'Enable';
    });

    const exportBtn = document.getElementById('userExportCSV');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTableToCSV(document.querySelector('.admin-data-table'), 'cccsp-users-export');
        });
    }
}

function bindAdminApplicationsPage() {
    bindAdminLogoutLink();

    const tableBody = document.getElementById('applicationsTableBody');
    if (!tableBody) return;

    const searchInput = document.getElementById('appSearch');
    const statusFilter = document.getElementById('appStatusFilter');

    const filterRows = () => {
        const query = String(searchInput?.value || '').trim().toLowerCase();
        const selectedStatus = String(statusFilter?.value || 'all').toLowerCase();
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const control = String(cells[0]?.textContent || '').toLowerCase();
            const name = String(cells[1]?.textContent || '').toLowerCase();
            const badge = row.querySelector('.badge');
            const status =
                badge?.classList.contains('pending') ? 'pending'
                    : badge?.classList.contains('approved') ? 'approved'
                        : badge?.classList.contains('rejected') ? 'rejected'
                            : 'unknown';

            const matchesQuery = !query || control.includes(query) || name.includes(query);
            const matchesStatus = selectedStatus === 'all' || selectedStatus === status;
            row.style.display = (matchesQuery && matchesStatus) ? '' : 'none';
        });
    };

    if (searchInput) searchInput.addEventListener('input', filterRows);
    if (statusFilter) statusFilter.addEventListener('change', filterRows);
    filterRows();

    const modal = document.getElementById('appDetailsModal');
    const closeModal = () => {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = '';
    };

    const openModal = (row) => {
        if (!modal || !row) return;
        const cells = row.querySelectorAll('td');

        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(value ?? '—');
        };

        setText('appDetailControl', cells[0]?.textContent);
        setText('appDetailName', cells[1]?.textContent);
        setText('appDetailStatus', row.querySelector('.badge')?.textContent);
        setText('appDetailProgram', row.getAttribute('data-program'));
        setText('appDetailBarangay', cells[3]?.textContent);
        setText('appDetailIncome', `₱${Number(row.getAttribute('data-income') || 0).toLocaleString()}`);
        setText('appDetailNotes', row.getAttribute('data-notes'));

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
    });

    modal?.addEventListener('click', (e) => {
        if (e.target?.matches?.('[data-close-modal]')) closeModal();
    });

    tableBody.addEventListener('click', (e) => {
        const button = e.target?.closest?.('.admin-view-app');
        if (!button) return;
        openModal(button.closest('tr'));
    });

    const exportBtn = document.getElementById('appExportCSV');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTableToCSV(document.querySelector('.admin-data-table'), 'cccsp-applications-export');
        });
    }
}

function bindAdminSettingsPage() {
    bindAdminLogoutLink();

    const form = document.getElementById('adminSettingsForm');
    if (!form) return;

    const messageBox = document.getElementById('adminSettingsMessage');
    const defaults = {
        applicationsOpen: true,
        incomeLimit: 400000,
        supportEmail: 'support@cccsp.local'
    };

    const loadSettings = () => {
        try {
            const raw = localStorage.getItem('cccspAdminSettings');
            if (!raw) return { ...defaults };
            const parsed = JSON.parse(raw);
            return {
                applicationsOpen: typeof parsed.applicationsOpen === 'boolean' ? parsed.applicationsOpen : defaults.applicationsOpen,
                incomeLimit: Number.isFinite(Number(parsed.incomeLimit)) ? Number(parsed.incomeLimit) : defaults.incomeLimit,
                supportEmail: String(parsed.supportEmail || defaults.supportEmail)
            };
        } catch {
            return { ...defaults };
        }
    };

    const applySettingsToForm = (settings) => {
        const openEl = document.getElementById('settingApplicationsOpen');
        const incomeEl = document.getElementById('settingIncomeLimit');
        const emailEl = document.getElementById('settingSupportEmail');
        if (openEl) openEl.checked = Boolean(settings.applicationsOpen);
        if (incomeEl) incomeEl.value = String(settings.incomeLimit);
        if (emailEl) emailEl.value = String(settings.supportEmail);
    };

    const showMessage = (text, color) => {
        if (!messageBox) return;
        messageBox.textContent = text;
        messageBox.style.color = color || 'rgba(255, 255, 255, 0.86)';
    };

    applySettingsToForm(loadSettings());

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const openEl = document.getElementById('settingApplicationsOpen');
        const incomeEl = document.getElementById('settingIncomeLimit');
        const emailEl = document.getElementById('settingSupportEmail');

        const next = {
            applicationsOpen: Boolean(openEl?.checked),
            incomeLimit: Number(incomeEl?.value || defaults.incomeLimit),
            supportEmail: String(emailEl?.value || defaults.supportEmail).trim()
        };

        localStorage.setItem('cccspAdminSettings', JSON.stringify(next));
        showMessage('Saved (demo).', 'rgba(255, 255, 255, 0.86)');
    });

    const resetBtn = document.getElementById('adminSettingsReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem('cccspAdminSettings');
            applySettingsToForm({ ...defaults });
            showMessage('Reset to defaults (demo).', 'rgba(255, 255, 255, 0.86)');
        });
    }
}

function initializeAdminFeatures() {
    ensureAdminNavItem();
    if (document.body.classList.contains('page-admin-login')) {
        initAdminLogin();
    }

    if (document.body.classList.contains('page-admin-dashboard')) {
        requireAdminAuth();
        bindAdminDashboardActions();
    }

    if (document.body.classList.contains('page-admin-users')) {
        requireAdminAuth();
        bindAdminUsersPage();
    }

    if (document.body.classList.contains('page-admin-applications')) {
        requireAdminAuth();
        bindAdminApplicationsPage();
    }

    if (document.body.classList.contains('page-admin-settings')) {
        requireAdminAuth();
        bindAdminSettingsPage();
    }
}

// 9. User login/dashboard helpers (temporary hardcoded credentials)
const USER_CREDENTIALS = {
    email: 'user@cccsp.local',
    password: 'UserPass123!'
};

function setUserLoggedIn(state, email) {
    if (state) {
        localStorage.setItem('cccspUserLoggedIn', 'true');
        localStorage.setItem('cccspUserEmail', String(email || USER_CREDENTIALS.email).toLowerCase());
    } else {
        localStorage.removeItem('cccspUserLoggedIn');
        localStorage.removeItem('cccspUserEmail');
        localStorage.removeItem('cccspUserDemoStatus');
    }
}

function isUserLoggedIn() {
    return localStorage.getItem('cccspUserLoggedIn') === 'true';
}

function getUserEmail() {
    return localStorage.getItem('cccspUserEmail') || USER_CREDENTIALS.email;
}

function requireUserAuth() {
    if (!isUserLoggedIn()) {
        window.location.href = 'user-login.html';
    }
}

function userLogout() {
    setUserLoggedIn(false);
    window.location.href = 'user-login.html';
}

function isAdminPage() {
    return Array.from(document.body.classList).some((c) => c.startsWith('page-admin'));
}

function ensureUserNavItem() {
    if (isAdminPage()) return;

    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    let li = navMenu.querySelector('#cccspUserNavItem');
    if (!li) {
        li = document.createElement('li');
        li.id = 'cccspUserNavItem';
        li.className = 'nav-item';
        navMenu.appendChild(li);
    }

    const loggedIn = isUserLoggedIn();
    const href = loggedIn ? 'user-dashboard.html' : 'user-login.html';
    const label = loggedIn ? 'My Dashboard' : 'User Login';
    const icon = loggedIn ? 'fa-id-card' : 'fa-right-to-bracket';

    li.innerHTML = `<a href="${href}" title="${label}"><i class="fas ${icon}" aria-hidden="true"></i> <span>${label}</span></a>`;
}

function initUserLogin() {
    const loginForm = document.getElementById('userLoginForm');
    const messageBox = document.getElementById('userLoginMessage');
    if (!loginForm) return;

    if (isUserLoggedIn()) {
        window.location.href = 'user-dashboard.html';
        return;
    }

    const useDemoBtn = document.getElementById('userUseDemo');
    if (useDemoBtn) {
        useDemoBtn.addEventListener('click', () => {
            const emailInput = loginForm.querySelector('#userEmail');
            const passwordInput = loginForm.querySelector('#userPassword');
            if (emailInput) emailInput.value = USER_CREDENTIALS.email;
            if (passwordInput) passwordInput.value = USER_CREDENTIALS.password;

            if (messageBox) {
                messageBox.textContent = 'Demo credentials filled. Click “Sign In” to continue.';
                messageBox.style.color = 'rgba(255, 255, 255, 0.86)';
            }

            if (passwordInput) passwordInput.focus();
        });
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = loginForm.querySelector('#userEmail').value.trim().toLowerCase();
        const password = loginForm.querySelector('#userPassword').value;

        if (email === USER_CREDENTIALS.email && password === USER_CREDENTIALS.password) {
            setUserLoggedIn(true, email);
            window.location.href = 'user-dashboard.html';
            return;
        }

        setUserLoggedIn(false);
        if (messageBox) {
            messageBox.textContent = 'Invalid credentials. Please use the temporary demo credentials shown above.';
            messageBox.style.color = '#ffcc00';
        }
    });
}

function bindUserDashboardActions() {
    const logoutLink = document.getElementById('userLogoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            userLogout();
        });
    }

    const emailEl = document.getElementById('userDashboardEmail');
    if (emailEl) emailEl.textContent = getUserEmail();

    const statusEl = document.getElementById('userAppStatus');
    const lastUpdatedEl = document.getElementById('userLastUpdated');
    const nextStepEl = document.getElementById('userNextStep');
    const activityBody = document.getElementById('userActivityBody');

    const today = new Date().toISOString().slice(0, 10);
    if (lastUpdatedEl) lastUpdatedEl.textContent = today;

    const applyStatus = (status) => {
        if (!statusEl) return;
        const normalized = String(status || 'Pending').toLowerCase();
        statusEl.classList.remove('pending', 'approved', 'rejected');
        if (normalized === 'approved') statusEl.classList.add('approved');
        else if (normalized === 'rejected') statusEl.classList.add('rejected');
        else statusEl.classList.add('pending');
        statusEl.textContent = normalized.charAt(0).toUpperCase() + normalized.slice(1);
        localStorage.setItem('cccspUserDemoStatus', statusEl.textContent);
    };

    applyStatus(localStorage.getItem('cccspUserDemoStatus') || 'Pending');

    const simulateBtn = document.getElementById('userSimulateUpdate');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            const current = String(statusEl?.textContent || 'Pending').toLowerCase();
            const next = current === 'pending' ? 'Approved' : (current === 'approved' ? 'Rejected' : 'Pending');
            applyStatus(next);

            if (lastUpdatedEl) lastUpdatedEl.textContent = new Date().toISOString().slice(0, 10);
            if (nextStepEl) {
                nextStepEl.textContent = next === 'Approved'
                    ? 'Wait for payout schedule'
                    : next === 'Rejected'
                        ? 'Review eligibility requirements'
                        : 'Upload missing documents';
            }

            if (activityBody) {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${today}</td><td>Status update</td><td>Changed to ${next} (demo)</td>`;
                activityBody.prepend(row);
            }
        });
    }
}

function initializeUserFeatures() {
    ensureUserNavItem();

    if (document.body.classList.contains('page-user-login')) {
        initUserLogin();
    }

    if (document.body.classList.contains('page-user-dashboard')) {
        requireUserAuth();
        bindUserDashboardActions();
    }
}

function getDemoApplicationsOpenSetting() {
    try {
        const raw = localStorage.getItem('cccspAdminSettings');
        if (!raw) return true;
        const parsed = JSON.parse(raw);
        if (typeof parsed.applicationsOpen === 'boolean') return parsed.applicationsOpen;
        return true;
    } catch {
        return true;
    }
}

function bindHomePageActions() {
    const statusPill = document.getElementById('homeApplicationsStatus');
    if (statusPill) {
        const open = getDemoApplicationsOpenSetting();
        const text = open ? statusPill.getAttribute('data-open-text') : statusPill.getAttribute('data-closed-text');
        const label = String(text || (open ? 'Applications open' : 'Applications currently closed'));
        const labelSpan = statusPill.querySelector('span');
        if (labelSpan) labelSpan.textContent = label;
        statusPill.classList.toggle('is-closed', !open);
    }

    const goStatusBtn = document.getElementById('homeGoStatus');
    const controlInput = document.getElementById('homeControlNumber');

    const navigateToStatus = () => {
        const value = String(controlInput?.value || '').trim();
        if (value) localStorage.setItem('cccspLastControlNumber', value);
        window.location.href = 'status.html';
    };

    if (goStatusBtn) {
        goStatusBtn.addEventListener('click', navigateToStatus);
    }

    if (controlInput) {
        controlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                navigateToStatus();
            }
        });
    }
}

function bindStatusPagePrefill() {
    const input = document.getElementById('statusSearch');
    if (!input) return;

    const saved = localStorage.getItem('cccspLastControlNumber');
    if (saved && !String(input.value || '').trim()) {
        input.value = saved;
    }
}

function initializeSiteFeatures() {
    initializeAdminFeatures();
    initializeUserFeatures();

    if (document.body.classList.contains('page-home')) {
        bindHomePageActions();
    }

    if (document.body.classList.contains('page-status')) {
        bindStatusPagePrefill();
    }
}

// Re-run initialization for existing DOMContentLoaded listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSiteFeatures);
} else {
    initializeSiteFeatures();
}
