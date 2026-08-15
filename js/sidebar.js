document.addEventListener('DOMContentLoaded', () => {
    // 1. Get current user to determine role (Admin vs Faculty)
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return; // Allow individual pages to handle redirecting to login
    
    const user = JSON.parse(userStr);
    const role = user.role || 'Faculty'; // Default fallback

    let systemTag = '';
    let navLinks = '';

    // 2. Build the navigation links based on user role
    if (role === 'Administrator' || role === 'Admin') {
        systemTag = 'ADMIN CONSOLE';
        navLinks = `
            <li class="group-label">Overview</li>
            <li><a href="dashboard.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg><span>Dashboard</span></a></li>
            
            <li class="group-label">Management</li>
            <li><a href="accounts.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><path d="M16.5 5.2a3.5 3.5 0 0 1 0 6.6"/><path d="M21.5 20c0-3-1.9-5.5-4.5-6.3"/></svg><span>Manage Accounts</span></a></li>
            <li><a href="applications.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg><span>Applications</span></a></li>
            <li><a href="activities.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/><path d="m8.5 14 2 2 4.5-4.5"/></svg><span>Activities</span></a></li>
            <li><a href="announcements.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l4.5 4V5L6 9H4a1 1 0 0 0-1 1z"/><path d="M15 8.5a4 4 0 0 1 0 7"/><path d="M18.5 6a8 8 0 0 1 0 12"/></svg><span>Announcements</span></a></li>
            <li><a href="calendar.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/></svg><span>Calendar</span></a></li>
            <li><a href="guidelines.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20"/></svg><span>Guidelines</span></a></li>
            <li><a href="reports.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg><span>Reports</span></a></li>
            
            <li class="group-label">System</li>
            <li><a href="documents.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg><span>Manage Documents</span></a></li>
            <li><a href="roles.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v6c0 5 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.5 7.5-9.5V6L12 3z"/><path d="m9 12 2 2 4-4"/></svg><span>User Roles</span></a></li>
            <li><a href="settings.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10c.1.7.6 1.3 1.6 1.6H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1z"/></svg><span>System Settings</span></a></li>
        `;
    } else {
        systemTag = 'FACULTY PORTAL';
        navLinks = `
            <li class="group-label">Overview</li>
            <li><a href="faculty-portal.html" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg><span>New Application</span></a></li>
        `;
    }

    // 3. Inject HTML into the placeholder
    const sidebarHTML = `
        <aside class="sidebar">
            <div class="brand">
                <div class="brand-logo">
                    <!-- Adjusted path to ensure it loads from the root -->
                    <img src="/images/svc-logo.jpg" alt="SVCI Logo" onerror="this.src='images/svc-logo.jpg'">
                </div>
                <div class="brand-text">
                    <div class="brand-title">STUDENT AFFAIRS OFFICE</div>
                    <div class="brand-tag">${systemTag}</div>
                </div>
            </div>
            <nav class="nav-menu">
                <ul class="nav-list">
                    ${navLinks}
                    
                    <li class="group-label" style="margin-top: 20px;"></li>
                    <li><a href="#" id="logout-btn" class="nav-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Log Out</span></a></li>
                </ul>
            </nav>
        </aside>
    `;

    const placeholder = document.getElementById('sidebar-placeholder');
    if (placeholder) {
        placeholder.innerHTML = sidebarHTML;
    }

    // 4. Highlight the Active Page dynamically
    // This finds out which page you are currently on and highlights the matching button
    const currentPath = window.location.pathname.split('/').pop();
    const currentPage = currentPath === '' ? 'dashboard.html' : currentPath;

    document.querySelectorAll('.nav-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active'); // Applies your CSS active class
            link.style.background = 'rgba(255, 255, 255, 0.1)';
            link.style.color = '#ffffff';
        }
    });

    // 5. Handle Logout securely
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html'; // Redirect to login
        });
    }
});
