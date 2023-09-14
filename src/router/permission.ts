import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

router.beforeEach((from, to, next) => {
    //进度条开始
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});
