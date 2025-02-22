// Mobile-Optimized RichuFinds JavaScript
(function() {
    'use strict';

    // Device detection
    const deviceInfo = {
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/.test(navigator.userAgent),
        isMobile: /Mobi|Android/i.test(navigator.userAgent),
        supportsTouch: 'ontouchstart' in window
    };

    // Performance-optimized DOM caching
    const DOM = {
        tabButtons: document.querySelectorAll('.tab-button'),
        tabContents: document.querySelectorAll('.tab-content'),
        productCards: document.querySelectorAll('.product-card'),
        images: document.querySelectorAll('img[loading="lazy"]')
    };

    // Tab Management System
    const TabManager = {
        activeTab: null,
        animationInProgress: false,

        switchTab(tabName, animate = true) {
            if (this.animationInProgress) return;
            this.animationInProgress = true;

            const newTab = document.getElementById(tabName);
            const oldTab = document.querySelector('.tab-content.active');

            // Update buttons
            DOM.tabButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.tab === tabName);
                button.setAttribute('aria-selected', button.dataset.tab === tabName);
            });

            // Smooth transition
            if (animate && oldTab !== newTab) {
                oldTab?.classList.add('fade-out');
                oldTab?.classList.remove('active');

                setTimeout(() => {
                    oldTab?.classList.remove('fade-out');
                    newTab?.classList.add('active', 'fade-in');

                    setTimeout(() => {
                        newTab?.classList.remove('fade-in');
                        this.animationInProgress = false;
                    }, 300);
                }, 300);
            } else {
                oldTab?.classList.remove('active');
                newTab?.classList.add('active');
                this.animationInProgress = false;
            }

            this.activeTab = tabName;
        }
    };

    // Touch Gesture Handler
    const GestureHandler = {
        touchStart: { x: 0, y: 0, time: 0 },
        touchEnd: { x: 0, y: 0, time: 0 },
        swipeThreshold: 50,
        swipeTimeout: 300,
        lastTap: 0,

        init() {
            if (!deviceInfo.supportsTouch) return;

            document.addEventListener('touchstart', e => this.handleTouchStart(e), { passive: true });
            document.addEventListener('touchend', e => this.handleTouchEnd(e), { passive: true });
            document.addEventListener('touchmove', e => this.handleTouchMove(e), { passive: false });
        },

        handleTouchStart(e) {
            const touch = e.touches[0];
            this.touchStart = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };
        },

        handleTouchEnd(e) {
            const touch = e.changedTouches[0];
            this.touchEnd = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };

            this.handleGesture();
            this.preventDoubleTapZoom(e);
        },

        handleTouchMove(e) {
            // Prevent unwanted scrolling during swipe
            if (Math.abs(e.touches[0].clientX - this.touchStart.x) > 10) {
                e.preventDefault();
            }
        },

        handleGesture() {
            const swipeDistance = this.touchEnd.x - this.touchStart.x;
            const swipeTime = this.touchEnd.time - this.touchStart.time;
            
            if (Math.abs(swipeDistance) < this.swipeThreshold || swipeTime > this.swipeTimeout) return;

            const tabs = Array.from(DOM.tabContents);
            const currentTab = document.querySelector('.tab-content.active');
            const currentIndex = tabs.indexOf(currentTab);

            if (swipeDistance > 0 && currentIndex > 0) {
                // Swipe right - previous tab
                TabManager.switchTab(tabs[currentIndex - 1].id);
            } else if (swipeDistance < 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                TabManager.switchTab(tabs[currentIndex + 1].id);
            }
        },

        preventDoubleTapZoom(e) {
            const now = Date.now();
            if (now - this.lastTap <= 300) {
                e.preventDefault();
            }
            this.lastTap = now;
        }
    };

    // Enhanced Image Loading System
    const ImageLoader = {
        init() {
            if ('IntersectionObserver' in window) {
                this.initLazyLoading();
            } else {
                this.loadAllImages();
            }
        },

        initLazyLoading() {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            DOM.images.forEach(img => imageObserver.observe(img));
        },

        loadImage(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        },

        loadAllImages() {
            DOM.images.forEach(img => this.loadImage(img));
        }
    };

    // Security System
    const SecuritySystem = {
        init() {
            this.preventInspection();
            this.preventCopying();
            this.preventContextMenu();
        },

        preventInspection() {
            document.addEventListener('keydown', e => {
                const forbiddenKeys = {
                    'F12': true,
                    'I': e.ctrlKey && e.shiftKey,
                    'U': e.ctrlKey,
                    'C': e.ctrlKey,
                    'X': e.ctrlKey,
                    'V': e.ctrlKey
                };

                if (forbiddenKeys[e.key]) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        preventCopying() {
            document.addEventListener('selectstart', e => e.preventDefault());
            document.addEventListener('copy', e => e.preventDefault());
        },

        preventContextMenu() {
            document.addEventListener('contextmenu', e => e.preventDefault());
        }
    };

    // Performance Optimizations
    const PerformanceOptimizer = {
        init() {
            this.debouncedResize = this.debounce(this.handleResize.bind(this), 250);
            window.addEventListener('resize', this.debouncedResize);
            this.optimizeForDevice();
        },

        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        handleResize() {
            this.optimizeForDevice();
        },

        optimizeForDevice() {
            if (deviceInfo.isMobile) {
                document.body.classList.add('mobile-device');
                if (deviceInfo.isIOS) {
                    document.body.classList.add('ios-device');
                } else if (deviceInfo.isAndroid) {
                    document.body.classList.add('android-device');
                }
            }
        }
    };

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all systems
        GestureHandler.init();
        ImageLoader.init();
        SecuritySystem.init();
        PerformanceOptimizer.init();

        // Set up tab button listeners
        DOM.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                TabManager.switchTab(button.dataset.tab);
            });
        });

        // Open default tab
        TabManager.switchTab('aliexpress', false);
    });

})();