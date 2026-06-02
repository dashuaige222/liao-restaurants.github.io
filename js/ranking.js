/**
 * ============================================
 * 排行榜数据模块 (ranking-data.js)
 * ============================================
 *
 * 功能：
 * 1. 热门菜品排行
 * 2. 人气餐厅排行
 * 3. 好评档口排行
 */

/**
 * 热门菜品排行榜数据
 * 基于模拟的用户评分和销量数据
 */
const hotDishesRanking = [
    { rank: 1, name: '宫保鸡丁', restaurant: '翰苑', icon: '🥢', sales: 1256, rating: 4.8, price: 38 },
    { rank: 2, name: '澳洲菲力牛排', restaurant: '博苑', icon: '🍝', sales: 1089, rating: 4.9, price: 168 },
    { rank: 3, name: '精选寿司拼盘', restaurant: '慧苑', icon: '🍣', sales: 987, rating: 4.7, price: 128 },
    { rank: 4, name: '韩式烤牛肉', restaurant: '湖苑', icon: '🍖', sales: 876, rating: 4.6, price: 98 },
    { rank: 5, name: '提拉米苏', restaurant: '雅苑', icon: '🍰', sales: 765, rating: 4.8, price: 38 },
    { rank: 6, name: '香草拿铁', restaurant: '楠苑', icon: '☕', sales: 654, rating: 4.5, price: 32 },
    { rank: 7, name: '红烧肉', restaurant: '翰苑', icon: '🥢', sales: 598, rating: 4.7, price: 45 },
    { rank: 8, name: '奶油培根意面', restaurant: '博苑', icon: '🍝', sales: 543, rating: 4.6, price: 58 },
    { rank: 9, name: '豚骨拉面', restaurant: '慧苑', icon: '🍣', sales: 487, rating: 4.5, price: 48 },
    { rank: 10, name: '纽约芝士蛋糕', restaurant: '雅苑', icon: '🍰', sales: 432, rating: 4.7, price: 42 }
];

/**
 * 人气餐厅排行榜数据
 */
const popularRestaurantsRanking = [
    { rank: 1, name: '翰苑', icon: '🥢', type: '中华美食', visitors: 3567, avgRating: 4.7, dishes: 350 },
    { rank: 2, name: '博苑', icon: '🍝', type: '西式料理', visitors: 2890, avgRating: 4.8, dishes: 350 },
    { rank: 3, name: '慧苑', icon: '🍣', type: '日本料理', visitors: 2456, avgRating: 4.6, dishes: 350 },
    { rank: 4, name: '湖苑', icon: '🍖', type: '韩国烧烤', visitors: 2123, avgRating: 4.5, dishes: 350 },
    { rank: 5, name: '雅苑', icon: '🍰', type: '精致甜品', visitors: 1890, avgRating: 4.7, dishes: 350 },
    { rank: 6, name: '楠苑', icon: '☕', type: '精品咖啡', visitors: 1567, avgRating: 4.4, dishes: 350 }
];

/**
 * 好评档口排行榜数据
 */
const topStallsRanking = [
    { rank: 1, name: '档口1', restaurant: '翰苑', icon: '🥢', specialty: '特色蒸饺', rating: 4.9, reviews: 234 },
    { rank: 2, name: '档口5', restaurant: '博苑', icon: '🍝', specialty: '牛排专区', rating: 4.8, reviews: 198 },
    { rank: 3, name: '档口3', restaurant: '慧苑', icon: '🍣', specialty: '寿司吧', rating: 4.8, reviews: 187 },
    { rank: 4, name: '档口8', restaurant: '湖苑', icon: '🍖', specialty: '烤肉区', rating: 4.7, reviews: 165 },
    { rank: 5, name: '档口2', restaurant: '雅苑', icon: '🍰', specialty: '蛋糕房', rating: 4.7, reviews: 143 },
    { rank: 6, name: '档口10', restaurant: '楠苑', icon: '☕', specialty: '咖啡角', rating: 4.6, reviews: 121 }
];

/**
 * 今日推荐排行
 */
const todayRecommendations = [
    { name: '麻婆豆腐', restaurant: '翰苑', icon: '🥢', reason: '今日特价', discount: '8折' },
    { name: '凯撒沙拉', restaurant: '博苑', icon: '🍝', reason: '健康轻食', discount: '9折' },
    { name: '天妇罗', restaurant: '慧苑', icon: '🍣', reason: '新鲜上市', discount: '无' },
    { name: '石锅拌饭', restaurant: '湖苑', icon: '🍖', reason: '人气爆款', discount: '8.5折' }
];

/**
 * 导出排行榜数据
 */
if (typeof window !== 'undefined') {
    window.RankingData = {
        hotDishesRanking,
        popularRestaurantsRanking,
        topStallsRanking,
        todayRecommendations
    };
}
