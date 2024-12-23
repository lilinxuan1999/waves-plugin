import Config from './Config.js';
import axios from 'axios';
import qs from 'qs';

const CONSTANTS = {
    SIGNIN_URL: 'https://api.kurobbs.com/user/signIn',
    LIKE_URL: 'https://api.kurobbs.com/forum/like',
    SHARE_URL: 'https://api.kurobbs.com/encourage/level/shareTask',
    DETAIL_URL: 'https://api.kurobbs.com/forum/getPostDetail',
    TASK_PROCESS_URL: 'https://api.kurobbs.com/encourage/level/getTaskProcess',
    GET_COIN_URL: 'https://api.kurobbs.com/encourage/gold/getTotalGold',
    FORUM_LIST: 'https://api.kurobbs.com/forum/list',

    REQUEST_HEADERS_BASE: {
        "source": "h5",
    },
};

class Kuro {
    constructor() {
    }

    // 获取可用性
    async isAvailable(token, strict = false) {

        let data = qs.stringify({
            'gameId': 0
        });


        try {
            const response = await axios.post(CONSTANTS.TASK_PROCESS_URL, data, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, 'token': token, devcode: '' } });

            if (response.data.code === 220) {
                logger.info('获取可用性成功：账号已过期');
                return false;
            } else {
                if (Config.getConfig().enable_log) {
                    logger.info('获取可用性成功：账号可用');
                }
                return true;
            }
        } catch (error) {
            logger.error('获取可用性失败，疑似网络问题：\n', error);
            return strict ? false : true;
        }
    }

    // 用户签到
    async signIn(token) {

        let data = qs.stringify({
            'gameId': 3
        });

        try {
            const response = await axios.post(CONSTANTS.SIGNIN_URL, data, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, 'token': token } });

            if (response.data.code === 200) {
                if (Config.getConfig().enable_log) {
                    logger.info('库街区用户签到成功');
                }
                return { status: true, data: response.data.data };
            } else {
                logger.error('库街区用户签到失败：', response.data.msg);
                return { status: false, msg: response.data.msg };
            }
        } catch (error) {
            logger.error('库街区用户签到失败，疑似网络问题：\n', error);
            return { status: false, msg: '库街区用户签到失败，疑似网络问题，请检查控制台日志' };
        }
    }

    // 点赞
    async like(postId, toUserId, token) {
        let data = qs.stringify({
            'gameId': 3,
            'likeType': 1,
            'operateType': 1,
            'postId': postId,
            'toUserId': toUserId
        });

        try {
            const response = await axios.post(CONSTANTS.LIKE_URL, data, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, 'token': token } });

            if (response.data.code === 200) {
                if (Config.getConfig().enable_log) {
                    logger.info('库街区点赞成功');
                }
                return { status: true, data: response.data.data };
            } else {
                logger.error('库街区点赞失败：', response.data.msg);
                return { status: false, msg: response.data.msg };
            }
        } catch (error) {
            logger.error('库街区点赞失败，疑似网络问题：\n', error);
            return { status: false, msg: '库街区点赞失败，疑似网络问题，请检查控制台日志' };
        }
    }

    // 分享帖子
    async share(token) {
        let data = qs.stringify({
            'gameId': 3
        });

        try {
            const response = await axios.post(CONSTANTS.SHARE_URL, data, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, 'token': token, devcode: '' } });

            if (response.data.code === 200) {
                if (Config.getConfig().enable_log) {
                    logger.info('库街区分享成功');
                }
                return { status: true, data: response.data.msg };
            } else {
                logger.error('库街区分享失败：', response.data.msg);
                return { status: false, msg: response.data.msg };
            }
        } catch (error) {
            logger.error('库街区分享失败，疑似网络问题：\n', error);
            return { status: false, msg: '库街区分享失败，疑似网络问题，请检查控制台日志' };
        }
    }

    // 浏览帖子
    async detail(postId, token) {
        let data = qs.stringify({
            'postId': postId
        });

        try {
            const response = await axios.post(CONSTANTS.DETAIL_URL, data, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, 'token': token, devcode: '' } });

            if (response.data.code === 200) {
                if (Config.getConfig().enable_log) {
                    logger.info('库街区浏览帖子成功');
                }
                return { status: true, data: response.data.data };
            } else {
                logger.error('库街区浏览帖子失败：', response.data.msg);
                return { status: false, msg: response.data.msg };
            }
        } catch (error) {
            logger.error('库街区浏览帖子失败，疑似网络问题：\n', error);
            return { status: false, msg: '库街区浏览帖子失败，疑似网络问题，请检查控制台日志' };
        }
    }

    // 获取帖子
    async getPost() {
        let data = qs.stringify({
            'forumId': 9,
            'gameId': 3
        });

        try {
            const response = await axios.post(CONSTANTS.FORUM_LIST, data, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, version: '', devcode: '' } });

            if (response.data.code === 200) {
                if (Config.getConfig().enable_log) {
                    logger.info('库街区获取帖子成功');
                }
                return { status: true, data: response.data.data };
            } else {
                logger.error('库街区获取帖子失败：', response.data.msg);
            }
        } catch (error) {
            logger.error('库街区获取帖子失败，疑似网络问题：\n', error);
        }
    }

    // 获取任务进度
    async taskProcess(token) {
        let data = qs.stringify({
            'gameId': 0
        });

        try {
            const response = await axios.post(CONSTANTS.TASK_PROCESS_URL, data, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, 'token': token, devcode: '' } });

            if (response.data.code === 200) {
                if (Config.getConfig().enable_log) {
                    logger.info('库街区获取任务进度成功');
                }
                return { status: true, data: response.data.data };
            } else {
                logger.error('库街区获取任务进度失败：', response.data.msg);
                return { status: false, msg: response.data.msg };
            }
        } catch (error) {
            logger.error('库街区获取任务进度失败，疑似网络问题：\n', error);
            return { status: false, msg: '库街区获取任务进度失败，疑似网络问题，请检查控制台日志' };
        }
    }

    // 获取库洛币总数
    async getCoin(token) {

        try {
            const response = await axios.post(CONSTANTS.GET_COIN_URL, null, { headers: { ...CONSTANTS.REQUEST_HEADERS_BASE, 'token': token, devcode: '' } });

            if (response.data.code === 200) {
                if (Config.getConfig().enable_log) {
                    logger.info('库街区获取库洛币总数成功');
                }
                return { status: true, data: response.data.data };
            } else {
                logger.error('库街区获取库洛币总数失败：', response.data.msg);
                return { status: false, msg: response.data.msg };
            }
        } catch (error) {
            logger.error('库街区获取库洛币总数失败，疑似网络问题：\n', error);
            return { status: false, msg: '库街区获取库洛币总数失败，疑似网络问题，请检查控制台日志' };
        }
    }
}

export default Kuro;