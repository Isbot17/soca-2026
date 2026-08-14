(function() {
  // 1. Retrieve the logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // 2. Set fallbacks in case the user visits without an active session
  const userName = currentUser?.name || "Guest User";
  const userRole = currentUser?.role || "Unassigned";

  // 3. Automatically generate initials from the full name
  const nameParts = userName.split(' ');
  const initials = nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : nameParts[0][0].toUpperCase();

  // 4. TOPBAR INJECTION LOGIC
  const topbarActionsContainer = document.querySelector('.topbar-actions');
  
  if (topbarActionsContainer) {
    // You can dynamically fetch this count from your database later
    const notificationCount = "2"; 
    
    const badgeHTML = notificationCount !== "0" 
      ? `<span class="badge-dot">${notificationCount}</span>` 
      : `<span class="badge-dot" style="display: none;"></span>`;

    topbarActionsContainer.innerHTML = `
      <!-- FACEBOOK-STYLE NOTIFICATION DROPDOWN -->
      <div style="position: relative;">
        <button id="notif-btn" class="icon-btn" title="Notifications" style="cursor: pointer; outline: none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.7 21a2 2 0 0 1-3.4 0"/>
          </svg>
          ${badgeHTML}
        </button>

        <!-- Hidden Notifications Menu -->
        <div id="notif-dropdown" style="display: none; position: absolute; right: 0; top: calc(100% + 10px); background: #fff; border: 1px solid var(--border); border-radius: 8px; box-shadow: var(--shadow); width: 320px; z-index: 999; overflow: hidden;">
          
          <!-- Dropdown Header -->
          <div style="padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: var(--text);">Notifications</h3>
            <a href="notifications.html" style="font-size: 12px; color: var(--primary); font-weight: 600;">See All</a>
          </div>

          <!-- Notification List (Scrollable) -->
          <div style="max-height: 320px; overflow-y: auto;">
            
            <!-- Sample Unread Notification -->
            <a href="applications.html" class="dropdown-item" style="display: flex; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border); text-decoration: none; position: relative;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--warning-bg); color: var(--warning-text); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v5l3.5 2"/><circle cx="12" cy="12" r="9.5"/></svg>
              </div>
              <div style="padding-right: 15px;">
                <div style="font-size: 13px; color: var(--text); line-height: 1.4;"><b>Student Council</b> submitted a new application awaiting your review.</div>
                <div style="font-size: 11px; color: var(--primary); font-weight: 700; margin-top: 4px;">10 minutes ago</div>
              </div>
              <!-- Unread blue dot -->
              <div style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%; position: absolute; right: 16px; top: 50%; transform: translateY(-50%);"></div>
            </a>

            <!-- Sample Read Notification -->
            <a href="accounts.html" class="dropdown-item" style="display: flex; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border); text-decoration: none;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--info-bg); color: var(--info-text); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              </div>
              <div>
                <div style="font-size: 13px; color: var(--text); line-height: 1.4;">A new student account was successfully registered.</div>
                <div style="font-size: 11px; color: var(--text-sub); margin-top: 4px;">2 hours ago</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <!-- PROFILE DROPDOWN WRAPPER -->
      <div style="position: relative;">
        <button class="admin-chip" id="profile-btn" style="border: 1px solid var(--border); cursor: pointer; background: #fff; padding: 5px 12px 5px 5px; outline: none;">
          <div class="avatar-round">${initials}</div>
          <div style="text-align: left;">
            <div class="name-mini">${userName}</div>
            <div class="role-mini">${userRole}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        
        <!-- Hidden Profile Menu -->
        <div id="profile-dropdown" style="display: none; position: absolute; right: 0; top: calc(100% + 10px); background: #fff; border: 1px solid var(--border); border-radius: 8px; box-shadow: var(--shadow); width: 170px; z-index: 999; overflow: hidden;">
          <a href="settings.html" class="dropdown-item" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; font-size: 13px; font-weight: 600; color: var(--text); border-bottom: 1px solid var(--border);">
            <svg style="width: 16px; height: 16px; color: var(--text-sub);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10c.1.7.6 1.3 1.6 1.6H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1z"/></svg>
            Settings
          </a>
          <a href="#" id="topbar-logout" class="dropdown-item" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; font-size: 13px; font-weight: 600; color: var(--danger-text);">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </a>
        </div>
      </div>
    `;

    // 5. INTERACTIVE LOGIC
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    const logoutBtn = document.getElementById('topbar-logout');

    // Toggle Notifications
    notifBtn.addEventListener('click', function(e) {
      e.stopPropagation(); 
      profileDropdown.style.display = 'none'; // Close profile if open
      if (notifDropdown.style.display === 'none') {
        notifDropdown.style.display = 'block';
      } else {
        notifDropdown.style.display = 'none';
      }
    });

    // Toggle Profile Dropdown
    profileBtn.addEventListener('click', function(e) {
      e.stopPropagation(); 
      notifDropdown.style.display = 'none'; // Close notifs if open
      if (profileDropdown.style.display === 'none') {
        profileDropdown.style.display = 'block';
      } else {
        profileDropdown.style.display = 'none';
      }
    });

    // Close dropdowns if the user clicks anywhere else on the screen
    document.addEventListener('click', function() {
      profileDropdown.style.display = 'none';
      notifDropdown.style.display = 'none';
    });

    // Prevent closing when clicking INSIDE the notification dropdown box
    notifDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Add hover effect to all dropdown items (Notifs & Profile)
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('mouseenter', () => item.style.background = '#f8f9fc');
      item.addEventListener('mouseleave', () => item.style.background = 'transparent');
    });

    // Handle Log Out click
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.replace('index.html'); // Redirect to login
    });
  }
})();
