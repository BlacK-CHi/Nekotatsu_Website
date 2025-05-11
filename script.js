window.onload = function(){
    
    var anchors = ["Title", "Intro", "Neko", "Kota", "Gall", "footer"]; //앵커 이동을 위한 앵커별 ID 배열
    var currentIndex = 0;
    var audio = document.getElementById("bgmAudio");
    var prevBtn = document.getElementById("buttonPgUp");
    var nextBtn = document.getElementById("buttonPgDn");
    var isScrolling = false;

    /*---------------- AOS 활성화 ----------------*/
    AOS.init({
        duration: 1200,
    })

    /*---------------- 캐러셀 활성화 ----------------*/
    tns(
        {
        container: ".imgcar", //대상 컨테이너(객체)의 ID를 지정
        items: 5,
        loop: true,
        gutter:10,
        autoWidth:true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayButtonOutput: false,
        autoplayHoverPause : true, //캐러셀 이미지에 마우스를 올려놓으면 캐러셀이 멈춤
        nav: false,
        controls: false,
        swipeAngle: false,
        speed: 300
        }
    )
    
    /*---------------- 버튼을 사용하여 앵커간 이동 ----------------*/

    prevBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            scrollToAnchor(anchors[currentIndex]);
        }
    });

    nextBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        if (currentIndex < anchors.length - 1) {
            currentIndex++;
            scrollToAnchor(anchors[currentIndex]);
        }
    });

    function scrollToAnchor(anchor) {
        var target = document.getElementById(anchor);
        target.scrollIntoView({
            behavior: "smooth"
        });
    }

    
    /*---------------- 마우스 스크롤을 사용하여 앵커간 이동 ----------------*/
    window.addEventListener("wheel", function(event) {
        event.preventDefault();
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(function() {
                isScrolling = false;
            }, 500); // 설정한 시간 동안 스크롤 중인 상태 유지

            if (event.deltaY < 0) { //스크롤을 올렸을 경우
                if (currentIndex > 0) {
                    currentIndex--;
                    scrollToAnchor(anchors[currentIndex]);
                }
            } else { //스크롤을 내렸을 경우
                if (currentIndex < anchors.length - 1) {
                    currentIndex++;
                    scrollToAnchor(anchors[currentIndex]);
                }
            }
        }
    }, { passive: false });

    var audio = document.getElementById("bgmAudio");

    /* ...중략... */

    /*---------------- 클릭 동작 시 음악 재생 ----------------*/
    document.addEventListener("click", function() {
        audio.play();
        document.removeEventListener("click");
    });
    

}