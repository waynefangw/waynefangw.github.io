document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(function(carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-control-prev');
        const nextBtn = carousel.querySelector('.carousel-control-next');
        const indicators = carousel.querySelectorAll('.carousel-indicators li');
        
        let currentIndex = 0;
        let autoPlayInterval;
        
        // 显示指定索引的幻灯片
        function showSlide(index) {
            items.forEach((item, i) => {
                item.classList.remove('active');
                indicators[i].classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                    indicators[i].classList.add('active');
                }
            });
            currentIndex = index;
        }
        
        // 下一张
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % items.length;
            showSlide(nextIndex);
        }
        
        // 上一张
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(prevIndex);
        }
        
        // 自动播放
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000); // 5秒切换
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // 事件绑定
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                showSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });
        
        // 鼠标悬停时暂停自动播放
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // 启动自动播放
        startAutoPlay();
    });
});
