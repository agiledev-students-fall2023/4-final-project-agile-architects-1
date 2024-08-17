import React, { useEffect, useRef }from 'react';
import styles from './Animation.module.css';
import $ from 'jquery';
import { gsap } from 'gsap';


const Animation = () => {

    const castleContainerRef = useRef(null);
    const castleRef = useRef(null);

    useEffect(() => {
        var speed = 0.3;
        var WIDTH;
        var HEIGHT;
        var castleWidth;
        var scale;
        var control = false;
        var progress = 0.0;
        
        var _castleCont = $(castleContainerRef.current);
        var _castle = $(castleRef.current);

        console.log('_castleCont:', _castleCont); // Debugging statement
        console.log('_castle:', _castle); // Debugging statement

        const resize = function() {
            WIDTH = window.innerWidth;
            HEIGHT = window.innerHeight;
            scale = WIDTH / 1440;
        
            /*if (_castle && _castle.length > 0) {
                castleWidth = _castle.width() * scale;
                gsap.set(_castle, { scale: scale * 0.85 });
            }*/
            
            castleWidth = _castle.width() * scale;
            gsap.set(_castle, {scale: scale * 0.85});
        };

        resize();
        $(window).on('resize', resize);

        
        const draw = function() {
            requestAnimationFrame(draw);
        
            progress += 0.0012 * speed;
            if (progress > 1) progress = 0;
            if (progress < 0) progress = 1;
            if (_castleCont && _castleCont.length > 0 && castleWidth) {
                gsap.set(_castleCont, {
                    x: (1440 * scale + castleWidth) * -progress + castleWidth / 2,
                    y: 900 * scale * -(0.36 + progress * 0.35)
                });
            }
        };

        const cloudIntro = () => {
            gsap.to($(`.${styles.cloud1}`), { duration: 20, x: WIDTH * 2, y: 300 * scale, opacity: 0.3, ease: 'none', force3D: true });
            gsap.to($(`.${styles.cloudShadow1}`), { duration: 20, x: WIDTH * 2 + 50 * scale, y: 450 * scale, opacity: 0.2, ease: 'none', force3D: true });
            gsap.to($(`.${styles.cloudShadow2}`), { duration: 20, x: WIDTH * 2 + 50 * scale, y: 450 * scale, ease: 'none', force3D: true });
            gsap.to($(`.${styles.cloudShadow3}`), { duration: 20, x: WIDTH * 2 + 50 * scale, y: 450 * scale, ease: 'none', force3D: true });
            gsap.to($(`.${styles.cloud2}`), { duration: 20, x: WIDTH * 2, y: 300 * scale, opacity: 0.5, ease: 'none', force3D: true });
            gsap.to($(`.${styles.cloud3}`), { duration: 20, x: WIDTH * 2, y: 300 * scale, ease: 'none', force3D: true });
            gsap.to($(`.${styles.cloud4}`), { duration: 20, x: WIDTH * 2, y: 300 * scale, ease: 'none', force3D: true });
            gsap.to($(`.${styles.cloud5}`), { duration: 20, x: WIDTH * 2, y: 300 * scale, ease: 'none', force3D: true, onComplete: function() {
                $(`.${styles.clouds}`).remove();
            }});
        };
        
        
        const init = () => {
            console.log('Initializing...');
            console.log('Load Gate state before removal:', $(`.${styles.loadGate}`));

            gsap.to($(`.${styles.loadGate}`), {
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    console.log('Load Gate state during removal:', $(`.${styles.loadGate}`));
                    $(`.${styles.loadGate}`).remove();
                    console.log('Load Gate removed');
                }
            });
            requestAnimationFrame(draw);
            cloudIntro();
        };



        if (document.readyState === 'complete') {
            init();
        } else {
            $(window).on('load', init);
        };
        
        
        $(document).on('mousemove', (e) => {
            if (!control) return;
            speed = (1 - (e.clientX / WIDTH) * 2) * 2;
            tl.timeScale(speed);
            tl2.timeScale(speed);
            tl3.timeScale(speed);
            tl4.timeScale(speed);
            tl5.timeScale(speed);
        });
        
        $(`.${styles.controlToggle}`).on('click', () => {
            control = !control;
            $(`.${styles.container}`).toggleClass('active');
        });
        
        gsap.defaults({ ease: 'power1.inOut' });
        
        gsap.to($(`.${styles.cloudBg}`), {
            duration: 40,
            x: WIDTH * 2,
            y: 200 * scale,
            ease: 'none',
            repeat: -1,
            force3D: true,
            onRepeat: function() {
                const targets = this.targets();
                if (targets && targets.length > 0) {
                    gsap.set(targets[0], {
                        y: Math.random() * 200 - 100,
                        rotationZ: Math.round(Math.random() * 60) - 30,
                        scaleX: Math.random() > 0.5 ? 1 : -1});
                }
        }});
        
        gsap.to($(`.${styles.cloudBg2}`), { 
            duration: 40, 
            x: WIDTH * 2, 
            y: 200 * scale, 
            ease: 'none', 
            delay: 10, 
            repeat: -1, 
            force3D: true, 
            onRepeat: function() {
                const targets = this.targets;
                if (targets && targets.length > 0) {
                    gsap.set(targets[0], { 
                        y: Math.random() * 200 - 100, 
                        rotationZ: Math.round(Math.random() * 60) - 30, 
                        scaleX: Math.random() > 0.5 ? 1 : -1 
                    });
                }
            }
        });
        
        var tl = gsap.timeline({repeat: -1, onReverseComplete: function() {this.seek(tl.duration())}});
        
        var _flleg = $(`.${styles.ffleg}`);
        var _flbottomGroup = $(`.${styles.flbottomGroup}`);
        var _flfoot = $(`.${styles.flfoot}`);
        
        gsap.set(_flleg, {rotationZ: 45, x: -5});
        gsap.set(_flbottomGroup, {rotationZ: 5});
        gsap.set(_flfoot, {rotationZ: -50});
        

        tl.add([
            gsap.to(_flleg, { duration: 1.0, rotationZ: -45, delay: 0.0, force3D: true }),
            gsap.to(_flleg, { duration: 0.2, x: 0, delay: 0.0, ease: 'power1.out', force3D: true }),
            gsap.to(_flleg, { duration: 0.55, scaleY: 0.8, delay: 0.0, force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.55, scaleY: 0.8, delay: 0.0, force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.6, rotationZ: 20, delay: 0.0, ease: 'power3.in', force3D: true }),
            gsap.to(_flfoot, { duration: 0.55, scaleY: 1.5, delay: 0.0, force3D: true }),
            gsap.to(_flfoot, { duration: 0.6, rotationZ: 10, delay: 0.0, ease: 'power2.in', force3D: true }),
            gsap.to(_flleg, { duration: 0.4, scaleY: 1.0, delay: 0.6, force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.4, scaleY: 0.7, delay: 0.6, force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.4, rotationZ: 50, delay: 0.6, force3D: true }),
            gsap.to(_flfoot, { duration: 0.2, rotationZ: 10, delay: 0.6, ease: 'none', force3D: true }),
            gsap.to(_flfoot, { duration: 0.2, rotationZ: -10, delay: 0.8, ease: 'power1.out', force3D: true }),
            gsap.to(_flfoot, { duration: 0.4, scaleY: 1.5, delay: 0.6, force3D: true }),
            gsap.to(_flleg, { duration: 0.6, x: 20, delay: 0.7, force3D: true }),
            gsap.to(_flleg, { duration: 0.5, rotationZ: 0, delay: 1.0, ease: 'power1.in', force3D: true }),
            gsap.to(_flleg, { duration: 0.5, scaleY: 0.8, delay: 1.0, force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.5, scaleY: 0.5, delay: 1.0, force3D: true }),
            gsap.to(_flfoot, { duration: 0.5, scaleX: 1.8, scaleY: 1.7, delay: 1.0, ease: 'power1.in', force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.5, rotationZ: 40, delay: 1.0, force3D: true }),
            gsap.to(_flfoot, { duration: 0.5, rotationZ: -70, delay: 1.0, force3D: true }),
            gsap.to(_flleg, { duration: 0.5, rotationZ: 45, delay: 1.5, ease: 'power1.out', force3D: true }),
            gsap.to(_flleg, { duration: 0.5, scaleY: 1.0, delay: 1.5, force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.5, scaleY: 1.0, delay: 1.5, force3D: true }),
            gsap.to(_flbottomGroup, { duration: 0.5, rotationZ: 5, delay: 1.5, force3D: true }),
            gsap.to(_flfoot, { duration: 0.5, rotationZ: -50, delay: 1.5, force3D: true }),
            gsap.to(_flfoot, { duration: 0.5, scaleX: 1.0, scaleY: 1.0, delay: 1.5, force3D: true }),
            gsap.to(_flleg, { duration: 0.5, x: -10, delay: 1.3, force3D: true }),
            gsap.to(_flleg, { duration: 0.2, x: -5, delay: 1.8, ease: 'power1.in', force3D: true })
        ]);

        
        var tl2 = gsap.timeline({repeat: -1, delay: 0.7, onReverseComplete: function() {this.seek(tl2.duration())}});
        
        var _blleg = $(`.${styles.blleg}`);
        var _blbottomGroup = $(`.${styles.blbottomGroup}`);
        var _blfoot = $(`.${styles.blfoot}`);
        
        gsap.set(_blleg, {rotationZ: 45, x: -5});
        gsap.set(_blbottomGroup, {rotationZ: 5});
        gsap.set(_blfoot, {rotationZ: -50});

        tl2.add([
            gsap.to(_blleg, { duration: 1.0, rotationZ: -45, delay: 0.0, force3D: true }),
            gsap.to(_blleg, { duration: 0.2, x: 0, delay: 0.0, ease: 'power1.out', force3D: true }),
            gsap.to(_blleg, { duration: 0.55, scaleY: 0.8, delay: 0.0, force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.55, scaleY: 0.8, delay: 0.0, force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.6, rotationZ: 20, delay: 0.0, ease: 'power3.in', force3D: true }),
            gsap.to(_blfoot, { duration: 0.55, scaleY: 1.5, delay: 0.0, force3D: true }),
            gsap.to(_blfoot, { duration: 0.6, rotationZ: 10, delay: 0.0, ease: 'power2.in', force3D: true }),
            gsap.to(_blleg, { duration: 0.4, scaleY: 1.0, delay: 0.6, force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.4, scaleY: 0.7, delay: 0.6, force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.4, rotationZ: 50, delay: 0.6, force3D: true }),
            gsap.to(_blfoot, { duration: 0.2, rotationZ: 10, delay: 0.6, ease: 'none', force3D: true }),
            gsap.to(_blfoot, { duration: 0.2, rotationZ: -10, delay: 0.8, ease: 'power1.out', force3D: true }),
            gsap.to(_blfoot, { duration: 0.4, scaleY: 1.5, delay: 0.6, force3D: true }),
            gsap.to(_blleg, { duration: 0.6, x: 20, delay: 0.7, force3D: true }),
            gsap.to(_blleg, { duration: 0.5, rotationZ: 0, delay: 1.0, ease: 'power1.in', force3D: true }),
            gsap.to(_blleg, { duration: 0.5, scaleY: 0.8, delay: 1.0, force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.5, scaleY: 0.5, delay: 1.0, force3D: true }),
            gsap.to(_blfoot, { duration: 0.5, scaleX: 1.8, scaleY: 1.7, delay: 1.0, ease: 'power1.in', force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.5, rotationZ: 40, delay: 1.0, force3D: true }),
            gsap.to(_blfoot, { duration: 0.5, rotationZ: -70, delay: 1.0, force3D: true }),
            gsap.to(_blleg, { duration: 0.5, rotationZ: 45, delay: 1.5, ease: 'power1.out', force3D: true }),
            gsap.to(_blleg, { duration: 0.5, scaleY: 1.0, delay: 1.5, force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.5, scaleY: 1.0, delay: 1.5, force3D: true }),
            gsap.to(_blbottomGroup, { duration: 0.5, rotationZ: 5, delay: 1.5, force3D: true }),
            gsap.to(_blfoot, { duration: 0.5, rotationZ: -50, delay: 1.5, force3D: true }),
            gsap.to(_blfoot, { duration: 0.5, scaleX: 1.0, scaleY: 1.0, delay: 1.5, force3D: true }),
            gsap.to(_blleg, { duration: 0.5, x: -10, delay: 1.3, force3D: true }),
            gsap.to(_blleg, { duration: 0.2, x: -5, delay: 1.8, ease: 'power1.in', force3D: true })
        ]);

        
        
        
        const tl3 = gsap.timeline({ repeat: -1, delay: 1.0, onReverseComplete: function() { this.seek(tl3.duration()); } });

        const _frleg = $(`.${styles.frleg}`);
        const _frfoot = $(`.${styles.frfoot}`);
        
        gsap.set(_frleg, { rotationZ: 35, x: -40 });
        gsap.set(_frfoot, { rotationZ: -35 });
        
        tl3.add([
            gsap.to(_frleg, { duration: 0.9, rotationZ: -35, delay: 0.0, force3D: true }),
            gsap.to(_frleg, { duration: 1.2, x: 40, delay: 0.0, ease: 'power1.out', force3D: true }),
            gsap.to(_frfoot, { duration: 0.9, rotationZ: 35, delay: 0.0, force3D: true }),
            gsap.to(_frleg, { duration: 0.4, y: -15, delay: 0.0, ease: 'power1.in', force3D: true }),
            gsap.to(_frleg, { duration: 0.4, y: 0, delay: 0.5, ease: 'power1.out', force3D: true }),
            gsap.to(_frleg, { duration: 1.1, rotationZ: 35, delay: 0.9, force3D: true }),
            gsap.to(_frleg, { duration: 0.6, x: -50, delay: 1.2, force3D: true }),
            gsap.to(_frfoot, { duration: 0.5, rotationZ: -50, delay: 0.9, force3D: true }),
            gsap.to(_frfoot, { duration: 0.3, rotationZ: -35, delay: 1.7, force3D: true }),
            gsap.to(_frleg, { duration: 0.6, y: -40, delay: 0.9, force3D: true }),
            gsap.to(_frleg, { duration: 0.5, y: 0, delay: 1.5, force3D: true }),
            gsap.to(_frleg, { duration: 0.2, x: -40, delay: 1.8, ease: 'power1.in', force3D: true })
        ]);
        
        
        
        const tl4 = gsap.timeline({ repeat: -1, delay: 1.7, onReverseComplete: function() { this.seek(tl4.duration()); } });

        const _brleg = $(`.${styles.brleg}`);
        const _brfoot = $(`.${styles.brfoot}`);
        
        gsap.set(_brleg, { rotationZ: 35, x: -40 });
        gsap.set(_brfoot, { rotationZ: -35 });
        
        tl4.add([
            gsap.to(_brleg, { duration: 0.9, rotationZ: -35, delay: 0.0, force3D: true }),
            gsap.to(_brleg, { duration: 1.2, x: 40, delay: 0.0, ease: 'power1.out', force3D: true }),
            gsap.to(_brfoot, { duration: 0.9, rotationZ: 35, delay: 0.0, force3D: true }),
            gsap.to(_brleg, { duration: 0.4, y: -15, delay: 0.0, ease: 'power1.in', force3D: true }),
            gsap.to(_brleg, { duration: 0.4, y: 0, delay: 0.5, ease: 'power1.out', force3D: true }),
            gsap.to(_brleg, { duration: 1.1, rotationZ: 35, delay: 0.9, force3D: true }),
            gsap.to(_brleg, { duration: 0.6, x: -50, delay: 1.2, force3D: true }),
            gsap.to(_brfoot, { duration: 0.5, rotationZ: -50, delay: 0.9, force3D: true }),
            gsap.to(_brfoot, { duration: 0.3, rotationZ: -35, delay: 1.7, force3D: true }),
            gsap.to(_brleg, { duration: 0.6, y: -40, delay: 0.9, force3D: true }),
            gsap.to(_brleg, { duration: 0.5, y: 0, delay: 1.5, force3D: true }),
            gsap.to(_brleg, { duration: 0.2, x: -40, delay: 1.8, ease: 'power1.in', force3D: true })
        ]);
        
        
        
        const tl5 = gsap.timeline({ repeat: -1, delay: 0.0, onReverseComplete: function() { this.seek(tl5.duration()); } });
        gsap.set(_castle, { rotationZ: 9 });
        
        tl5.add([
            gsap.to(_castle, { duration: 1.0, rotationZ: 7, delay: 0.0, force3D: true }),
            gsap.to(_castle, { duration: 1.0, rotationZ: 9, delay: 1.0, force3D: true }),
            gsap.to(_castle, { duration: 0.5, x: '+=' + 2 * scale, y: '-=' + 4 * scale, delay: 0.0, force3D: true }),
            gsap.to(_castle, { duration: 0.5, x: '-=' + 4 * scale, y: '+=' + 4 * scale, delay: 0.5, force3D: true }),
            gsap.to(_castle, { duration: 0.5, x: '+=' + 4 * scale, y: '-=' + 5 * scale, delay: 1.0, force3D: true }),
            gsap.to(_castle, { duration: 0.5, x: '-=' + 2 * scale, y: '+=' + 5 * scale, delay: 1.5, force3D: true })
        ]);
        
        
        const tl6 = gsap.timeline({ repeat: -1, delay: 0.2 });
        const _mound = $(`.${styles.moundGroup}`);
        gsap.set(_mound, { rotationZ: 2 });
        
        tl6.add([
            gsap.to(_mound, { duration: 1.0, rotationZ: -1, delay: 0.0, force3D: true }),
            gsap.to(_mound, { duration: 1.0, rotationZ: 2, delay: 1.0, force3D: true })
        ]);
        
        
        const tl7 = gsap.timeline({ repeat: -1, delay: 0.8 });
        const _wing = $(`.${styles.wing}`);
        gsap.set(_wing, { rotationZ: 2 });
        
        tl7.add([
            gsap.to(_wing, { duration: 1.0, rotationZ: -1, x: -5, delay: 0.0, force3D: true }),
            gsap.to(_wing, { duration: 1.0, rotationZ: 2, x: 0, delay: 1.0, force3D: true })
        ]);
        
        
        const tl8 = gsap.timeline({ repeat: -1, delay: 0.0 });
        const _chimney1 = $(`.${styles.chimney1}`);
        gsap.set(_chimney1, { rotationZ: -10 });
        
        tl8.add([
            gsap.to(_chimney1, { duration: 1.5, rotationZ: 5, delay: 0.0, force3D: true }),
            gsap.to(_chimney1, { duration: 1.5, rotationZ: -10, delay: 1.5, force3D: true }),
            gsap.to(_chimney1, { duration: 0.5, y: 5, x: 0, delay: 0.1, force3D: true }),
            gsap.to(_chimney1, { duration: 0.1, y: -15, x: 4, delay: 0.6, ease: 'power1.out', force3D: true }),
            gsap.to(_chimney1, { duration: 0.9, y: 0, x: 0, delay: 0.7, force3D: true }),
            gsap.to(_chimney1, { duration: 0.5, y: 5, x: 0, delay: 1.6, force3D: true }),
            gsap.to(_chimney1, { duration: 0.1, y: -15, x: 4, delay: 2.1, ease: 'power1.out', force3D: true }),
            gsap.to(_chimney1, { duration: 0.5, y: 0, x: 0, delay: 2.2, force3D: true })
        ]);
        
        
        const tl9 = gsap.timeline({ repeat: -1, delay: 0.5 });
        const _chimney2 = $(`.${styles.chimney2}`);
        gsap.set(_chimney2, { rotationZ: -10 });
        
        tl9.add([
            gsap.to(_chimney2, { duration: 1.5, rotationZ: 5, delay: 0.0, force3D: true }),
            gsap.to(_chimney2, { duration: 1.5, rotationZ: -10, delay: 1.5, force3D: true }),
            gsap.to(_chimney2, { duration: 0.5, y: 5, x: 0, delay: 0.1, force3D: true }),
            gsap.to(_chimney2, { duration: 0.1, y: -15, x: 4, delay: 0.6, ease: 'power1.out', force3D: true }),
            gsap.to(_chimney2, { duration: 0.9, y: 0, x: 0, delay: 0.7, force3D: true }),
            gsap.to(_chimney2, { duration: 0.5, y: 5, x: 0, delay: 1.6, force3D: true }),
            gsap.to(_chimney2, { duration: 0.1, y: -15, x: 4, delay: 2.1, ease: 'power1.out', force3D: true }),
            gsap.to(_chimney2, { duration: 0.5, y: 0, x: 0, delay: 2.2, force3D: true })
        ]);
        
        
        const tl10 = gsap.timeline({ repeat: -1, delay: 1.1 });
        const _chimney3 = $(`.${styles.chimney3}`);
        gsap.set(_chimney3, { rotationZ: -10 });
        
        tl10.add([
            gsap.to(_chimney3, { duration: 1.5, rotationZ: 5, delay: 0.0, force3D: true }),
            gsap.to(_chimney3, { duration: 1.5, rotationZ: -10, delay: 1.5, force3D: true }),
            gsap.to(_chimney3, { duration: 0.5, y: 5, x: 0, delay: 0.1, force3D: true }),
            gsap.to(_chimney3, { duration: 0.1, y: -15, x: 4, delay: 0.6, ease: 'power1.out', force3D: true }),
            gsap.to(_chimney3, { duration: 0.9, y: 0, x: 0, delay: 0.7, force3D: true }),
            gsap.to(_chimney3, { duration: 0.5, y: 5, x: 0, delay: 1.6, force3D: true }),
            gsap.to(_chimney3, { duration: 0.1, y: -15, x: 4, delay: 2.1, ease: 'power1.out', force3D: true }),
            gsap.to(_chimney3, { duration: 0.5, y: 0, x: 0, delay: 2.2, force3D: true })
        ]);
        
        
        const tl11 = gsap.timeline({ repeat: -1, delay: 0.5 });
        const _houses = $(`.${styles.houses}`);
        const _point1 = $(`.${styles.point1}`);
        const _point2 = $(`.${styles.point2}`);
        
        gsap.set(_houses, { rotationZ: 2, x: -4 });
        gsap.set(_point1, { rotationZ: 2, x: -2 });
        
        tl11.add([
            gsap.to(_houses, { duration: 1.0, rotationZ: -1, y: 5, x: 0, delay: 0.0, force3D: true }),
            gsap.to(_houses, { duration: 1.0, rotationZ: 2, y: 0, x: -4, delay: 1.0, force3D: true }),
            gsap.to(_point1, { duration: 1.0, rotationZ: -10, y: 2, x: 0, delay: 0.0, force3D: true }),
            gsap.to(_point1, { duration: 1.0, rotationZ: 2, y: 0, x: -2, delay: 1.0, force3D: true }),
            gsap.to(_point2, { duration: 1.0, rotationZ: -5, y: 5, x: 2, delay: 0.0, force3D: true }),
            gsap.to(_point2, { duration: 1.0, rotationZ: 0, y: 0, x: 0, delay: 1.0, force3D: true })
        ]);
        
        
        const tl12 = gsap.timeline({ repeat: -1, delay: 0.45 });
        const _point4 = $(`.${styles.point4}`);
        const _point5 = $(`.${styles.point5}`);
        const _point6 = $(`.${styles.point6}`);
        
        tl12.add([
            gsap.to(_point6, { duration: 0.3, y: 3, delay: 0.0, force3D: true }),
            gsap.to(_point6, { duration: 0.1, y: -10, x: 4, delay: 0.3, force3D: true }),
            gsap.to(_point6, { duration: 0.9, y: 0, x: 0, delay: 0.4, force3D: true }),
            gsap.to(_point5, { duration: 0.3, y: 3, delay: 0.2, force3D: true }),
            gsap.to(_point5, { duration: 0.1, y: -7, x: 3, delay: 0.5, force3D: true }),
            gsap.to(_point5, { duration: 0.7, y: 0, x: 0, delay: 0.6, force3D: true }),
            gsap.to(_point4, { duration: 0.3, y: 3, delay: 0.4, force3D: true }),
            gsap.to(_point4, { duration: 0.1, y: -10, x: 4, delay: 0.7, force3D: true }),
            gsap.to(_point4, { duration: 0.7, y: 0, x: 0, delay: 0.8, force3D: true })
        ]);
        
        
        const tl13 = gsap.timeline({ repeat: -1, delay: 1.4 });
        const _treehouse = $(`.${styles.treehouse}`);
        
        gsap.set(_treehouse, { rotationZ: -5, y: 20, x: 4 });
        
        tl13.add([
            gsap.to(_treehouse, { duration: 1.0, rotationZ: 10, delay: 0.0, force3D: true }),
            gsap.to(_treehouse, { duration: 1.0, rotationZ: -5, delay: 1.0, force3D: true }),
            gsap.to(_treehouse, { duration: 1.0, rotationZ: 10, delay: 2.0, force3D: true }),
            gsap.to(_treehouse, { duration: 1.0, rotationZ: -5, delay: 3.0, force3D: true }),
            gsap.to(_treehouse, { duration: 0.4, y: -5, x: -2, delay: 0.2, force3D: true }),
            gsap.to(_treehouse, { duration: 3.2, y: 20, x: 4, delay: 0.8, force3D: true })
        ]);
        
        
        const tl14 = gsap.timeline({ repeat: -1, delay: 0.65 });
        const _wind = $(`.${styles.wind}`);
        const _antenna = $(`.${styles.antenna}`);
        const _cannon = $(`.${styles.cannon}`);
        const _tele = $(`.${styles.tele}`);
        const _knob = $(`.${styles.knob}`);
        
        gsap.set(_antenna, { rotationZ: 10, x: 0 });
        gsap.set(_wind, { rotationZ: -10, x: 0 });
        gsap.set(_knob, { rotationZ: -20, x: 0 });
        
        tl14.add([
            gsap.to(_antenna, { duration: 1.0, rotationZ: -5, x: 0, delay: 0.0, force3D: true }),
            gsap.to(_antenna, { duration: 1.0, rotationZ: 10, x: 5, delay: 1.0, force3D: true }),
            gsap.to(_antenna, { duration: 1.0, rotationZ: -10, x: -5, delay: 2.0, force3D: true }),
            gsap.to(_antenna, { duration: 1.0, rotationZ: 10, x: 0, delay: 3.0, force3D: true }),
            gsap.to(_wind, { duration: 1.1, rotationZ: 5, delay: 0.0, force3D: true }),
            gsap.to(_wind, { duration: 1.0, rotationZ: -15, delay: 1.1, force3D: true }),
            gsap.to(_wind, { duration: 1.0, rotationZ: 10, delay: 2.1, force3D: true }),
            gsap.to(_wind, { duration: 0.9, rotationZ: -10, delay: 3.1, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: 50, delay: 0.0, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: -20, delay: 0.3, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: 45, delay: 0.7, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: -25, delay: 1.0, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: 30, delay: 1.5, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: 0, delay: 1.9, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: -20, delay: 2.2, force3D: true }),
            gsap.to(_knob, { duration: 0.3, rotationZ: 60, delay: 2.6, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: -10, delay: 3.0, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: 40, delay: 3.4, force3D: true }),
            gsap.to(_knob, { duration: 0.2, rotationZ: -20, delay: 3.7, force3D: true }),
            gsap.to(_tele, { duration: 1.0, rotationZ: -3, delay: 0.0, force3D: true }),
            gsap.to(_tele, { duration: 1.0, rotationZ: 2, delay: 1.0, force3D: true }),
            gsap.to(_tele, { duration: 1.0, rotationZ: -3, delay: 2.0, force3D: true }),
            gsap.to(_tele, { duration: 1.0, rotationZ: 0, delay: 3.0, force3D: true }),
            gsap.to(_tele, { duration: 0.25, x: 25, y: 4, delay: 0.6, force3D: true }),
            gsap.to(_tele, { duration: 2.5, x: 0, y: 0, delay: 0.9, force3D: true }),
            gsap.to(_cannon, { duration: 0.9, rotationZ: -7, delay: 0.0, force3D: true }),
            gsap.to(_cannon, { duration: 0.9, rotationZ: 2, delay: 0.9, force3D: true }),
            gsap.to(_cannon, { duration: 1.1, rotationZ: -5, delay: 1.8, force3D: true }),
            gsap.to(_cannon, { duration: 1.1, rotationZ: 0, delay: 2.9, force3D: true }),
            gsap.to(_cannon, { duration: 0.25, x: 30, y: 4, delay: 0.85, force3D: true }),
            gsap.to(_cannon, { duration: 2.6, x: 0, y: 0, delay: 1.4, force3D: true })
        ]);
    })

    return (
        <div className={styles.animationContainer}>
            <audio src="http://cinemont.com/tutorials/howls/in_the_rain.mp3" autoPlay loop></audio>
            <div className={styles.howlsCastleContainer}>
                <img className={styles.background} src="http://cinemont.com/tutorials/howls/background.jpg" />
                <img className={styles.cloudBg} src="http://cinemont.com/tutorials/howls/cloud-bg.png" />
                <img className={styles.cloudBg2} src="http://cinemont.com/tutorials/howls/cloud-bg.png" />
                <div className={styles.castleContainer} ref={castleContainerRef}>
                    <div className={styles.castle} ref={castleRef}>
                        <div className={styles.brleg}>
                            <img className={styles.brfoot} src="http://cinemont.com/tutorials/howls/brfoot.png" />
                            <img className={styles.brbottom} src="http://cinemont.com/tutorials/howls/brbottom.png" />
                        </div>

                        <div className={styles.frleg}>
                            <img className={styles.frfoot} src="http://cinemont.com/tutorials/howls/frfoot.png" />
                            <img className={styles.frbottom} src="http://cinemont.com/tutorials/howls/frbottom.png" />
                        </div>

                        <img className={styles.chimney3} src="http://cinemont.com/tutorials/howls/chimney3.png" />
                        <img className={styles.treehouse} src="http://cinemont.com/tutorials/howls/treehouse.png" />

                        <div className={styles.housesGroup} >
                            <img className={styles.point6} src="http://cinemont.com/tutorials/howls/point6.png" />
                            <img className={styles.point5} src="http://cinemont.com/tutorials/howls/point5.png" />
                            <img className={styles.point4} src="http://cinemont.com/tutorials/howls/point4.png" />
                            <img className={styles.houses} src="http://cinemont.com/tutorials/howls/houses.png" />
                        </div>

                        <img className={styles.chimney2} src="http://cinemont.com/tutorials/howls/chimney2.png" />
                        <img className={styles.chimney1} src="http://cinemont.com/tutorials/howls/chimney1.png" />
                        <img className={styles.wing} src="http://cinemont.com/tutorials/howls/wing.png" />

                        <div className={styles.moundGroup} >
                            <img className={styles.antenna} src="http://cinemont.com/tutorials/howls/antenna.png" />
                            <img className={styles.point3} src="http://cinemont.com/tutorials/howls/point3.png" />
                            <img className={styles.point2} src="http://cinemont.com/tutorials/howls/point2.png" />
                            <img className={styles.point1} src="http://cinemont.com/tutorials/howls/point1.png" />
                            <img className={styles.mound} src="http://cinemont.com/tutorials/howls/mound.png" />
                        </div>

                        <img className={styles.wind} src="http://cinemont.com/tutorials/howls/wind.png" />
                        <img className={styles.cannon} src="http://cinemont.com/tutorials/howls/cannon.png" />
                        <img className={styles.main} src="http://cinemont.com/tutorials/howls/main.png" />

                        <div className={styles.blleg} >
                            <div className={styles.blbottomGroup} >
                                <img className={styles.blfoot} src="http://cinemont.com/tutorials/howls/flfoot.png" />
                                <img className={styles.blbottom} src="http://cinemont.com/tutorials/howls/flbottom.png" />
                            </div>
                            <img className={styles.bltop} src="http://cinemont.com/tutorials/howls/fltop.png" />
                        </div>

                        <img className={styles.blcover} src="http://cinemont.com/tutorials/howls/blcover.png" />
                        <img className={styles.knob} src="http://cinemont.com/tutorials/howls/knob.png" />
                        <img className={styles.tele} src="http://cinemont.com/tutorials/howls/tele.png" />
                        <img className={styles.telecover} src="http://cinemont.com/tutorials/howls/telecover.png" />

                        <div className={styles.flleg} >
                            <div className={styles.flbottomGroup} >
                                <img className={styles.flfoot} src="http://cinemont.com/tutorials/howls/flfoot.png" />
                                <img className={styles.flbottom} src="http://cinemont.com/tutorials/howls/flbottom.png" />
                            </div>
                            <img className={styles.fltop} src="http://cinemont.com/tutorials/howls/fltop.png" />
                        </div>

                        <img className={styles.flcover} src="http://cinemont.com/tutorials/howls/flcover.png" />
                    </div>
                </div>

                <img className={styles.foreground} src="http://cinemont.com/tutorials/howls/foreground.png" />

                <div className={styles.clouds} >
                    <img className={styles.cloudShadow1} src="http://cinemont.com/tutorials/howls/cloud_shadow-1.png" />
                    <img className={styles.cloudShadow2} src="http://cinemont.com/tutorials/howls/cloud_shadow-1.png" />
                    <img className={styles.cloudShadow3} src="http://cinemont.com/tutorials/howls/cloud_shadow-1.png" />
                    <img className={styles.cloud1} src="http://cinemont.com/tutorials/howls/cloud-1.png" />
                    <img className={styles.cloud2} src="http://cinemont.com/tutorials/howls/cloud-1.png" />
                    <img className={styles.cloud3} src="http://cinemont.com/tutorials/howls/cloud-2.png" />
                    <img className={styles.cloud4} src="http://cinemont.com/tutorials/howls/cloud-1.png" />
                    <img className={styles.cloud5} src="http://cinemont.com/tutorials/howls/cloud-2.png" />
                </div>

            </div>

            <div className={styles.controlToggle} >Toggle mouse controls</div>
            <div className={styles.loadGate} >Loading...</div>
            
        </div>
    );
};

export default Animation;