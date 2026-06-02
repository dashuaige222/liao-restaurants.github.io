/**
 * ============================================
 * 餐厅档口和菜品数据配置
 * ============================================
 * 
 * 数据结构说明：
 * - 6个餐厅，每个餐厅35个档口
 * - 每个档口10道菜
 * - 总计：6 × 35 × 10 = 2100道菜
 * 
 * 档口命名规则：
 * - 使用数字编号：档口1、档口2...档口35
 * - 每个档口有独特的菜品主题
 */

/**
 * 生成档口数据的函数
 * @param {string} restaurantType - 餐厅类型
 * @param {string} restaurantName - 餐厅名称
 * @param {string} icon - 餐厅图标
 * @returns {Array} - 档口数组
 */
function generateStalls(restaurantType, restaurantName, icon) {
    const stalls = [];
    
    // 根据餐厅类型定义菜品模板
    const dishTemplates = getDishTemplates(restaurantType);
    
    // 生成35个档口
    for (let i = 1; i <= 35; i++) {
        const stall = {
            id: `stall-${i}`,
            name: `档口${i}`,
            dishes: []
        };
        
        // 每个档口生成10道菜
        for (let j = 1; j <= 10; j++) {
            const dishIndex = (i - 1) * 10 + j;
            const template = dishTemplates[(dishIndex - 1) % dishTemplates.length];
            
            stall.dishes.push({
                id: `dish-${i}-${j}`,
                name: `${template.prefix}${j}`,
                desc: template.desc,
                price: template.basePrice + Math.floor(Math.random() * 20),
                tag: j === 1 ? '招牌推荐' : (j === 2 ? '人气爆款' : null),
                image: `images/${restaurantType}-stall${i}-dish${j}.jpg`
            });
        }
        
        stalls.push(stall);
    }
    
    return stalls;
}

/**
 * 获取不同餐厅类型的菜品模板
 * @param {string} type - 餐厅类型
 * @returns {Array} - 菜品模板数组
 */
function getDishTemplates(type) {
    const templates = {
        // 翰苑 - 中华美食
        chinese: [
            { prefix: '宫保', desc: '经典川菜，麻辣鲜香', basePrice: 28 },
            { prefix: '红烧', desc: '传统做法，入口即化', basePrice: 32 },
            { prefix: '清蒸', desc: '保留原味，鲜嫩可口', basePrice: 38 },
            { prefix: '糖醋', desc: '酸甜适中，外酥里嫩', basePrice: 26 },
            { prefix: '水煮', desc: '麻辣过瘾，下饭神器', basePrice: 30 },
            { prefix: '干锅', desc: '香辣可口，越吃越香', basePrice: 35 },
            { prefix: '回锅', desc: '川菜经典，肥而不腻', basePrice: 28 },
            { prefix: '鱼香', desc: '酸甜微辣，开胃下饭', basePrice: 26 },
            { prefix: '蒜香', desc: '蒜香浓郁，外焦里嫩', basePrice: 32 },
            { prefix: '椒盐', desc: '香酥可口，回味无穷', basePrice: 30 }
        ],
        
        // 博苑 - 西式料理
        western: [
            { prefix: '菲力牛排', desc: '精选牛肉，嫩滑多汁', basePrice: 128 },
            { prefix: '意式', desc: '正宗意式风味', basePrice: 48 },
            { prefix: '奶油', desc: '浓郁奶香，丝滑口感', basePrice: 38 },
            { prefix: '黑椒', desc: '黑椒香气，经典口味', basePrice: 42 },
            { prefix: '芝士', desc: '浓郁芝士，拉丝诱人', basePrice: 45 },
            { prefix: '凯撒', desc: '经典沙拉，健康轻食', basePrice: 32 },
            { prefix: '法式', desc: '法式精致，优雅美味', basePrice: 58 },
            { prefix: '美式', desc: '美式经典，分量十足', basePrice: 52 },
            { prefix: '地中海', desc: '地中海风味，清新健康', basePrice: 48 },
            { prefix: '德式', desc: '德式传统，醇厚香浓', basePrice: 55 }
        ],
        
        // 慧苑 - 日本料理
        japanese: [
            { prefix: '寿司', desc: '新鲜食材，手工制作', basePrice: 48 },
            { prefix: '刺身', desc: '新鲜刺身，品质上乘', basePrice: 68 },
            { prefix: '拉面', desc: '浓郁汤底，Q弹面条', basePrice: 38 },
            { prefix: '天妇罗', desc: '酥脆外衣，新鲜食材', basePrice: 45 },
            { prefix: '烤物', desc: '炭火烤制，香气四溢', basePrice: 52 },
            { prefix: '煮物', desc: '慢火炖煮，入味鲜美', basePrice: 42 },
            { prefix: '炸物', desc: '外酥里嫩，金黄诱人', basePrice: 38 },
            { prefix: '蒸物', desc: '清蒸保留，原汁原味', basePrice: 45 },
            { prefix: '拌物', desc: '清爽开胃，营养健康', basePrice: 32 },
            { prefix: '饭物', desc: '日式米饭，经典美味', basePrice: 35 }
        ],
        
        // 湖苑 - 韩国烧烤
        korean: [
            { prefix: '韩式烤肉', desc: '正宗韩式，炭火烤制', basePrice: 68 },
            { prefix: '五花肉', desc: '厚切五花，外焦里嫩', basePrice: 58 },
            { prefix: '牛肉', desc: '精选牛肉，鲜嫩多汁', basePrice: 78 },
            { prefix: '猪肉', desc: '秘制腌制，香嫩可口', basePrice: 48 },
            { prefix: '鸡肉', desc: '韩式风味，香辣过瘾', basePrice: 42 },
            { prefix: '石锅', desc: '热腾石锅，营养美味', basePrice: 38 },
            { prefix: '汤锅', desc: '浓郁汤底，暖胃暖心', basePrice: 45 },
            { prefix: '拌饭', desc: '韩式拌饭，营养均衡', basePrice: 32 },
            { prefix: '煎饼', desc: '韩式煎饼，香酥可口', basePrice: 28 },
            { prefix: '拉面', desc: '韩式拉面，Q弹爽滑', basePrice: 35 }
        ],
        
        // 雅苑 - 精致甜品
        dessert: [
            { prefix: '蛋糕', desc: '精致蛋糕，甜蜜美味', basePrice: 38 },
            { prefix: '慕斯', desc: '丝滑慕斯，入口即化', basePrice: 42 },
            { prefix: '布丁', desc: '嫩滑布丁，香甜可口', basePrice: 28 },
            { prefix: '挞类', desc: '酥脆塔皮，香滑内馅', basePrice: 32 },
            { prefix: '派类', desc: '美式派点，经典风味', basePrice: 35 },
            { prefix: '冰淇淋', desc: '手工制作，口感细腻', basePrice: 25 },
            { prefix: '舒芙蕾', desc: '法式经典，轻盈蓬松', basePrice: 48 },
            { prefix: '马卡龙', desc: '法式甜点，色彩缤纷', basePrice: 38 },
            { prefix: '泡芙', desc: '酥脆外皮，奶油内馅', basePrice: 32 },
            { prefix: '千层', desc: '层层酥脆，香甜诱人', basePrice: 45 }
        ],
        
        // 楠苑 - 精品咖啡
        cafe: [
            { prefix: '拿铁', desc: '经典拿铁，香浓顺滑', basePrice: 32 },
            { prefix: '卡布奇诺', desc: '经典意式，奶泡绵密', basePrice: 28 },
            { prefix: '美式', desc: '纯正咖啡，提神醒脑', basePrice: 22 },
            { prefix: '摩卡', desc: '巧克力香，甜蜜诱人', basePrice: 35 },
            { prefix: '焦糖', desc: '焦糖香气，香甜可口', basePrice: 32 },
            { prefix: '冰咖啡', desc: '清爽冰爽，夏日必备', basePrice: 25 },
            { prefix: '手冲', desc: '手冲精品，风味独特', basePrice: 38 },
            { prefix: '特调', desc: '创意特调，惊喜连连', basePrice: 42 },
            { prefix: '茶饮', desc: '精选茶饮，清香怡人', basePrice: 28 },
            { prefix: '果汁', desc: '新鲜果汁，健康美味', basePrice: 25 }
        ]
    };
    
    return templates[type] || templates.chinese;
}

/**
 * 生成所有餐厅的完整数据
 * @returns {Object} - 完整的餐厅数据对象
 */
function generateAllRestaurantsData() {
    return {
        chinese: typeof stallData !== 'undefined' ? {
            name: '翰苑',
            icon: '🥢',
            id: 'chinese',
            desc: '传统中华美食，地道家乡味道',
            stalls: stallData
        } : {
            name: '翰苑',
            icon: '🥢',
            id: 'chinese',
            desc: '传统中华美食，地道家乡味道',
            stalls: generateStalls('chinese', '翰苑', '🥢')
        },
        western: {
            name: '博苑',
            icon: '🍝',
            id: 'western',
            desc: '正宗西式料理，优雅用餐体验',
            stalls: generateStalls('western', '博苑', '🍝')
        },
        japanese: {
            name: '慧苑',
            icon: '🍣',
            id: 'japanese',
            desc: '精致日式料理，匠心品质传承',
            stalls: generateStalls('japanese', '慧苑', '🍣')
        },
        korean: {
            name: '湖苑',
            icon: '🍖',
            id: 'korean',
            desc: '正宗韩式烤肉，炭火现烤美味',
            stalls: generateStalls('korean', '湖苑', '🍖')
        },
        dessert: {
            name: '雅苑',
            icon: '🍰',
            id: 'dessert',
            desc: '精致甜品，甜蜜幸福时光',
            stalls: generateStalls('dessert', '雅苑', '🍰')
        },
        cafe: {
            name: '楠苑',
            icon: '☕',
            id: 'cafe',
            desc: '精品咖啡，悠闲午后时光',
            stalls: generateStalls('cafe', '楠苑', '☕')
        }
    };
}

// 导出数据生成函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateAllRestaurantsData, generateStalls, getDishTemplates };
}
