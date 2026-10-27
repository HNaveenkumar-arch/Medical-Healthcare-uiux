document.addEventListener("DOMContentLoaded", () => {


    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.style.display = 'none';
                    if (typeof AOS !== 'undefined') AOS.init({ once: true, offset: 50 });
                }
            });
        }
    });


    const navItems = document.querySelectorAll('.nav-links > li > a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            for (let i = 0; i < 3; i++) {
                let heart = document.createElement('i');
                heart.className = 'fas fa-heartbeat tiny-heart';
                heart.style.left = (Math.random() * 80 + 10) + '%';
                heart.style.top = '-15px';
                this.appendChild(heart);

                gsap.to(heart, {
                    y: 35 + Math.random() * 20,
                    opacity: 1,
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(heart, {
                            opacity: 0,
                            y: "+=15",
                            duration: 0.4 + Math.random() * 0.3,
                            onComplete: () => heart.remove()
                        });
                    }
                });
            }
        });
    });


    const topBar = document.getElementById('topBar');
    const closeTopBarBtn = document.getElementById('closeTopBar');
    if (closeTopBarBtn && topBar) {
        closeTopBarBtn.addEventListener('click', () => {
            gsap.to(topBar, { duration: 0.5, height: 0, padding: 0, opacity: 0, ease: "power2.inOut", onComplete: () => topBar.style.display = 'none' });
        });
    }


    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('shrink');
            else header.classList.remove('shrink');
        });
    }


    const hamburger = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileBtn = document.getElementById('closeMobileMenu');

    if (hamburger && mobileMenu && closeMobileBtn) {
        hamburger.addEventListener('click', () => {
            mobileMenu.style.display = 'flex';
            document.body.classList.add('no-scroll');

            gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });

            gsap.fromTo(".mobile-nav-links > li, .mobile-auth",
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
            );
        });

        closeMobileBtn.addEventListener('click', () => {
            gsap.to(".mobile-nav-links > li, .mobile-auth", { opacity: 0, x: -20, duration: 0.2, stagger: 0.05, ease: "power2.in" });
            gsap.to(mobileMenu, {
                opacity: 0, y: -20, duration: 0.4, delay: 0.2, ease: "power2.in",
                onComplete: () => {
                    mobileMenu.style.display = 'none';
                    document.body.classList.remove('no-scroll');

                    const mobileSubmenu = document.getElementById('mobileSubmenu');
                    const mobileServiceArrow = document.getElementById('mobileServiceArrow');
                    if (mobileSubmenu && mobileSubmenu.classList.contains('open')) {
                        mobileSubmenu.classList.remove('open');
                        if (mobileServiceArrow) mobileServiceArrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }


    const mobileServiceArrow = document.getElementById('mobileServiceArrow');
    const mobileSubmenu = document.getElementById('mobileSubmenu');


    if (mobileServiceArrow && mobileSubmenu) {
        mobileServiceArrow.addEventListener('click', function (e) {
            e.preventDefault();
            mobileSubmenu.classList.toggle('open');

            if (mobileSubmenu.classList.contains('open')) {
                this.style.transform = 'rotate(180deg)';
            } else {
                this.style.transform = 'rotate(0deg)';
            }
        });
    }


    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.from(".contact-anim-left", {
            scrollTrigger: { trigger: ".contact-section", start: "top 75%" },
            x: -50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", clearProps: "all"
        });
        gsap.from(".contact-anim-right", {
            scrollTrigger: { trigger: ".contact-section", start: "top 75%" },
            x: 50, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.3, ease: "power3.out", clearProps: "all"
        });
    }


    const contactForm = document.getElementById('getInTouchForm');
    if (contactForm) {
        const contactPhone = document.getElementById('contactPhone');
        if (contactPhone) {
            contactPhone.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isContactValid = true;

            const fName = document.getElementById('firstName');
            const lName = document.getElementById('lastName');
            const email = document.getElementById('contactEmail');
            const phone = document.getElementById('contactPhone');
            const desc = document.getElementById('contactDesc');

            const namePattern = /^[a-zA-Z\s'\-]+$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            function validateField(inputElement, condition, errorId, wrapperElement = null) {
                const errorSpan = document.getElementById(errorId);
                const targetBox = wrapperElement ? wrapperElement : inputElement;
                if (!condition) {
                    if (errorSpan) errorSpan.style.display = 'block';
                    targetBox.style.border = '2px solid #ff0000';
                    isContactValid = false;
                } else {
                    if (errorSpan) errorSpan.style.display = 'none';
                    targetBox.style.border = '2px solid transparent';
                }
            }

            validateField(fName, fName.value.trim() !== '' && namePattern.test(fName.value.trim()), 'fNameError');
            validateField(lName, lName.value.trim() !== '' && namePattern.test(lName.value.trim()), 'lNameError');
            validateField(email, emailPattern.test(email.value.trim()), 'cEmailError');

            const phoneWrapper = document.getElementById('phoneWrapper');
            validateField(phone, phone.value.trim().length === 10, 'cPhoneError', phoneWrapper);
            validateField(desc, desc.value.trim().length >= 10, 'cDescError');

            if (isContactValid) {
                const successMsg = document.getElementById('contactSuccess');
                if (successMsg) successMsg.style.display = 'block';

                setTimeout(() => {
                    window.location.href = '404page.html';
                }, 2000);
            }
        });

        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                if (this.id === 'contactPhone') {
                    const phoneWrap = document.getElementById('phoneWrapper');
                    if (phoneWrap) phoneWrap.style.border = '2px solid transparent';
                } else {
                    this.style.border = '2px solid transparent';
                }
                const parent = this.closest('.input-box');
                if (parent) {
                    const errorMsg = parent.querySelector('.error-msg');
                    if (errorMsg) errorMsg.style.display = 'none';
                }
            });
        });
    }

}); 