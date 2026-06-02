/**
 * ============================================
 * 餐厅页面功能模块 (restaurant.js)
 * ============================================
 *
 * 功能模块：
 * 1. 餐厅数据渲染
 * 2. 档口展开/收起
 * 3. 菜品详情模态框
 * 4. 楼层筛选功能
 * 5. 图片懒加载
 */

/**
 * ----------------------------------------
 * 1. 餐厅数据渲染
 * ----------------------------------------
 */

/**
 * 渲染单个餐厅内容
 * @param {Object} restaurantData - 餐厅数据对象
 * @param {string} containerId - 容器元素ID
 */
function renderRestaurant(restaurantData, containerId = 'restaurantContainer') {
    const container = document.getElementById(containerId);

    if (!container || !restaurantData) {
        console.error('无法找到容器或数据');
        return;
    }

    let html = `
        <section class="restaurant-section" data-restaurant="${restaurantData.id}">
            <div class="restaurant-header">
                <h2 class="restaurant-title">
                    <span class="restaurant-icon">${restaurantData.icon}</span>
                    ${restaurantData.name}
                </h2>
                <p class="restaurant-desc">${restaurantData.desc}</p>
                <p class="restaurant-stats">共 ${restaurantData.stalls.length} 个档口，${restaurantData.stalls.length * 10} 道菜品</p>
            </div>
    `;

    // 遍历所有档口
    restaurantData.stalls.forEach(function(stall) {
        html += `
            <div class="stall-section">
                <h3 class="stall-title">
                    <span>${stall.name}</span>
                    <span class="stall-toggle-icon">▼</span>
                </h3>
                <div class="dishes-grid">
        `;

        // 遍历档口的所有菜品
        stall.dishes.forEach(function(dish) {
            html += `
                <article class="dish-card">
                    <div class="dish-info">
                        <h4 class="dish-name">${dish.name}</h4>
                        <p class="dish-desc">${dish.desc}</p>
                        <span class="dish-price">¥${dish.price}</span>
                    </div>
                </article>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `</section>`;

    container.innerHTML = html;

    // 渲染完成后初始化交互
    initStallToggle();
    initDishModal();

    console.log('餐厅数据渲染完成：', restaurantData.name);
}

/**
 * ----------------------------------------
 * 2. 档口展开/收起功能
 * ----------------------------------------
 */

/**
 * 初始化档口展开/收起
 */
function initStallToggle() {
    const stallTitles = document.querySelectorAll('.stall-title');

    stallTitles.forEach(function(title) {
        title.addEventListener('click', function() {
            this.classList.toggle('active');

            const dishesGrid = this.nextElementSibling;
            if (dishesGrid && dishesGrid.classList.contains('dishes-grid')) {
                dishesGrid.classList.toggle('active');
            }
        });
    });

    console.log('档口交互初始化完成');
}

/**
 * ----------------------------------------
 * 3. 菜品详情模态框
 * ----------------------------------------
 */

/**
 * 初始化菜品详情模态框
 */
function initDishModal() {
    const dishCards = document.querySelectorAll('.dish-card');

    dishCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const dishName = this.querySelector('.dish-name').textContent;
            const dishDesc = this.querySelector('.dish-desc').textContent;
            const dishPrice = this.querySelector('.dish-price').textContent;

            showDishDetail({
                name: dishName,
                desc: dishDesc,
                price: dishPrice
            });
        });
    });

    // 初始化模态框关闭功能
    const modal = document.getElementById('dishModal');
    const modalClose = modal ? modal.querySelector('.modal-close') : null;

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeDishModal();
        });
    }

    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeDishModal();
            }
        });
    }

    // ESC键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            closeDishModal();
        }
    });

    console.log('菜品模态框初始化完成');
}

/**
 * 显示菜品详情
 * @param {Object} dish - 菜品对象
 */
function showDishDetail(dish) {
    const modal = document.getElementById('dishModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');

    if (modalImage) modalImage.style.display = 'none';
    if (modalTitle) modalTitle.textContent = dish.name;
    if (modalDesc) modalDesc.textContent = dish.desc;
    if (modalPrice) modalPrice.textContent = dish.price;

    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 关闭菜品详情模态框
 */
function closeDishModal() {
    const modal = document.getElementById('dishModal');

    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * ----------------------------------------
 * 4. 楼层筛选功能
 * ----------------------------------------
 */

/**
 * 筛选指定楼层的档口
 * @param {number} floor - 楼层号（1-3）
 */
function filterByFloor(floor) {
    const stallSections = document.querySelectorAll('.stall-section');

    // 楼层对应的档口范围
    const floorRanges = {
        1: { start: 1, end: 12 },
        2: { start: 13, end: 24 },
        3: { start: 25, end: 35 }
    };

    const range = floorRanges[floor];

    if (!range) {
        // 显示所有档口
        stallSections.forEach(function(section) {
            section.style.display = 'block';
        });
        return;
    }

    // 筛选显示对应楼层的档口
    stallSections.forEach(function(section, index) {
        const stallNumber = index + 1;

        if (stallNumber >= range.start && stallNumber <= range.end) {
            section.style.display = 'block';
            section.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            section.style.display = 'none';
        }
    });

    // 滚动到第一个可见档口
    const firstVisibleStall = document.querySelector('.stall-section[style*="display: block"]');
    if (firstVisibleStall) {
        const header = document.querySelector('.header');
        const navHeight = header ? header.offsetHeight : 0;
        const scrollPosition = firstVisibleStall.offsetTop - navHeight - 20;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }

    console.log(`楼层筛选完成：${floor}楼`);
}

/**
 * 初始化楼层筛选
 */
function initFloorFilter() {
    const dropdownLinks = document.querySelectorAll('.dropdown-link');

    dropdownLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const floor = parseInt(this.getAttribute('data-floor'));
            filterByFloor(floor);
        });
    });

    console.log('楼层筛选初始化完成');
}

/**
 * ----------------------------------------
 * 5. 图片懒加载
 * ----------------------------------------
 */

/**
 * 初始化图片懒加载
 */
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        const dishImages = document.querySelectorAll('.dish-image');
        dishImages.forEach(function(img) {
            imageObserver.observe(img);
        });

        console.log('图片懒加载初始化完成');
    }
}

/**
 * ----------------------------------------
 * 6. 页面加载动画
 * ----------------------------------------
 */

/**
 * 初始化页面加载动画
 */
function initPageAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });

    console.log('页面动画初始化完成');
}

/**
 * ----------------------------------------
 * 7. 初始化餐厅页面模块
 * ----------------------------------------
 */
function initRestaurantModule() {
    document.addEventListener('DOMContentLoaded', function() {
        initStallToggle();
        initDishModal();
        initFloorFilter();
        initLazyLoad();
        initPageAnimation();

        console.log('餐厅页面模块初始化完成');
    });
}

// 导出餐厅页面模块
if (typeof window !== 'undefined') {
    window.RestaurantModule = {
        renderRestaurant,
        initStallToggle,
        initDishModal,
        showDishDetail,
        closeDishModal,
        filterByFloor,
        initFloorFilter,
        initLazyLoad,
        initPageAnimation,
        initRestaurantModule
    };
}

// 自动初始化
initRestaurantModule();
