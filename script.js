// 頁面導航功能
document.addEventListener('DOMContentLoaded', function() {
    // 獲取所有導航鏈接
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // 為每個導航鏈接添加點擊事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是外部連結（http或https開頭），直接跳轉，不阻止默認行為
            if (href.startsWith('http://') || href.startsWith('https://')) {
                return; // 讓瀏覽器處理外部連結
            }
            
            // 如果是內部頁面連結，阻止默認行為並處理頁面切換
            e.preventDefault();
            
            // 移除所有活動狀態
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // 添加活動狀態到當前鏈接
            this.classList.add('active');
            
            // 獲取目標頁面ID
            const targetId = href.substring(1);
            const targetPage = document.getElementById(targetId);
            
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });
    
    // 下拉菜單功能
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.parentElement;
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // 關閉其他打開的下拉菜單
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== menu) {
                    m.style.display = 'none';
                }
            });
            
            // 切換當前下拉菜單
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        });
    });
    
    // 點擊頁面其他地方關閉下拉菜單
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
    
    // 表單下載按鈕功能
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是PDF文件連結，直接下載，不阻止默認行為
            if (href && (href.endsWith('.pdf') || href.includes('pdf'))) {
                // 顯示下載提示
                const formName = this.closest('.rule-card, .form-item')?.querySelector('h3')?.textContent || '文件';
                showNotification(`正在下載 ${formName}...`, 'info');
                return; // 讓瀏覽器處理PDF下載
            }
            
            // 如果是其他類型的下載，阻止默認行為並顯示提示
            e.preventDefault();
            
            // 顯示下載提示
            const formName = this.closest('.form-item')?.querySelector('h3')?.textContent || '文件';
            showNotification(`正在下載 ${formName}...`, 'info');
            
            // 模擬下載延遲
            setTimeout(() => {
                showNotification(`${formName} 下載完成！`, 'success');
            }, 1500);
        });
    });
    
    // 新聞項目點擊效果
    const newsItems = document.querySelectorAll('.news-item');
    
    newsItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`正在載入 ${title} 詳細內容...`, 'info');
        });
    });
    
    // 校友卡片懸停效果
    const alumniCards = document.querySelectorAll('.alumni-card');
    
    alumniCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 組織成員卡片點擊效果
    const orgMembers = document.querySelectorAll('.org-member');
    
    orgMembers.forEach(member => {
        member.addEventListener('click', function() {
            const role = this.querySelector('h3').textContent;
            const name = this.querySelector('p').textContent;
            showNotification(`查看 ${role} ${name} 的詳細資訊`, 'info');
        });
    });
});

// 通知功能
function showNotification(message, type = 'info') {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // 添加樣式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // 添加動畫樣式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
    
    // 添加到頁面
    document.body.appendChild(notification);
    
    // 關閉按鈕功能
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // 自動關閉
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// 獲取通知圖標
function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

// 獲取通知顏色
function getNotificationColor(type) {
    const colors = {
        'info': '#667eea',
        'success': '#27ae60',
        'warning': '#f39c12',
        'error': '#e74c3c'
    };
    return colors[type] || '#667eea';
}

// 平滑滾動功能
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 頁面載入動畫
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 響應式導航功能
function toggleMobileNav() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
        mainContent.classList.toggle('mobile-push');
    }
}

// 監聽窗口大小變化
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-open');
        mainContent.classList.remove('mobile-push');
    }
});

// 添加移動端樣式
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .sidebar.mobile-open {
            transform: translateX(0);
        }
        
        .main-content.mobile-push {
            transform: translateX(280px);
        }
    }
`;
document.head.appendChild(mobileStyles);
