/**
 * ============================================
 * 美食天堂网站 - JavaScript交互功能
 * ============================================
 * 
 * 功能模块：
 * 0. 动态生成餐厅和菜品（35个档口 × 10道菜）
 * 1. 移动端导航菜单切换
 * 2. 餐厅筛选功能
 * 3. 菜品详情模态框
 * 4. 平滑滚动
 * 5. 页面加载动画
 */

/**
 * ============================================
 * DOM元素获取
 * ============================================
 * 在页面加载完成后获取需要操作的DOM元素
 */

// 等待DOM完全加载后再执行代码
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * ----------------------------------------
     * 0. 动态生成餐厅和菜品
     * ----------------------------------------
     * - 使用restaurant-data.js中的数据
     * - 动态生成所有餐厅、档口和菜品
     * - 每个餐厅35个档口，每个档口10道菜
     * - 总计：6 × 35 × 10 = 2100道菜
     */
    
    // 生成所有餐厅数据
    const allRestaurantsData = generateAllRestaurantsData();
    
    // 获取容器
    const restaurantsContainer = document.getElementById('restaurantsContainer');
    
    /**
     * 动态生成餐厅HTML
     * - 遍历所有餐厅
     * - 为每个餐厅生成档口和菜品
     */
    function renderRestaurants() {
        if (!restaurantsContainer || !allRestaurantsData) {
            console.error('无法找到容器或数据');
            return;
        }
        
        let html = '';
        
        // 遍历所有餐厅
        Object.values(allRestaurantsData).forEach(function(restaurant) {
            html += `
                <section class="restaurant-section" data-restaurant="${restaurant.id}">
                    <div class="restaurant-header">
                        <h2 class="restaurant-title">
                            <span class="restaurant-icon">${restaurant.icon}</span>
                            ${restaurant.name}
                        </h2>
                        <p class="restaurant-desc">${restaurant.desc}</p>
                        <p class="restaurant-stats">共 ${restaurant.stalls.length} 个档口，${restaurant.stalls.length * 10} 道菜品</p>
                    </div>
            `;
            
            // 遍历所有档口
            restaurant.stalls.forEach(function(stall) {
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
        });
        
        // 插入HTML
        restaurantsContainer.innerHTML = html;
        
        // 渲染完成后初始化菜品卡片事件
        initDishCards();
        
        console.log('餐厅数据渲染完成：', Object.keys(allRestaurantsData).length, '个餐厅');
    }
    
    /**
     * 初始化菜品卡片事件
     * - 为动态生成的菜品卡片添加点击事件
     * - 为档口标题添加展开/收起功能
     */
    function initDishCards() {
        // 初始化档口展开/收起功能
        const stallTitles = document.querySelectorAll('.stall-title');

        stallTitles.forEach(function(title) {
            title.addEventListener('click', function() {
                // 切换激活状态
                this.classList.toggle('active');

                // 找到对应的菜品网格
                const dishesGrid = this.nextElementSibling;
                if (dishesGrid && dishesGrid.classList.contains('dishes-grid')) {
                    dishesGrid.classList.toggle('active');
                }
            });
        });

        // 为菜品卡片添加点击事件
        const dishCards = document.querySelectorAll('.dish-card');

        dishCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const btn = this.querySelector('.dish-btn');
                if (btn) {
                    btn.click();
                }
            });
        });

        // 为"查看详情"按钮添加事件
        const detailButtons = document.querySelectorAll('.dish-btn');

        detailButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                event.stopPropagation();

                const dishCard = this.closest('.dish-card');
                const dishName = dishCard.querySelector('.dish-name').textContent;
                const dishDesc = dishCard.querySelector('.dish-desc').textContent;
                const dishPrice = dishCard.querySelector('.dish-price').textContent;

                // 填充模态框内容（不显示图片）
                const modalImage = document.getElementById('modalImage');
                if (modalImage) {
                    modalImage.style.display = 'none';
                }
                document.getElementById('modalTitle').textContent = dishName;
                document.getElementById('modalDesc').textContent = dishDesc;
                document.getElementById('modalPrice').textContent = dishPrice;

                // 显示模态框
                const modal = document.getElementById('dishModal');
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    // 执行渲染
    renderRestaurants();
    
    /**
     * ----------------------------------------
     * 1. 移动端导航菜单切换功能
     * ----------------------------------------
     * - 点击汉堡菜单按钮显示/隐藏导航菜单
     * - 点击导航链接后自动关闭菜单
     */
    
    // 获取汉堡菜单按钮
    const menuToggle = document.querySelector('.menu-toggle');
    // 获取导航菜单
    const nav = document.querySelector('.nav');
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    
    /**
     * 汉堡菜单点击事件处理
     * - 切换导航菜单的显示/隐藏状态
     * - 切换汉堡菜单图标的动画状态
     */
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            // 切换导航菜单的active类
            nav.classList.toggle('active');
            // 切换按钮的active类（用于动画）
            menuToggle.classList.toggle('active');
        });
    }
    
    /**
     * 导航链接点击事件处理
     * - 在移动端点击链接后关闭菜单
     * - 更新当前激活的导航项
     */
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 阻止默认跳转行为
            event.preventDefault();

            // 移除所有导航链接的active类
            navLinks.forEach(function(item) {
                item.classList.remove('active');
            });

            // 为当前点击的链接添加active类
            this.classList.add('active');

            // 在移动端关闭导航菜单
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }

            // 获取要筛选的餐厅类型
            const restaurantType = this.getAttribute('data-restaurant');

            // 调用筛选函数
            filterRestaurants(restaurantType);
        });
    });

    /**
     * 下拉菜单链接点击事件处理
     * - 处理楼层选择
     * - 滚动到对应楼层
     */
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // 阻止默认跳转行为
            event.preventDefault();

            // 获取餐厅类型和楼层
            const restaurantType = this.getAttribute('data-restaurant');
            const floor = this.getAttribute('data-floor');

            // 筛选显示对应餐厅
            filterRestaurants(restaurantType);

            // 计算档口范围（每层约12个档口）
            // 一楼：档口1-12，二楼：档口13-24，三楼：档口25-35
            const stallRanges = {
                '1': { start: 1, end: 12 },
                '2': { start: 13, end: 24 },
                '3': { start: 25, end: 35 }
            };

            const range = stallRanges[floor];
            const targetStall = Math.floor((range.start + range.end) / 2); // 滚动到中间档口

            // 延迟滚动，等待筛选完成
            setTimeout(function() {
                const stallSection = document.querySelector(
                    `[data-restaurant="${restaurantType}"] .stall-section:nth-child(${targetStall})`
                );

                if (stallSection) {
                    const navHeight = document.querySelector('.header').offsetHeight;
                    const scrollPosition = stallSection.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    });
    
    /**
     * ----------------------------------------
     * 2. 餐厅筛选功能
     * ----------------------------------------
     * - 根据导航选择显示对应餐厅的菜品
     * - "全部餐厅"显示所有内容
     */
    
    /**
     * 筛选餐厅函数
     * @param {string} type - 餐厅类型标识
     *                        'all' 表示显示全部
     *                        其他值对应具体餐厅
     */
    function filterRestaurants(type) {
        // 获取所有餐厅区域
        const restaurantSections = document.querySelectorAll('.restaurant-section');
        
        // 遍历所有餐厅区域
        restaurantSections.forEach(function(section) {
            // 获取当前餐厅的类型
            const sectionType = section.getAttribute('data-restaurant');
            
            if (type === 'all') {
                // 如果选择"全部餐厅"，显示所有餐厅
                section.style.display = 'block';
                // 添加淡入动画
                section.style.animation = 'fadeIn 0.5s ease-out';
            } else if (sectionType === type) {
                // 如果匹配选中的餐厅类型，显示该餐厅
                section.style.display = 'block';
                section.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                // 否则隐藏该餐厅
                section.style.display = 'none';
            }
        });
        
        // 滚动到内容区域
        const mainContent = document.getElementById('restaurants');
        if (mainContent) {
            // 计算滚动位置（考虑固定导航栏高度）
            const navHeight = document.querySelector('.header').offsetHeight;
            const scrollPosition = mainContent.offsetTop - navHeight - 20;
            
            // 平滑滚动到内容区域
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * ----------------------------------------
     * 3. 菜品详情模态框功能
     * ----------------------------------------
     * - 点击"查看详情"按钮显示模态框
     * - 模态框显示菜品的详细信息
     * - 点击关闭按钮或遮罩层关闭模态框
     */
    
    // 获取模态框元素
    const modal = document.getElementById('dishModal');
    // 获取模态框关闭按钮
    const modalClose = document.querySelector('.modal-close');
    // 获取所有"查看详情"按钮
    const detailButtons = document.querySelectorAll('.dish-btn');
    
    /**
     * 为每个"查看详情"按钮添加点击事件
     * - 获取菜品信息
     * - 填充到模态框中
     * - 显示模态框
     */
    detailButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // 阻止事件冒泡，避免触发卡片点击事件
            event.stopPropagation();
            
            // 获取菜品卡片元素
            const dishCard = this.closest('.dish-card');
            
            // 从菜品卡片中提取信息
            const dishImage = dishCard.querySelector('.dish-image').src;
            const dishName = dishCard.querySelector('.dish-name').textContent;
            const dishDesc = dishCard.querySelector('.dish-desc').textContent;
            const dishPrice = dishCard.querySelector('.dish-price').textContent;
            
            // 填充模态框内容
            document.getElementById('modalImage').src = dishImage;
            document.getElementById('modalTitle').textContent = dishName;
            document.getElementById('modalDesc').textContent = dishDesc;
            document.getElementById('modalPrice').textContent = dishPrice;
            
            // 显示模态框
            modal.style.display = 'flex';
            
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    /**
     * 模态框关闭按钮点击事件
     */
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }
    
    /**
     * 模态框外部点击关闭
     * - 点击遮罩层（非内容区域）关闭模态框
     */
    if (modal) {
        modal.addEventListener('click', function(event) {
            // 只有点击模态框背景时才关闭
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    /**
     * 关闭模态框函数
     * - 隐藏模态框
     * - 恢复页面滚动
     */
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            // 恢复页面滚动
            document.body.style.overflow = 'auto';
        }
    }
    
    /**
     * 键盘事件处理
     * - 按ESC键关闭模态框
     */
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            closeModal();
        }
    });
    
    /**
     * ----------------------------------------
     * 4. 菜品卡片点击事件
     * ----------------------------------------
     * - 点击整个卡片也可以查看详情
     */
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // 模拟点击卡片内的"查看详情"按钮
            const btn = this.querySelector('.dish-btn');
            if (btn) {
                btn.click();
            }
        });
    });
    
    /**
     * ----------------------------------------
     * 5. Hero按钮平滑滚动
     * ----------------------------------------
     * - 点击Hero区域的"开始探索"按钮
     * - 平滑滚动到餐厅内容区域
     */
    const heroBtn = document.querySelector('.hero-btn');
    
    if (heroBtn) {
        heroBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 计算滚动位置
                const navHeight = document.querySelector('.header').offsetHeight;
                const scrollPosition = targetElement.offsetTop - navHeight - 20;
                
                // 平滑滚动
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    /**
     * ----------------------------------------
     * 6. 页面滚动时导航栏效果
     * ----------------------------------------
     * - 滚动时为导航栏添加阴影效果
     */
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            // 滚动超过50px时，增加导航栏阴影
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            // 回到顶部时，恢复原阴影
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    /**
     * ----------------------------------------
     * 7. 图片懒加载功能（可选优化）
     * ----------------------------------------
     * - 使用Intersection Observer API
     * - 图片进入视口时才加载
     */
    
    // 检查浏览器是否支持Intersection Observer
    if ('IntersectionObserver' in window) {
        // 创建观察器
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                // 当图片进入视口
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 如果有data-src属性，将其值赋给src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        // 移除观察
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            // 图片进入视口50%时触发
            threshold: 0.5
        });
        
        // 观察所有菜品图片
        const dishImages = document.querySelectorAll('.dish-image');
        dishImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    /**
     * ----------------------------------------
     * 8. 页面加载完成动画
     * ----------------------------------------
     * - 为页面元素添加入场动画
     */
    
    // 为餐厅区域添加滚动动画
    const restaurantSections = document.querySelectorAll('.restaurant-section');
    
    // 创建滚动观察器
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // 添加淡入动画类
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 观察每个餐厅区域
    restaurantSections.forEach(function(section) {
        sectionObserver.observe(section);
    });
    
    /**
     * ----------------------------------------
     * 9. 控制台欢迎信息
     * ----------------------------------------
     * - 在开发者工具中显示欢迎信息
     */
    console.log('%c欢迎来到美食天堂！', 'color: #c41e3a; font-size: 24px; font-weight: bold;');
    console.log('%c探索六大特色餐厅，品尝精选美食！', 'color: #d4a574; font-size: 16px;');
    console.log('%c如有问题或建议，请联系我们：contact@foodparadise.com', 'color: #666; font-size: 12px;');
    
    /**
     * ----------------------------------------
     * 10. 幸运转盘抽取功能（双转盘：东校和西校）
     * ----------------------------------------
     * - 东校转盘：翰苑、博苑、慧苑
     * - 西校转盘：湖苑、雅苑、楠苑
     * - 点击转盘中心按钮开始旋转
     * - 随机抽取餐厅或菜品
     * - 显示抽取结果
     */

    // 东校转盘相关DOM元素
    const eastWheel = document.getElementById('eastWheel');
    const eastWheelCenter = eastWheel ? eastWheel.querySelector('.wheel-center') : null;
    const eastWheelInner = eastWheel ? eastWheel.querySelector('.wheel-inner') : null;
    const eastWheelResult = document.getElementById('eastWheelResult');
    const eastViewDishBtn = document.getElementById('eastViewDishBtn');

    // 西校转盘相关DOM元素
    const westWheel = document.getElementById('westWheel');
    const westWheelCenter = westWheel ? westWheel.querySelector('.wheel-center') : null;
    const westWheelInner = westWheel ? westWheel.querySelector('.wheel-inner') : null;
    const westWheelResult = document.getElementById('westWheelResult');
    const westViewDishBtn = document.getElementById('westViewDishBtn');

    // 转盘状态变量
    let isEastSpinning = false; // 东校转盘是否正在旋转
    let isWestSpinning = false; // 西校转盘是否正在旋转
    let eastCurrentRotation = 0; // 东校转盘当前旋转角度
    let westCurrentRotation = 0; // 西校转盘当前旋转角度
    let lastSpinnedWheel = 'east'; // 记录上次旋转的转盘（east或west）

    /**
     * 餐厅数据配置
     * - 东校餐厅：翰苑、博苑、慧苑
     * - 西校餐厅：湖苑、雅苑、楠苑
     */
    const eastRestaurants = [
        {
            name: '翰苑',
            icon: '🥢',
            id: 'chinese',
            dishes: ['宫保鸡丁', '红烧肉', '清蒸鲈鱼', '麻婆豆腐']
        },
        {
            name: '博苑',
            icon: '🍝',
            id: 'western',
            dishes: ['澳洲菲力牛排', '奶油培根意面', '凯撒沙拉', '玛格丽特披萨']
        },
        {
            name: '慧苑',
            icon: '🍣',
            id: 'japanese',
            dishes: ['精选寿司拼盘', '豚骨拉面', '天妇罗', '蒲烧鳗鱼']
        }
    ];

    const westRestaurants = [
        {
            name: '湖苑',
            icon: '🍖',
            id: 'korean',
            dishes: ['韩式烤牛肉', '韩式五花肉', '石锅拌饭', '部队锅']
        },
        {
            name: '雅苑',
            icon: '🍰',
            id: 'dessert',
            dishes: ['提拉米苏', '纽约芝士蛋糕', '巧克力熔岩蛋糕', '法式水果塔']
        },
        {
            name: '楠苑',
            icon: '☕',
            id: 'cafe',
            dishes: ['香草拿铁', '卡布奇诺', '冰美式咖啡', '抹茶拿铁']
        }
    ];

    /**
     * 初始化东校转盘扇区
     * - 动态生成转盘上的餐厅名称
     * - 每个扇区占据120度（360度/3个餐厅）
     */
    function initEastWheel() {
        if (!eastWheelInner) return;

        // 清空现有内容
        eastWheelInner.innerHTML = '';

        // 为每个餐厅创建扇区
        eastRestaurants.forEach(function(restaurant, index) {
            // 创建扇区元素
            const sector = document.createElement('div');
            sector.className = 'wheel-sector';

            // 计算扇区旋转角度
            // 每个扇区120度，从顶部开始，偏移60度使文字居中
            const rotation = index * 120 + 60;
            sector.style.transform = `rotate(${rotation}deg)`;

            // 设置扇区内容
            sector.innerHTML = `<span>${restaurant.icon} ${restaurant.name}</span>`;

            // 添加到转盘
            eastWheelInner.appendChild(sector);
        });
    }

    /**
     * 初始化西校转盘扇区
     * - 动态生成转盘上的餐厅名称
     * - 每个扇区占据120度（360度/3个餐厅）
     */
    function initWestWheel() {
        if (!westWheelInner) return;

        // 清空现有内容
        westWheelInner.innerHTML = '';

        // 为每个餐厅创建扇区
        westRestaurants.forEach(function(restaurant, index) {
            // 创建扇区元素
            const sector = document.createElement('div');
            sector.className = 'wheel-sector';

            // 计算扇区旋转角度
            // 每个扇区120度，从顶部开始，偏移60度使文字居中
            const rotation = index * 120 + 60;
            sector.style.transform = `rotate(${rotation}deg)`;

            // 设置扇区内容
            sector.innerHTML = `<span>${restaurant.icon} ${restaurant.name}</span>`;

            // 添加到转盘
            westWheelInner.appendChild(sector);
        });
    }

    // 初始化转盘
    initEastWheel();
    initWestWheel();
    
    /**
     * 东校转盘旋转函数
     * - 计算随机旋转角度
     * - 应用旋转动画
     * - 返回抽中的餐厅索引
     * @returns {number} - 抽中的餐厅索引
     */
    function spinEastWheel() {
        // 如果正在旋转，直接返回
        if (isEastSpinning) return;

        // 设置旋转状态
        isEastSpinning = true;
        lastSpinnedWheel = 'east'; // 记录当前旋转的转盘

        // 计算随机角度
        // 基础旋转：至少旋转5圈（1800度）
        // 随机角度：0-360度之间的随机值
        const baseRotation = 1800; // 5圈
        const randomAngle = Math.random() * 360;
        const totalRotation = eastCurrentRotation + baseRotation + randomAngle;

        // 应用旋转
        if (eastWheel) {
            eastWheel.style.transform = `rotate(${totalRotation}deg)`;
        }

        // 更新当前旋转角度
        eastCurrentRotation = totalRotation;

        // 计算抽中的餐厅索引
        // 指针在顶部（0度位置），需要计算转盘停止后哪个扇区在顶部
        // 由于转盘顺时针旋转，需要用360减去实际角度
        // 每个扇区120度（3个餐厅）
        const normalizedAngle = (360 - (totalRotation % 360)) % 360;
        const selectedIndex = Math.floor(normalizedAngle / 120);

        // 4秒后（动画结束）显示结果
        setTimeout(function() {
            isEastSpinning = false;
            showEastResult(selectedIndex);
        }, 4000);

        return selectedIndex;
    }

    /**
     * 西校转盘旋转函数
     * - 计算随机旋转角度
     * - 应用旋转动画
     * - 返回抽中的餐厅索引
     * @returns {number} - 抽中的餐厅索引
     */
    function spinWestWheel() {
        // 如果正在旋转，直接返回
        if (isWestSpinning) return;

        // 设置旋转状态
        isWestSpinning = true;
        lastSpinnedWheel = 'west'; // 记录当前旋转的转盘

        // 计算随机角度
        // 基础旋转：至少旋转5圈（1800度）
        // 随机角度：0-360度之间的随机值
        const baseRotation = 1800; // 5圈
        const randomAngle = Math.random() * 360;
        const totalRotation = westCurrentRotation + baseRotation + randomAngle;

        // 应用旋转
        if (westWheel) {
            westWheel.style.transform = `rotate(${totalRotation}deg)`;
        }

        // 更新当前旋转角度
        westCurrentRotation = totalRotation;

        // 计算抽中的餐厅索引
        // 指针在顶部（0度位置），需要计算转盘停止后哪个扇区在顶部
        // 由于转盘顺时针旋转，需要用360减去实际角度
        // 每个扇区120度（3个餐厅）
        const normalizedAngle = (360 - (totalRotation % 360)) % 360;
        const selectedIndex = Math.floor(normalizedAngle / 120);

        // 4秒后（动画结束）显示结果
        setTimeout(function() {
            isWestSpinning = false;
            showWestResult(selectedIndex);
        }, 4000);

        return selectedIndex;
    }

    /**
     * 显示东校抽取结果
     * @param {number} restaurantIndex - 餐厅索引
     */
    function showEastResult(restaurantIndex) {
        // 获取抽中的餐厅
        const selectedRestaurant = eastRestaurants[restaurantIndex];

        // 获取抽取模式（餐厅、档口或菜品）
        const wheelMode = document.querySelector('input[name="wheelMode"]:checked');
        const mode = wheelMode ? wheelMode.value : 'restaurant';

        // 随机选择一道菜品
        const randomDishIndex = Math.floor(Math.random() * selectedRestaurant.dishes.length);
        const selectedDish = selectedRestaurant.dishes[randomDishIndex];

        // 随机选择一个档口（1-35）
        const randomStallIndex = Math.floor(Math.random() * 35) + 1;
        const selectedStall = `档口${randomStallIndex}`;

        // 获取结果展示元素
        const resultTitle = eastWheelResult.querySelector('.result-title');
        const resultRestaurant = eastWheelResult.querySelector('.result-restaurant');
        const resultDish = eastWheelResult.querySelector('.result-dish');
        const resultCelebration = eastWheelResult.querySelector('.result-celebration');

        // 更新结果内容
        if (resultCelebration) {
            resultCelebration.textContent = '🎊';
        }

        if (resultTitle) {
            resultTitle.textContent = '恭喜您抽中了';
        }

        if (resultRestaurant) {
            resultRestaurant.textContent = `${selectedRestaurant.icon} ${selectedRestaurant.name}`;
        }

        // 根据模式显示不同内容
        if (mode === 'dish') {
            if (resultDish) {
                resultDish.textContent = `推荐菜品：${selectedDish}`;
            }

            // 显示菜品特写模态框
            setTimeout(function() {
                showFeaturedDish(selectedRestaurant, selectedDish);
            }, 500);
        } else if (mode === 'stall') {
            if (resultDish) {
                resultDish.textContent = `推荐档口：${selectedStall}`;
            }
        } else {
            if (resultDish) {
                resultDish.textContent = '快去探索美味吧！';
            }
        }

        // 显示"查看菜品"按钮
        if (eastViewDishBtn) {
            eastViewDishBtn.classList.remove('hidden');

            // 为按钮添加点击事件，跳转到对应餐厅
            eastViewDishBtn.onclick = function() {
                // 筛选显示对应餐厅
                filterRestaurants(selectedRestaurant.id);

                // 滚动到餐厅区域
                const restaurantsSection = document.getElementById('restaurants');
                if (restaurantsSection) {
                    const navHeight = document.querySelector('.header').offsetHeight;
                    let scrollPosition = restaurantsSection.offsetTop - navHeight - 20;

                    // 如果是档口模式，滚动到具体档口
                    if (mode === 'stall') {
                        const stallSection = document.querySelector(`[data-restaurant="${selectedRestaurant.id}"] .stall-section:nth-child(${randomStallIndex + 1})`);
                        if (stallSection) {
                            scrollPosition = stallSection.offsetTop - navHeight - 20;
                        }
                    }

                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            };
        }
    }

    /**
     * 显示西校抽取结果
     * @param {number} restaurantIndex - 餐厅索引
     */
    function showWestResult(restaurantIndex) {
        // 获取抽中的餐厅
        const selectedRestaurant = westRestaurants[restaurantIndex];

        // 获取抽取模式（餐厅、档口或菜品）
        const wheelMode = document.querySelector('input[name="wheelMode"]:checked');
        const mode = wheelMode ? wheelMode.value : 'restaurant';

        // 随机选择一道菜品
        const randomDishIndex = Math.floor(Math.random() * selectedRestaurant.dishes.length);
        const selectedDish = selectedRestaurant.dishes[randomDishIndex];

        // 随机选择一个档口（1-35）
        const randomStallIndex = Math.floor(Math.random() * 35) + 1;
        const selectedStall = `档口${randomStallIndex}`;

        // 获取结果展示元素
        const resultTitle = westWheelResult.querySelector('.result-title');
        const resultRestaurant = westWheelResult.querySelector('.result-restaurant');
        const resultDish = westWheelResult.querySelector('.result-dish');
        const resultCelebration = westWheelResult.querySelector('.result-celebration');

        // 更新结果内容
        if (resultCelebration) {
            resultCelebration.textContent = '🎊';
        }

        if (resultTitle) {
            resultTitle.textContent = '恭喜您抽中了';
        }

        if (resultRestaurant) {
            resultRestaurant.textContent = `${selectedRestaurant.icon} ${selectedRestaurant.name}`;
        }

        // 根据模式显示不同内容
        if (mode === 'dish') {
            if (resultDish) {
                resultDish.textContent = `推荐菜品：${selectedDish}`;
            }

            // 显示菜品特写模态框
            setTimeout(function() {
                showFeaturedDish(selectedRestaurant, selectedDish);
            }, 500);
        } else if (mode === 'stall') {
            if (resultDish) {
                resultDish.textContent = `推荐档口：${selectedStall}`;
            }
        } else {
            if (resultDish) {
                resultDish.textContent = '快去探索美味吧！';
            }
        }

        // 显示"查看菜品"按钮
        if (westViewDishBtn) {
            westViewDishBtn.classList.remove('hidden');

            // 为按钮添加点击事件，跳转到对应餐厅
            westViewDishBtn.onclick = function() {
                // 筛选显示对应餐厅
                filterRestaurants(selectedRestaurant.id);

                // 滚动到餐厅区域
                const restaurantsSection = document.getElementById('restaurants');
                if (restaurantsSection) {
                    const navHeight = document.querySelector('.header').offsetHeight;
                    let scrollPosition = restaurantsSection.offsetTop - navHeight - 20;

                    // 如果是档口模式，滚动到具体档口
                    if (mode === 'stall') {
                        const stallSection = document.querySelector(`[data-restaurant="${selectedRestaurant.id}"] .stall-section:nth-child(${randomStallIndex + 1})`);
                        if (stallSection) {
                            scrollPosition = stallSection.offsetTop - navHeight - 20;
                        }
                    }

                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            };
        }
    }
    
    /**
     * ----------------------------------------
     * 11. 菜品特写模态框功能
     * ----------------------------------------
     * - 大图展示抽中的菜品
     * - 包含庆祝动画和详细信息
     * - 提供查看详情和再抽一次功能
     */
    
    // 特写模态框相关DOM元素
    const featuredModal = document.getElementById('featuredDishModal');
    const featuredModalClose = document.querySelector('.featured-modal-close');
    const featuredImage = document.getElementById('featuredImage');
    const featuredDishName = document.getElementById('featuredDishName');
    const featuredDishDesc = document.getElementById('featuredDishDesc');
    const featuredPrice = document.getElementById('featuredPrice');
    const featuredRestaurantIcon = document.querySelector('.featured-restaurant-icon');
    const featuredRestaurantName = document.querySelector('.featured-restaurant-name');
    const featuredViewBtn = document.getElementById('featuredViewBtn');
    const featuredSpinAgainBtn = document.getElementById('featuredSpinAgainBtn');
    
    /**
     * 菜品详细数据配置
     * - 包含菜品描述、价格和图片路径
     */
    const dishDetails = {
        '宫保鸡丁': {
            desc: '经典川菜，鸡肉嫩滑，花生酥脆，麻辣鲜香',
            price: '¥38',
            image: 'images/chinese-kungpao.jpg'
        },
        '红烧肉': {
            desc: '肥而不腻，入口即化，传统秘制酱汁',
            price: '¥45',
            image: 'images/chinese-pork.jpg'
        },
        '清蒸鲈鱼': {
            desc: '新鲜海鲈鱼，清蒸保留原味，鲜嫩可口',
            price: '¥68',
            image: 'images/chinese-fish.jpg'
        },
        '麻婆豆腐': {
            desc: '麻辣鲜香，豆腐嫩滑，下饭神器',
            price: '¥28',
            image: 'images/chinese-tofu.jpg'
        },
        '澳洲菲力牛排': {
            desc: '精选澳洲牛肉，五分熟最佳，配黑椒酱汁',
            price: '¥168',
            image: 'images/western-steak.jpg'
        },
        '奶油培根意面': {
            desc: '浓郁奶油酱汁，香脆培根，意式经典',
            price: '¥58',
            image: 'images/western-pasta.jpg'
        },
        '凯撒沙拉': {
            desc: '新鲜罗马生菜，自制凯撒酱，健康轻食',
            price: '¥38',
            image: 'images/western-salad.jpg'
        },
        '玛格丽特披萨': {
            desc: '手工薄底披萨，新鲜番茄，马苏里拉芝士',
            price: '¥78',
            image: 'images/western-pizza.jpg'
        },
        '精选寿司拼盘': {
            desc: '新鲜刺身，手工寿司，十二件精选组合',
            price: '¥128',
            image: 'images/japanese-sushi.jpg'
        },
        '豚骨拉面': {
            desc: '浓郁豚骨汤底，Q弹面条，溏心蛋配菜',
            price: '¥48',
            image: 'images/japanese-ramen.jpg'
        },
        '天妇罗': {
            desc: '酥脆外衣，新鲜时蔬与鲜虾，蘸天妇罗酱',
            price: '¥68',
            image: 'images/japanese-tempura.jpg'
        },
        '蒲烧鳗鱼': {
            desc: '肥美鳗鱼，秘制酱汁烤制，香气四溢',
            price: '¥88',
            image: 'images/japanese-eel.jpg'
        },
        '韩式烤牛肉': {
            desc: '精选牛五花，秘制韩式酱料腌制，炭火烤制',
            price: '¥98',
            image: 'images/korean-beef.jpg'
        },
        '韩式五花肉': {
            desc: '厚切五花肉，外焦里嫩，配生菜包肉',
            price: '¥68',
            image: 'images/korean-pork.jpg'
        },
        '石锅拌饭': {
            desc: '热腾腾石锅，时蔬鸡蛋，韩式辣酱拌匀',
            price: '¥38',
            image: 'images/korean-bibimbap.jpg'
        },
        '部队锅': {
            desc: '香肠午餐肉，拉面年糕，浓郁辣汤底',
            price: '¥78',
            image: 'images/korean-army.jpg'
        },
        '提拉米苏': {
            desc: '意式经典，咖啡酒香，马斯卡彭芝士',
            price: '¥38',
            image: 'images/dessert-tiramisu.jpg'
        },
        '纽约芝士蛋糕': {
            desc: '浓郁芝士，细腻口感，酸甜平衡',
            price: '¥42',
            image: 'images/dessert-cheesecake.jpg'
        },
        '巧克力熔岩蛋糕': {
            desc: '外酥内流心，比利时巧克力，配冰淇淋',
            price: '¥48',
            image: 'images/dessert-chocolate.jpg'
        },
        '法式水果塔': {
            desc: '酥脆塔皮，香滑卡仕达，新鲜时令水果',
            price: '¥36',
            image: 'images/dessert-fruit.jpg'
        },
        '香草拿铁': {
            desc: '阿拉比卡咖啡豆，香草糖浆，绵密奶泡',
            price: '¥32',
            image: 'images/cafe-latte.jpg'
        },
        '卡布奇诺': {
            desc: '经典意式咖啡，浓郁咖啡香，厚奶泡',
            price: '¥28',
            image: 'images/cafe-cappuccino.jpg'
        },
        '冰美式咖啡': {
            desc: '清爽提神，纯正咖啡风味，夏日必备',
            price: '¥22',
            image: 'images/cafe-americano.jpg'
        },
        '抹茶拿铁': {
            desc: '日本宇治抹茶，香浓牛奶，清新茶香',
            price: '¥35',
            image: 'images/cafe-matcha.jpg'
        }
    };
    
    /**
     * 显示菜品特写模态框
     * @param {Object} restaurant - 餐厅对象
     * @param {string} dishName - 菜品名称
     */
    function showFeaturedDish(restaurant, dishName) {
        if (!featuredModal) return;
        
        // 获取菜品详细信息
        const dishInfo = dishDetails[dishName] || {
            desc: '美味佳肴，等你品尝',
            price: '¥--',
            image: ''
        };
        
        // 填充模态框内容
        if (featuredRestaurantIcon) {
            featuredRestaurantIcon.textContent = restaurant.icon;
        }
        
        if (featuredRestaurantName) {
            featuredRestaurantName.textContent = restaurant.name;
        }
        
        if (featuredImage) {
            // 设置图片，如果加载失败使用占位符
            featuredImage.src = dishInfo.image;
            featuredImage.alt = dishName;
            featuredImage.onerror = function() {
                this.src = `https://via.placeholder.com/500x300?text=${encodeURIComponent(dishName)}`;
            };
        }
        
        if (featuredDishName) {
            featuredDishName.textContent = dishName;
        }
        
        if (featuredDishDesc) {
            featuredDishDesc.textContent = dishInfo.desc;
        }
        
        if (featuredPrice) {
            featuredPrice.textContent = dishInfo.price;
        }
        
        // 显示模态框
        featuredModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // 为"查看详情"按钮添加点击事件
        if (featuredViewBtn) {
            featuredViewBtn.onclick = function() {
                // 关闭特写模态框
                closeFeaturedModal();
                
                // 筛选显示对应餐厅
                filterRestaurants(restaurant.id);
                
                // 滚动到餐厅区域
                const restaurantsSection = document.getElementById('restaurants');
                if (restaurantsSection) {
                    const navHeight = document.querySelector('.header').offsetHeight;
                    const scrollPosition = restaurantsSection.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            };
        }
        
        // 为"再抽一次"按钮添加点击事件
        if (featuredSpinAgainBtn) {
            featuredSpinAgainBtn.onclick = function() {
                // 关闭特写模态框
                closeFeaturedModal();

                // 根据上次旋转的转盘，再次旋转对应的转盘
                setTimeout(function() {
                    if (lastSpinnedWheel === 'east') {
                        spinEastWheel();
                    } else {
                        spinWestWheel();
                    }
                }, 300);
            };
        }
    }
    
    /**
     * 关闭菜品特写模态框
     */
    function closeFeaturedModal() {
        if (featuredModal) {
            featuredModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    /**
     * 特写模态框关闭按钮点击事件
     */
    if (featuredModalClose) {
        featuredModalClose.addEventListener('click', function() {
            closeFeaturedModal();
        });
    }
    
    /**
     * 特写模态框外部点击关闭
     */
    if (featuredModal) {
        featuredModal.addEventListener('click', function(event) {
            if (event.target === featuredModal) {
                closeFeaturedModal();
            }
        });
    }
    
    /**
     * 键盘事件处理 - ESC键关闭特写模态框
     */
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            closeFeaturedModal();
        }
    });
    
    /**
     * 东校转盘中心按钮点击事件
     */
    if (eastWheelCenter) {
        eastWheelCenter.addEventListener('click', function() {
            spinEastWheel();
        });
    }

    /**
     * 东校转盘整体点击事件（备用）
     */
    if (eastWheel) {
        eastWheel.addEventListener('click', function(event) {
            // 如果点击的不是中心按钮，也触发旋转
            if (!event.target.closest('.wheel-center')) {
                spinEastWheel();
            }
        });
    }

    /**
     * 西校转盘中心按钮点击事件
     */
    if (westWheelCenter) {
        westWheelCenter.addEventListener('click', function() {
            spinWestWheel();
        });
    }

    /**
     * 西校转盘整体点击事件（备用）
     */
    if (westWheel) {
        westWheel.addEventListener('click', function(event) {
            // 如果点击的不是中心按钮，也触发旋转
            if (!event.target.closest('.wheel-center')) {
                spinWestWheel();
            }
        });
    }
    
});

/**
 * ============================================
 * 工具函数
 * ============================================
 */

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} - 防抖后的函数
 * 
 * 使用场景：窗口resize、输入框输入等频繁触发的事件
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间间隔（毫秒）
 * @returns {Function} - 节流后的函数
 * 
 * 使用场景：滚动事件、鼠标移动等持续触发的事件
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * 格式化价格函数
 * @param {number} price - 价格数值
 * @returns {string} - 格式化后的价格字符串
 * 
 * 示例：formatPrice(38) => "¥38"
 */
function formatPrice(price) {
    return '¥' + price;
}

/**
 * 平滑滚动到指定元素
 * @param {string} elementId - 目标元素的ID
 * @param {number} offset - 偏移量（默认为导航栏高度）
 */
function scrollToElement(elementId, offset = 70) {
    const element = document.getElementById(elementId);
    if (element) {
        const scrollPosition = element.offsetTop - offset;
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}
