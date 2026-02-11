// use a script tag or an external JS file
        document.addEventListener("DOMContentLoaded", (event) => {
            gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, ScrollSmoother)
            // gsap code here!



            const smoother = ScrollSmoother.create({
                smooth:1, //부드러운 정도(초단위)
                speed:1, //스크롤 속도
                effects:true, //패럴럭스(지연반응) 효과적용여부
                smoothTouch:0.1, //모바일 터치 반응
            });


            gsap.from(".main_bg h1, .main_bg h3", {
                duration: 1.8,
                opacity: 0,   
                y: 50,         
                ease: "power2.out" 
            });


            //-----------------------------화살표-----------------------------------------
            // 1. step_text1과 step_text2를 모두 찾아서 리스트로 만듦
            const arrowSteps = gsap.utils.toArray(".step_text1, .step_text2");

            // 2. 찾은 박스들을 하나씩 돌면서 애니메이션 입히기 (이 반복문이 핵심!)
            arrowSteps.forEach((step) => {
                // 현재 순서의 박스(step) 안에서만 선이랑 머리 찾기
                const line = step.querySelector(".draw_line");
                const head = step.querySelector(".arrow_head");

                if (line && head) {
                    const pathLength = line.getTotalLength();

                    // 초기 상태 세팅
                    gsap.set(line, {
                        strokeDasharray: pathLength,
                        strokeDashoffset: pathLength
                    });
                    gsap.set(head, { opacity: 0 });

                    // 애니메이션 실행
                    gsap.to(line, {
                        scrollTrigger: {
                            trigger: step, // 👈 중요! .process_step1 대신 '현재 박스'를 기준으로!
                            start: "top 80%",
                            toggleActions: "play none none none"
                        },
                        strokeDashoffset: 0,
                        duration: 1.5,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.to(head, { opacity: 1, duration: 0.3 }); // 선 다 그려지면 머리 짠!
                        }
                    });
                }
            });


            gsap.fromTo(".step_text1 p",
                {
                    y: 150,         // 150px 아래에서 출발
                    opacity: 0      // 투명한 상태로 대기
                },
                {
                    scrollTrigger: {
                        trigger: ".step_text1", // safety_image 박스가 보일 때 시작
                        start: "top 85%",        // 화면 85% 지점에 닿으면 실행
                        toggleActions: "play none none reverse",
                        markers: false           // 잘 작동하면 false, 확인하고 싶으면 true
                    },
                    y: 0,           // 원래 자리로
                    opacity: 1,     // 선명하게 나타남
                    duration: 1.5,    // 1초 동안 부드럽게
                    delay: 1.5,
                    ease: "power3.out",
                    stagger: 0      // 0으로 설정해서 3개가 '동시에' 올라오게 함
                }
            );


            gsap.fromTo(".step_text2 p",
                {
                    y: 150,         // 150px 아래에서 출발
                    opacity: 0      // 투명한 상태로 대기
                },
                {
                    scrollTrigger: {
                        trigger: ".step_text2", // safety_image 박스가 보일 때 시작
                        start: "top 50%",        // 화면 85% 지점에 닿으면 실행
                        toggleActions: "play none none reverse",
                        markers: false           // 잘 작동하면 false, 확인하고 싶으면 true
                    },
                    y: 0,           // 원래 자리로
                    opacity: 1,     // 선명하게 나타남
                    duration: 1.5,    // 1초 동안 부드럽게
                    delay: 1.5,
                    ease: "power3.out",
                    stagger: 0      // 0으로 설정해서 3개가 '동시에' 올라오게 함
                }
            );



            gsap.fromTo(".step_img1 img",
                {
                    y: 150,         // 150px 아래에서 출발
                    opacity: 0      // 투명한 상태로 대기
                },
                {
                    scrollTrigger: {
                        trigger: ".step_text1", // safety_image 박스가 보일 때 시작
                        start: "top 85%",        // 화면 85% 지점에 닿으면 실행
                        toggleActions: "play none none reverse",
                        markers: false           // 잘 작동하면 false, 확인하고 싶으면 true
                    },
                    y: 0,           // 원래 자리로
                    opacity: 1,     // 선명하게 나타남
                    duration: 1.5,    // 1초 동안 부드럽게
                    delay: 2,
                    ease: "power3.out",
                    stagger: 0      // 0으로 설정해서 3개가 '동시에' 올라오게 함
                }
            );
            // gsap.fromTo(".bg_card",
            //     {
            //         opacity: 0,
            //         y: 50
            //     },
            //     {
            //         scrollTrigger: {
            //             trigger: ".process_step2", // 부모 박스가 보이면 시작
            //             start: "top 70%",          // 조금 더 일찍 시작하게 조정
            //             toggleActions: "play none none reverse"
            //         },
            //         opacity: 1,
            //         y: 0,
            //         duration: 0.5,
            //         stagger: 0.8, // 0.3초 간격으로 하나씩!
            //         delay: 2.5,
            //     }
            // );


            const maskPath = document.querySelector(".mask_path");
            const pathLength = maskPath.getTotalLength();

            // 초기 세팅
            gsap.set(".mask_path, .mask_path2", { strokeDasharray: 1500, strokeDashoffset: 1500 });

            const step2Tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".process_step2",
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                    markers: false

                }
            });


            // 순서: 하트1 -> 하트2 -> 점선 주르륵 -> 카드

            step2Tl.fromTo(".bg_card1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, delay: 2.5, });
            step2Tl.fromTo(".bg_card2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, });

            step2Tl.from(".heart_1", { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }); //하트1
            step2Tl.from(".heart_2", { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(1.7)" }); //하트2
            step2Tl.to(".mask_path", { strokeDashoffset: 0, duration: 2, ease: "none" },); //그려지는 점선1
            step2Tl.to(".mask_path2", { strokeDashoffset: 0, duration: 2, ease: "none", }, "-=1"); //그려지는 점선2
            step2Tl.from(".heart_line2", { opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=1") //삼각형이미지 
            step2Tl.fromTo(".bg_card4", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, }, "-=0.5"); //톡 이미지



            //-------------------------------------------------------------------------------------------------------------------
            gsap.from(".standard_card img", {
                scrollTrigger: {
                    trigger: ".standard_card",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.2
            });

            gsap.fromTo(".mate_box p",
                {
                    y: 150,      // 출발지점: 150px 아래 (더 아래를 원하면 숫자를 키워!)
                    opacity: 0   // 출발상태: 완전 투명
                },
                {
                    scrollTrigger: {
                        trigger: ".mate_box", // 기준점: 이 박스가 보이면 시작
                        start: "top 30%",     // 화면의 85% 지점에 닿으면 실행
                        // 확인용 가이드라인 (잘 되면 나중에 삭제)
                        toggleActions: "play none none reverse"
                    },
                    y: 0,           // 도착지점: 원래 자리
                    opacity: 1,     // 도착상태: 완전 선명
                    duration: 2,    // 올라오는 시간 (1초 동안 묵직하게)
                    ease: "power3.out", // 세련되게 속도가 줄어드는 가속도
                    stagger: 0      // 0으로 두면 글자들이 '동시에' 올라와!
                }
            );


            gsap.fromTo(".mate_top .image",
                {
                    x: 100,      // 왼쪽(-100px)에서 출발
                    opacity: 0
                },
                {
                    scrollTrigger: {
                        trigger: ".mate_box",
                        start: "top 30%",
                        toggleActions: "play none none reverse"
                    },
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.5,
                }
            );

            // 2. 오른쪽 사진 (오른쪽 -> 왼쪽으로)
            gsap.fromTo(".mate_bottom .image",
                {
                    x: -100,       // 오른쪽(100px)에서 출발
                    opacity: 0
                },
                {
                    scrollTrigger: {
                        trigger: ".mate_box",
                        start: "top 30%",
                        toggleActions: "play none none reverse"
                    },
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.5,
                }
            );
            //------------------------------------------------------------------------------------------------------------------------
            gsap.fromTo(".meet_box",
                {
                    y: 150,         // 150px 아래에서 출발
                    opacity: 0      // 투명한 상태로 대기
                },
                {
                    scrollTrigger: {
                        trigger: ".meet_box", // safety_image 박스가 보일 때 시작
                        start: "top 85%",        // 화면 85% 지점에 닿으면 실행
                        toggleActions: "play none none reverse",
                        markers: false           // 잘 작동하면 false, 확인하고 싶으면 true
                    },
                    y: 0,           // 원래 자리로
                    opacity: 1,     // 선명하게 나타남
                    duration: 2,    // 1초 동안 부드럽게
                    ease: "power3.out",
                    stagger: 0      // 0으로 설정해서 3개가 '동시에' 올라오게 함
                }
            );



            //---------------------------------------------------------------------------------
            gsap.fromTo(".safety_image img",
                {
                    y: 150,         // 150px 아래에서 출발
                    opacity: 0      // 투명한 상태로 대기
                },
                {
                    scrollTrigger: {
                        trigger: ".safety_image", // safety_image 박스가 보일 때 시작
                        start: "top 85%",        // 화면 85% 지점에 닿으면 실행
                        toggleActions: "play none none reverse",
                        markers: false           // 잘 작동하면 false, 확인하고 싶으면 true
                    },
                    y: 0,           // 원래 자리로
                    opacity: 1,     // 선명하게 나타남
                    duration: 2,    // 1초 동안 부드럽게
                    ease: "power3.out",
                    stagger: 0      // 0으로 설정해서 3개가 '동시에' 올라오게 함
                }
            );

            //-------------------------------------------------------------------------------------------------------------------
            gsap.registerPlugin(ScrollTrigger);

            const whyTL = gsap.timeline({
                scrollTrigger: {
                    trigger: ".why",
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                }
            });

            // (선택) 섹션 전체 살짝 페이드
            whyTL.from(".why", {
                opacity: 0,
                duration: 0.35,
                ease: "power1.out"
            }, 0);

            // ✅ 1) 질문 4개(h3) "한번에" 등장
            whyTL.from(".why_box h3", {
                y: 16,
                opacity: 0,
                duration: 0.9,
                ease: "power2.out"
            }, 0.05);

            // ✅ 2) 답변 4개(p) "그 다음에" 한번에 등장
            whyTL.from(".why_box p", {
                y: 12,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            }, ">0.1"); // 질문 끝난 뒤 0.15s 쉬고 시작


            whyTL.from(".why_box .highlight", {
                opacity: 0,
                y: 6,
                duration: 0.35,
                ease: "power2.out"
            }, ">0.1");

            whyTL.fromTo(".why_box .highlight",
                { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", immediateRender: false },
                ">0.1"
            );


        });