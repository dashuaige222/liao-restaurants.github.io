/**
 * ============================================
 * 转盘功能模块 (wheel.js)
 * ============================================
 *
 * 功能模块：
 * 1. 双转盘初始化（东校/西校）
 * 2. 转盘旋转动画
 * 3. 随机抽取逻辑
 * 4. 结果展示和跳转
 */

/**
 * ----------------------------------------
 * 转盘配置数据
 * ----------------------------------------
 */

// 东校餐厅配置
const eastRestaurants = [
    {
        name: '翰苑',
        icon: '🥢',
        id: 'chinese',
        page: 'hanyuan.html',
        dishes: ['宫保鸡丁', '红烧肉', '清蒸鲈鱼', '麻婆豆腐']
    },
    {
        name: '博苑',
        icon: '🍝',
        id: 'western',
        page: 'boyuan.html',
        dishes: ['澳洲菲力牛排', '奶油培根意面', '凯撒沙拉', '玛格丽特披萨']
    },
    {
        name: '慧苑',
        icon: '🍣',
        id: 'japanese',
        page: 'huiyuan.html',
        dishes: ['精选寿司拼盘', '豚骨拉面', '天妇罗', '蒲烧鳗鱼']
    }
];

// 西校餐厅配置
const westRestaurants = [
    {
        name: '湖苑',
        icon: '🍖',
        id: 'korean',
        page: 'huyuan.html',
        dishes: ['韩式烤牛肉', '韩式五花肉', '石锅拌饭', '部队锅']
    },
    {
        name: '雅苑',
        icon: '🍰',
        id: 'dessert',
        page: 'yayuan.html',
        dishes: ['提拉米苏', '纽约芝士蛋糕', '巧克力熔岩蛋糕', '法式水果塔']
    },
    {
        name: '楠苑',
        icon: '☕',
        id: 'cafe',
        page: 'nanyuan.html',
        dishes: ['香草拿铁', '卡布奇诺', '冰美式咖啡', '抹茶拿铁']
    }
];

/**
 * ----------------------------------------
 * 转盘状态变量
 * ----------------------------------------
 */
let isEastSpinning = false;
let isWestSpinning = false;
let eastCurrentRotation = 0;
let westCurrentRotation = 0;
let lastSpinnedWheel = 'east';

/**
 * ----------------------------------------
 * 1. 转盘初始化
 * ----------------------------------------
 */

/**
 * 初始化东校转盘扇区
 */
function initEastWheel() {
    const eastWheelInner = document.querySelector('#eastWheel .wheel-inner');
    if (!eastWheelInner) return;

    eastWheelInner.innerHTML = '';

    eastRestaurants.forEach(function(restaurant, index) {
        const sector = document.createElement('div');
        sector.className = 'wheel-sector';
        const rotation = index * 120 + 60;
        sector.style.transform = `rotate(${rotation}deg)`;
        sector.innerHTML = `<span>${restaurant.icon} ${restaurant.name}</span>`;
        eastWheelInner.appendChild(sector);
    });
}

/**
 * 初始化西校转盘扇区
 */
function initWestWheel() {
    const westWheelInner = document.querySelector('#westWheel .wheel-inner');
    if (!westWheelInner) return;

    westWheelInner.innerHTML = '';

    westRestaurants.forEach(function(restaurant, index) {
        const sector = document.createElement('div');
        sector.className = 'wheel-sector';
        const rotation = index * 120 + 60;
        sector.style.transform = `rotate(${rotation}deg)`;
        sector.innerHTML = `<span>${restaurant.icon} ${restaurant.name}</span>`;
        westWheelInner.appendChild(sector);
    });
}

/**
 * 初始化双转盘
 */
function initWheels() {
    initEastWheel();
    initWestWheel();
    console.log('转盘初始化完成');
}

/**
 * ----------------------------------------
 * 2. 转盘旋转功能
 * ----------------------------------------
 */

/**
 * 东校转盘旋转
 * @returns {number} 抽中的餐厅索引
 */
function spinEastWheel() {
    if (isEastSpinning) return;

    isEastSpinning = true;
    lastSpinnedWheel = 'east';

    const eastWheel = document.getElementById('eastWheel');
    const baseRotation = 1800;
    const randomAngle = Math.random() * 360;
    const totalRotation = eastCurrentRotation + baseRotation + randomAngle;

    if (eastWheel) {
        eastWheel.style.transform = `rotate(${totalRotation}deg)`;
    }

    eastCurrentRotation = totalRotation;

    const normalizedAngle = (360 - (totalRotation % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / 120);

    setTimeout(function() {
        isEastSpinning = false;
        showEastResult(selectedIndex);
    }, 4000);

    return selectedIndex;
}

/**
 * 西校转盘旋转
 * @returns {number} 抽中的餐厅索引
 */
function spinWestWheel() {
    if (isWestSpinning) return;

    isWestSpinning = true;
    lastSpinnedWheel = 'west';

    const westWheel = document.getElementById('westWheel');
    const baseRotation = 1800;
    const randomAngle = Math.random() * 360;
    const totalRotation = westCurrentRotation + baseRotation + randomAngle;

    if (westWheel) {
        westWheel.style.transform = `rotate(${totalRotation}deg)`;
    }

    westCurrentRotation = totalRotation;

    const normalizedAngle = (360 - (totalRotation % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / 120);

    setTimeout(function() {
        isWestSpinning = false;
        showWestResult(selectedIndex);
    }, 4000);

    return selectedIndex;
}

/**
 * ----------------------------------------
 * 3. 结果展示功能
 * ----------------------------------------
 */

/**
 * 显示东校抽取结果
 * @param {number} restaurantIndex - 餐厅索引
 */
function showEastResult(restaurantIndex) {
    const selectedRestaurant = eastRestaurants[restaurantIndex];

    const wheelMode = document.querySelector('input[name="wheelMode"]:checked');
    const mode = wheelMode ? wheelMode.value : 'restaurant';

    const randomDishIndex = Math.floor(Math.random() * selectedRestaurant.dishes.length);
    const selectedDish = selectedRestaurant.dishes[randomDishIndex];

    const randomStallIndex = Math.floor(Math.random() * 35) + 1;
    const selectedStall = `档口${randomStallIndex}`;

    const eastWheelResult = document.getElementById('eastWheelResult');
    const resultTitle = eastWheelResult ? eastWheelResult.querySelector('.result-title') : null;
    const resultRestaurant = eastWheelResult ? eastWheelResult.querySelector('.result-restaurant') : null;
    const resultDish = eastWheelResult ? eastWheelResult.querySelector('.result-dish') : null;
    const resultCelebration = eastWheelResult ? eastWheelResult.querySelector('.result-celebration') : null;
    const eastViewDishBtn = document.getElementById('eastViewDishBtn');

    if (resultCelebration) resultCelebration.textContent = '🎊';
    if (resultTitle) resultTitle.textContent = '恭喜您抽中了';
    if (resultRestaurant) resultRestaurant.textContent = `${selectedRestaurant.icon} ${selectedRestaurant.name}`;

    if (mode === 'dish') {
        if (resultDish) resultDish.textContent = `推荐菜品：${selectedDish}`;
        setTimeout(function() {
            showFeaturedDish(selectedRestaurant, selectedDish);
        }, 500);
    } else if (mode === 'stall') {
        if (resultDish) resultDish.textContent = `推荐档口：${selectedStall}`;
    } else {
        if (resultDish) resultDish.textContent = '快去探索美味吧！';
    }

    if (eastViewDishBtn) {
        eastViewDishBtn.classList.remove('hidden');
        eastViewDishBtn.onclick = function() {
            navigateToRestaurant(selectedRestaurant.id);
        };
    }
}

/**
 * 显示西校抽取结果
 * @param {number} restaurantIndex - 餐厅索引
 */
function showWestResult(restaurantIndex) {
    const selectedRestaurant = westRestaurants[restaurantIndex];

    const wheelMode = document.querySelector('input[name="wheelMode"]:checked');
    const mode = wheelMode ? wheelMode.value : 'restaurant';

    const randomDishIndex = Math.floor(Math.random() * selectedRestaurant.dishes.length);
    const selectedDish = selectedRestaurant.dishes[randomDishIndex];

    const randomStallIndex = Math.floor(Math.random() * 35) + 1;
    const selectedStall = `档口${randomStallIndex}`;

    const westWheelResult = document.getElementById('westWheelResult');
    const resultTitle = westWheelResult ? westWheelResult.querySelector('.result-title') : null;
    const resultRestaurant = westWheelResult ? westWheelResult.querySelector('.result-restaurant') : null;
    const resultDish = westWheelResult ? westWheelResult.querySelector('.result-dish') : null;
    const resultCelebration = westWheelResult ? westWheelResult.querySelector('.result-celebration') : null;
    const westViewDishBtn = document.getElementById('westViewDishBtn');

    if (resultCelebration) resultCelebration.textContent = '🎊';
    if (resultTitle) resultTitle.textContent = '恭喜您抽中了';
    if (resultRestaurant) resultRestaurant.textContent = `${selectedRestaurant.icon} ${selectedRestaurant.name}`;

    if (mode === 'dish') {
        if (resultDish) resultDish.textContent = `推荐菜品：${selectedDish}`;
        setTimeout(function() {
            showFeaturedDish(selectedRestaurant, selectedDish);
        }, 500);
    } else if (mode === 'stall') {
        if (resultDish) resultDish.textContent = `推荐档口：${selectedStall}`;
    } else {
        if (resultDish) resultDish.textContent = '快去探索美味吧！';
    }

    if (westViewDishBtn) {
        westViewDishBtn.classList.remove('hidden');
        westViewDishBtn.onclick = function() {
            navigateToRestaurant(selectedRestaurant.id);
        };
    }
}

/**
 * ----------------------------------------
 * 4. 页面跳转功能
 * ----------------------------------------
 */

/**
 * 跳转到指定餐厅页面
 * @param {string} restaurantId - 餐厅ID
 */
function navigateToRestaurant(restaurantId) {
    const pageMap = {
        'chinese': 'hanyuan.html',
        'western': 'boyuan.html',
        'japanese': 'huiyuan.html',
        'korean': 'huyuan.html',
        'dessert': 'yayuan.html',
        'cafe': 'nanyuan.html',
        // 兼容旧的ID
        'hanyuan': 'hanyuan.html',
        'boyuan': 'boyuan.html',
        'huiyuan': 'huiyuan.html',
        'huyuan': 'huyuan.html',
        'yayuan': 'yayuan.html',
        'nanyuan': 'nanyuan.html'
    };

    const page = pageMap[restaurantId];
    if (page) {
        window.location.href = page;
    } else {
        console.error('未找到餐厅页面:', restaurantId);
    }
}

/**
 * ----------------------------------------
 * 5. 菜品特写模态框
 * ----------------------------------------
 */

/**
 * 显示菜品特写模态框
 * @param {Object} restaurant - 餐厅对象
 * @param {string} dish - 菜品名称
 */
function showFeaturedDish(restaurant, dish) {
    const featuredModal = document.getElementById('featuredDishModal');
    const featuredImage = document.getElementById('featuredImage');
    const featuredDishName = document.getElementById('featuredDishName');
    const featuredDishDesc = document.getElementById('featuredDishDesc');
    const featuredPrice = document.getElementById('featuredPrice');
    const featuredRestaurantIcon = document.querySelector('.featured-restaurant-icon');
    const featuredRestaurantName = document.querySelector('.featured-restaurant-name');

    if (featuredRestaurantIcon) featuredRestaurantIcon.textContent = restaurant.icon;
    if (featuredRestaurantName) featuredRestaurantName.textContent = restaurant.name;
    if (featuredDishName) featuredDishName.textContent = dish;

    // 简化的菜品详情
    const dishDetails = {
        '宫保鸡丁': { desc: '经典川菜，鸡肉嫩滑，花生酥脆，麻辣鲜香', price: '¥38' },
        '红烧肉': { desc: '肥而不腻，入口即化，传统秘制酱汁', price: '¥45' },
        '清蒸鲈鱼': { desc: '新鲜海鲈鱼，清蒸保留原味，鲜嫩可口', price: '¥68' },
        '麻婆豆腐': { desc: '麻辣鲜香，豆腐嫩滑，下饭神器', price: '¥28' },
        '澳洲菲力牛排': { desc: '精选澳洲牛肉，五分熟最佳，配黑椒酱汁', price: '¥168' },
        '奶油培根意面': { desc: '浓郁奶油酱汁，香脆培根，意式经典', price: '¥58' },
        '凯撒沙拉': { desc: '新鲜罗马生菜，自制凯撒酱，健康轻食', price: '¥38' },
        '玛格丽特披萨': { desc: '手工薄底披萨，新鲜番茄，马苏里拉芝士', price: '¥78' },
        '精选寿司拼盘': { desc: '新鲜刺身，手工寿司，十二件精选组合', price: '¥128' },
        '豚骨拉面': { desc: '浓郁豚骨汤底，Q弹面条，溏心蛋配菜', price: '¥48' },
        '天妇罗': { desc: '酥脆外衣，新鲜时蔬与鲜虾，蘸天妇罗酱', price: '¥68' },
        '蒲烧鳗鱼': { desc: '肥美鳗鱼，秘制酱汁烤制，香气四溢', price: '¥88' },
        '韩式烤牛肉': { desc: '精选牛五花，秘制韩式酱料腌制，炭火烤制', price: '¥98' },
        '韩式五花肉': { desc: '厚切五花肉，外焦里嫩，配生菜包肉', price: '¥68' },
        '石锅拌饭': { desc: '热腾腾石锅，时蔬鸡蛋，韩式辣酱拌匀', price: '¥38' },
        '部队锅': { desc: '香肠午餐肉，拉面年糕，浓郁辣汤底', price: '¥78' },
        '提拉米苏': { desc: '意式经典，马斯卡彭芝士，咖啡酒浸润', price: '¥38' },
        '纽约芝士蛋糕': { desc: '浓郁芝士，酸甜平衡，经典美式', price: '¥42' },
        '巧克力熔岩蛋糕': { desc: '外酥内软，熔岩巧克力流心，配冰淇淋', price: '¥48' },
        '法式水果塔': { desc: '酥脆塔皮，卡仕达酱，新鲜时令水果', price: '¥36' },
        '香草拿铁': { desc: '阿拉比卡豆，香草糖浆，绵密奶泡', price: '¥32' },
        '卡布奇诺': { desc: '经典意式，浓缩咖啡，绵密奶泡', price: '¥28' },
        '冰美式咖啡': { desc: '双份浓缩，冰块稀释，清爽提神', price: '¥22' },
        '抹茶拿铁': { desc: '日本抹茶，鲜奶融合，清新茶香', price: '¥35' }
    };

    const detail = dishDetails[dish] || { desc: '精选美味，值得一试', price: '¥30' };
    if (featuredDishDesc) featuredDishDesc.textContent = detail.desc;
    if (featuredPrice) featuredPrice.textContent = detail.price;

    if (featuredImage) {
        featuredImage.style.display = 'none';
    }

    if (featuredModal) {
        featuredModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // 初始化按钮事件
    const featuredViewBtn = document.getElementById('featuredViewBtn');
    const featuredSpinAgainBtn = document.getElementById('featuredSpinAgainBtn');

    if (featuredViewBtn) {
        featuredViewBtn.onclick = function() {
            navigateToRestaurant(restaurant.id);
        };
    }

    if (featuredSpinAgainBtn) {
        featuredSpinAgainBtn.onclick = function() {
            if (featuredModal) {
                featuredModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            if (lastSpinnedWheel === 'east') {
                spinEastWheel();
            } else {
                spinWestWheel();
            }
        };
    }
}

/**
 * ----------------------------------------
 * 6. 初始化转盘事件
 * ----------------------------------------
 */
function initWheelEvents() {
    // 东校转盘点击事件
    const eastWheel = document.getElementById('eastWheel');
    const eastWheelCenter = eastWheel ? eastWheel.querySelector('.wheel-center') : null;

    if (eastWheelCenter) {
        eastWheelCenter.addEventListener('click', spinEastWheel);
    }

    if (eastWheel) {
        eastWheel.addEventListener('click', function(event) {
            if (!event.target.closest('.wheel-center')) {
                spinEastWheel();
            }
        });
    }

    // 西校转盘点击事件
    const westWheel = document.getElementById('westWheel');
    const westWheelCenter = westWheel ? westWheel.querySelector('.wheel-center') : null;

    if (westWheelCenter) {
        westWheelCenter.addEventListener('click', spinWestWheel);
    }

    if (westWheel) {
        westWheel.addEventListener('click', function(event) {
            if (!event.target.closest('.wheel-center')) {
                spinWestWheel();
            }
        });
    }

    // 特写模态框关闭
    const featuredModal = document.getElementById('featuredDishModal');
    const featuredModalClose = featuredModal ? featuredModal.querySelector('.featured-modal-close') : null;

    if (featuredModalClose) {
        featuredModalClose.addEventListener('click', function() {
            if (featuredModal) {
                featuredModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (featuredModal) {
        featuredModal.addEventListener('click', function(event) {
            if (event.target === featuredModal) {
                featuredModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    console.log('转盘事件初始化完成');
}

/**
 * ----------------------------------------
 * 7. 初始化转盘模块
 * ----------------------------------------
 */
function initWheelModule() {
    document.addEventListener('DOMContentLoaded', function() {
        initWheels();
        initWheelEvents();
        console.log('转盘模块初始化完成');
    });
}

// 导出转盘模块
if (typeof window !== 'undefined') {
    window.WheelModule = {
        initWheels,
        spinEastWheel,
        spinWestWheel,
        showEastResult,
        showWestResult,
        navigateToRestaurant,
        showFeaturedDish,
        initWheelEvents,
        initWheelModule
    };
}

// 自动初始化
initWheelModule();
