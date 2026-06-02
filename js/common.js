/**
 * ============================================
 * 公共功能模块 (common.js)
 * ============================================
 *
 * 功能模块：
 * 1. 移动端导航菜单切换
 * 2. 平滑滚动功能
 * 3. 模态框基础功能
 * 4. 工具函数
 */

/**
 * ----------------------------------------
 * 1. 移动端导航菜单切换功能
 * ----------------------------------------
 * - 点击汉堡菜单按钮显示/隐藏导航菜单
 * - 点击导航链接后自动关闭菜单
 */
function initMobileMenu() {
    // 获取汉堡菜单按钮
    const menuToggle = document.querySelector('.menu-toggle');
    // 获取导航菜单
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        // 汉堡菜单点击事件处理
        menuToggle.addEventListener('click', function() {
            // 切换导航菜单的active类
            nav.classList.toggle('active');
            // 切换按钮的active类（用于动画）
            menuToggle.classList.toggle('active');
        });
    }
}

/**
 * ----------------------------------------
 * 2. 平滑滚动功能
 * ----------------------------------------
 * - 滚动到指定元素位置
 * - 考虑固定导航栏高度
 */

/**
 * 平滑滚动到指定元素
 * @param {string|Element} target - 目标元素或元素ID
 * @param {number} offset - 额外偏移量（默认20px）
 */
function smoothScrollTo(target, offset = 20) {
    let targetElement;

    // 判断参数类型
    if (typeof target === 'string') {
        targetElement = document.getElementById(target);
    } else if (target instanceof Element) {
        targetElement = target;
    }

    if (targetElement) {
        // 计算滚动位置（考虑固定导航栏高度）
        const header = document.querySelector('.header');
        const navHeight = header ? header.offsetHeight : 0;
        const scrollPosition = targetElement.offsetTop - navHeight - offset;

        // 平滑滚动
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * 初始化Hero按钮平滑滚动
 */
function initHeroScroll() {
    const heroBtn = document.querySelector('.hero-btn');

    if (heroBtn) {
        heroBtn.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    }
}

/**
 * ----------------------------------------
 * 3. 模态框基础功能
 * ----------------------------------------
 * - 打开/关闭模态框
 * - ESC键关闭
 * - 点击遮罩层关闭
 */

/**
 * 打开模态框
 * @param {string} modalId - 模态框ID
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.style.display = 'flex';
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 关闭模态框
 * @param {string} modalId - 模态框ID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.style.display = 'none';
        // 恢复页面滚动
        document.body.style.overflow = 'auto';
    }
}

/**
 * 初始化模态框关闭功能
 * @param {string} modalId - 模态框ID
 */
function initModalClose(modalId) {
    const modal = document.getElementById(modalId);
    const modalClose = modal ? modal.querySelector('.modal-close, .featured-modal-close') : null;

    // 关闭按钮点击事件
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal(modalId);
        });
    }

    // 点击遮罩层关闭
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        });
    }

    // ESC键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            closeModal(modalId);
        }
    });
}

/**
 * ----------------------------------------
 * 4. 工具函数
 * ----------------------------------------
 */

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} - 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ----------------------------------------
 * 5. 导航栏滚动效果
 * ----------------------------------------
 * - 滚动时为导航栏添加阴影效果
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 50) {
                // 滚动超过50px时，增加导航栏阴影
                header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            } else {
                // 回到顶部时，恢复原阴影
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }
        }, 100));
    }
}

/**
 * ----------------------------------------
 * 6. 页面加载动画
 * ----------------------------------------
 * - 使用Intersection Observer监测元素进入视口
 * - 添加淡入动画
 */
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // 停止观察已动画的元素
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * ----------------------------------------
 * 7. 初始化所有公共功能
 * ----------------------------------------
 */
function initCommon() {
    // 等待DOM完全加载后再执行
    document.addEventListener('DOMContentLoaded', function() {
        // 初始化移动端菜单
        initMobileMenu();

        // 初始化Hero按钮滚动
        initHeroScroll();

        // 初始化导航栏滚动效果
        initHeaderScroll();

        // 初始化页面加载动画
        initScrollAnimation();

        console.log('公共功能模块初始化完成');
    });
}

// 导出公共函数（供其他模块使用）
if (typeof window !== 'undefined') {
    window.CommonModule = {
        initMobileMenu,
        smoothScrollTo,
        openModal,
        closeModal,
        initModalClose,
        debounce,
        throttle,
        initHeaderScroll,
        initScrollAnimation,
        initCommon
    };
}

// 自动初始化
initCommon();
