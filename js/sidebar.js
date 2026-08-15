// ==========================================
// GLOBAL UTILITIES
// ==========================================

// GLOBAL MODAL CLOSE FUNCTION WITH ANIMATION
window.closeAnyModal = (modalId, formId) => {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // 1. Trigger the CSS fade-out animation
  modal.classList.add('closing'); 

  // 2. Wait 200ms for the animation to finish, then clean up
  setTimeout(() => {
    modal.style.display = 'none'; 
    modal.classList.remove('closing'); 
    
    // Optional chaining (?.) safely attempts to reset the form if it exists
    if (formId) document.getElementById(formId)?.reset();
  }, 200);
};

// ==========================================
// SIDEBAR & ROUTING LOGIC
// ==========================================
(() => {
  
  // --- GLOBAL AUTHENTICATION GUARD & ROLE ROUTER ---
  const enforceLoginState = () => {
    const userStr = localStorage.getItem('currentUser'); 
    const isLoginPage = ['index.html', '/'].some(p => window.location.pathname.endsWith(p));
    
    // 1. Unauthenticated user trying to access secure pages
    if (!userStr && !isLoginPage) {
      return window.location.replace('index.html'); 
    } 
    
    // 2. Authenticated user sitting on the login page -> Route to portal
    if (userStr && isLoginPage) {
      const { role } = JSON.parse(userStr);
      
      // Modern Object-based routing (cleaner than if/else blocks)
      const routes = {
        'Faculty': 'faculty-portal.html',
        'SAO Staff': 'staff-portal.html'
      };
      
      window.location.replace(routes[role] || 'dashboard.html');
    }
  };

  // Run checks
  enforceLoginState();
  window.addEventListener('pageshow', (e) => e.persisted && enforceLoginState());

  // --- USER DATA & SIDEBAR INITIALIZATION ---
  
  // Safely parse user or fallback to empty object
  const { name: userName = "Guest User", role: userRole = "Unassigned" } = JSON.parse(localStorage.getItem('currentUser')) || {};

  // Modern way to get initials using .at(-1) to grab the last element
  const nameParts = userName.split(' ');
  const initials = nameParts.length > 1 
    ? `${nameParts[0][0]}${nameParts.at(-1)[0]}`.toUpperCase()
    : nameParts[0][0].toUpperCase();

  // Navigation configurations based on role
  let navLinks = '';
  let systemTag = 'ADMIN CONSOLE';

  switch (userRole) {
    case 'Faculty':
      systemTag = 'FACULTY PORTAL';
      navLinks = `
        <li class="group-label">Overview</li>
        <li><a href="faculty-portal.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg><span>My Portal</span></a></li>
      `;
      break;
      
    case 'SAO Staff':
      systemTag = 'STAFF PORTAL';
      navLinks = `
        <li class="group-label">Overview</li>
        <li><a href="staff-portal.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg><span>Staff Dashboard</span></a></li>
        <li class="group-label">Management</li>
        <li><a href="applications.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg><span>Review Applications</span></a></li>
        <li><a href="activities.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/><path d="m8.5 14 2 2 4.5-4.5"/></svg><span>Activities & Photos</span></a></li>
      `;
      break;
      
    default:
      systemTag = 'ADMIN CONSOLE';
      navLinks = `
        <li class="group-label">Overview</li>
        <li><a href="dashboard.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg><span>Dashboard</span></a></li>
        
        <li class="group-label">Management</li>
        <li><a href="accounts.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><path d="M16.5 5.2a3.5 3.5 0 0 1 0 6.6"/><path d="M21.5 20c0-3-1.9-5.5-4.5-6.3"/></svg><span>Manage Accounts</span></a></li>
        <li><a href="applications.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg><span>Applications</span></a></li>
        <li><a href="activities.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/><path d="m8.5 14 2 2 4.5-4.5"/></svg><span>Activities</span></a></li>
        <li><a href="announcements.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l4.5 4V5L6 9H4a1 1 0 0 0-1 1z"/><path d="M15 8.5a4 4 0 0 1 0 7"/><path d="M18.5 6a8 8 0 0 1 0 12"/></svg><span>Announcements</span></a></li>
        <li><a href="calendar.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v3M16 3v3"/></svg><span>Calendar</span></a></li>
        <li><a href="guidelines.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20"/></svg><span>Guidelines</span></a></li>
        <li><a href="reports.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg><span>Reports</span></a></li>
        
        <li class="group-label">System</li>
        <li><a href="documents.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg><span>Manage Documents</span></a></li>
        <li><a href="roles.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v6c0 5 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.5 7.5-9.5V6L12 3z"/><path d="m9 12 2 2 4-4"/></svg><span>User Roles</span></a></li>
        <li><a href="settings.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10c.1.7.6 1.3 1.6 1.6H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1z"/></svg><span>System Settings</span></a></li>
      `;

  }

  const sidebarHTML = `
    <aside class="sidebar">
      <div class="sidebar-brand" style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2px 16px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 12px;">
        <img src="images/sao-logo.png" alt="SVC Logo" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid white; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); object-fit: contain; background: white;">
        <div style="color: white; font-weight: 700; font-size: 40px; letter-spacing: 0.5px; margin-bottom: 16px;">SVCI</div>
        <div style="color: white; font-weight: 700; font-size: 15px; letter-spacing: 0.5px; margin-bottom: 16px;">SAO- Off Campus Activity System</div>
        
        <div style="color: #9ca3af; font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">Student Affairs Office</div>
        <div style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 12px; color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.5px;">${systemTag}</div>
      </div>
      <nav class="nav">
        <ul>
          ${navLinks}
          <li><a href="index.html" id="logout-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Log Out</span></a></li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <div class="avatar-sm">${initials}</div>
        <div class="who">
          <div class="name">${userName}</div>
          <div class="role">${userRole}</div>
        </div>
      </div>
    </aside>
  `;

  const placeholder = document.getElementById('sidebar-placeholder');
  if (placeholder) placeholder.innerHTML = sidebarHTML;
  else return console.warn("Sidebar placeholder missing!");
  
  const sidebarEl = document.querySelector('.sidebar');
  const pathName = window.location.pathname.split("/").pop() || "dashboard.html";
  let currentPage = pathName.endsWith('.html') ? pathName : `${pathName}.html`;
  
  // Highlight active link
  const updateActiveLink = (url) => {
    document.querySelectorAll('.nav a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === url);
    });
  };
  
  updateActiveLink(currentPage);

  // --- STANDARD NAVIGATION ROUTING ---
  // We removed the SPA fetch hack so the browser loads pages normally!
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = e.currentTarget.getAttribute('href');
      
      sidebarEl?.classList.remove('open'); // Mobile cleanup

      // Only hijack the click if it is the logout button
      if (e.currentTarget.id === 'logout-btn') {
          e.preventDefault(); 
          localStorage.removeItem('currentUser');
          return window.location.replace(targetUrl); 
      }
      
      // Otherwise, do nothing! The browser will follow the href link naturally.
    });
  });

})();
