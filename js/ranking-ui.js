/**
 * ============================================
 * 排行榜UI模块 (ranking-ui.js)
 * ============================================
 *
 * 功能：
 * 1. 渲染排行榜组件
 * 2. 切换不同排行榜类型
 * 3. 排行榜交互效果
 */

/**
 * 当前排行榜类型
 */
let currentRankingType = 'dishes';

/**
 * 渲染排行榜组件
 */
function renderRankingSidebar() {
    const sidebar = document.getElementById('rankingSidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `
        <div class="ranking-container">
            <div class="ranking-header">
                <h3 class="ranking-title">🏆 排行榜</h3>
                <div class="ranking-tabs">
                    <button class="ranking-tab active" data-type="dishes">热门菜品</button>
                    <button class="ranking-tab" data-type="restaurants">人气餐厅</button>
                    <button class="ranking-tab" data-type="stalls">好评档口</button>
                </div>
            </div>
            <div class="ranking-content" id="rankingContent">
                <!-- 排行榜内容将动态生成 -->
            </div>
            <div class="ranking-footer">
                <div class="today-recommend">
                    <h4>💡 今日推荐</h4>
                    <div id="todayRecommendContent"></div>
                </div>
            </div>
        </div>
    `;

    // 初始化排行榜内容
    updateRankingContent('dishes');

    // 初始化今日推荐
    renderTodayRecommend();

    // 绑定标签切换事件
    initRankingTabs();

    console.log('排行榜组件渲染完成');
}

/**
 * 更新排行榜内容
 * @param {string} type - 排行榜类型
 */
function updateRankingContent(type) {
    const content = document.getElementById('rankingContent');
    if (!content || !window.RankingData) return;

    let data;
    let html = '';

    switch (type) {
        case 'dishes':
            data = window.RankingData.hotDishesRanking;
            html = renderDishesRanking(data);
            break;
        case 'restaurants':
            data = window.RankingData.popularRestaurantsRanking;
            html = renderRestaurantsRanking(data);
            break;
        case 'stalls':
            data = window.RankingData.topStallsRanking;
            html = renderStallsRanking(data);
            break;
    }

    content.innerHTML = html;
}

/**
 * 渲染热门菜品排行
 * @param {Array} data - 菜品数据
 * @returns {string} HTML字符串
 */
function renderDishesRanking(data) {
    return data.map(item => `
        <div class="ranking-item" onclick="navigateToRestaurant('${getRestaurantId(item.restaurant)}')">
            <div class="ranking-badge ${getBadgeClass(item.rank)}">${item.rank}</div>
            <div class="ranking-info">
                <div class="ranking-name">
                    <span class="ranking-icon">${item.icon}</span>
                    ${item.name}
                </div>
                <div class="ranking-meta">
                    <span class="ranking-restaurant">${item.restaurant}</span>
                    <span class="rating">⭐ ${item.rating}</span>
                </div>
                <div class="ranking-stats">
                    <span class="sales">销量: ${item.sales}</span>
                    <span class="price">¥${item.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 渲染人气餐厅排行
 * @param {Array} data - 餐厅数据
 * @returns {string} HTML字符串
 */
function renderRestaurantsRanking(data) {
    return data.map(item => `
        <div class="ranking-item" onclick="navigateToRestaurant('${getRestaurantId(item.name)}')">
            <div class="ranking-badge ${getBadgeClass(item.rank)}">${item.rank}</div>
            <div class="ranking-info">
                <div class="ranking-name">
                    <span class="ranking-icon">${item.icon}</span>
                    ${item.name}
                </div>
                <div class="ranking-meta">
                    <span class="ranking-type">${item.type}</span>
                    <span class="rating">⭐ ${item.avgRating}</span>
                </div>
                <div class="ranking-stats">
                    <span class="visitors">访客: ${item.visitors}</span>
                    <span class="dishes">${item.dishes}道菜</span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 渲染好评档口排行
 * @param {Array} data - 档口数据
 * @returns {string} HTML字符串
 */
function renderStallsRanking(data) {
    return data.map(item => `
        <div class="ranking-item" onclick="navigateToRestaurant('${getRestaurantId(item.restaurant)}')">
            <div class="ranking-badge ${getBadgeClass(item.rank)}">${item.rank}</div>
            <div class="ranking-info">
                <div class="ranking-name">
                    <span class="ranking-icon">${item.icon}</span>
                    ${item.restaurant} - ${item.name}
                </div>
                <div class="ranking-meta">
                    <span class="specialty">特色: ${item.specialty}</span>
                    <span class="rating">⭐ ${item.rating}</span>
                </div>
                <div class="ranking-stats">
                    <span class="reviews">评价: ${item.reviews}条</span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 渲染今日推荐
 */
function renderTodayRecommend() {
    const container = document.getElementById('todayRecommendContent');
    if (!container || !window.RankingData) return;

    const data = window.RankingData.todayRecommendations;

    container.innerHTML = data.map(item => `
        <div class="recommend-item" onclick="navigateToRestaurant('${getRestaurantId(item.restaurant)}')">
            <span class="recommend-icon">${item.icon}</span>
            <div class="recommend-info">
                <div class="recommend-name">${item.name}</div>
                <div class="recommend-reason">${item.reason} ${item.discount !== '无' ? `<span class="discount">${item.discount}</span>` : ''}</div>
            </div>
        </div>
    `).join('');
}

/**
 * 初始化排行榜标签切换
 */
function initRankingTabs() {
    const tabs = document.querySelectorAll('.ranking-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有激活状态
            tabs.forEach(t => t.classList.remove('active'));
            // 添加当前激活状态
            this.classList.add('active');

            // 更新排行榜内容
            const type = this.getAttribute('data-type');
            updateRankingContent(type);
        });
    });
}

/**
 * 获取餐厅ID
 * @param {string} name - 餐厅名称
 * @returns {string} 餐厅ID
 */
function getRestaurantId(name) {
    const map = {
        '翰苑': 'chinese',
        '博苑': 'western',
        '慧苑': 'japanese',
        '湖苑': 'korean',
        '雅苑': 'dessert',
        '楠苑': 'cafe'
    };
    return map[name] || 'chinese';
}

/**
 * 获取徽章样式类
 * @param {number} rank - 排名
 * @returns {string} 样式类名
 */
function getBadgeClass(rank) {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return '';
}

/**
 * 切换排行榜显示/隐藏
 */
function toggleRankingSidebar() {
    const sidebar = document.getElementById('rankingSidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

/**
 * 初始化排行榜模块
 */
function initRankingModule() {
    document.addEventListener('DOMContentLoaded', function() {
        renderRankingSidebar();
        initToggleBtn();
        console.log('排行榜模块初始化完成');
    });
}

/**
 * 初始化切换按钮
 */
function initToggleBtn() {
    const toggleBtn = document.getElementById('rankingToggle');
    const sidebar = document.getElementById('rankingSidebar');

    if (toggleBtn && sidebar) {
        // 默认显示排行榜
        sidebar.classList.remove('collapsed');
        toggleBtn.classList.add('active');

        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            toggleBtn.classList.toggle('active');

            // 更新按钮提示文字
            const isCollapsed = sidebar.classList.contains('collapsed');
            toggleBtn.setAttribute('aria-label', isCollapsed ? '打开排行榜' : '关闭排行榜');
        });
    }
}

// 导出排行榜模块
if (typeof window !== 'undefined') {
    window.RankingModule = {
        renderRankingSidebar,
        updateRankingContent,
        toggleRankingSidebar,
        initRankingModule
    };
}

// 自动初始化
initRankingModule();
