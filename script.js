let init = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
init()

let cursorAnimation = () => {
  let main = document.querySelector(".main")
  main.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      left: dets.x,
      top: dets.y,
      transform: `translate(-50%, -50%) scale(1)`,
      opacity: 1,
    })
  })
}
cursorAnimation()

let gsapAnim = () => {
gsap.from(".animation",{
  y:"100px",
  delay:.4,
  duration:.5,
  opacity:0,
  // scale:0
})
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      start: "top 27%",
      end: "top 10",
      scrub: 3,
    }
  })
  tl.to(".page1 h1", {
    x: -100,

  }, "anim")
  tl.to(".page1 h2", {
    x: 100,

  }, "anim")
  tl.to(".page1 video", {
    width: "90%"
  }, "anim")



  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      start: "top -123%",
      end: "top -110",
      // markers:true,
      scrub: 3,
    }
  })

  tl2.to(".main", {
    backgroundColor: '#fff',
  })

  let tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      start: "top -123%",
      end: "top -120%",
      // markers:true,
      scrub: 3,
    }
  })

  tl3.from(".page2 h1", {
    y: "350px",
    duration: .6,
    opacity: 0,

  })
  tl3.from(".page2 .container", {
    y: "350px",
    duration: .4,
    opacity: 0,

  })

  let tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top 40%",
      end: "top 30%",
      // markers:true,
      scrub: 3,
    }
  })
  tl5.from(".page3 h1", {
    y: "350px",
    duration: .4,
    opacity: 0,

  })
  tl5.from(".page3 img", {
    x: "-450px",
    duration: .4,
    opacity: 0,
  })
  tl5.from(".page3 video", {
    x: "110%",
    duration: .4,
    opacity: 0,

  })



  let tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 40%",
      end: "top 30%",
      // markers:true,
      scrub: 3,
    }
  })
  tl4.to(".main", {
    backgroundColor: 'black',
  })

  gsap.from(".page5", {
    y: "350px",
    duration: .4,
    opacity:0,
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top 85%",
      end: "top 75%",
      // markers:true,
      scrub: 3,
    }
  })

}
gsapAnim()


let boxesAnim = () => {
  let boxes = document.querySelectorAll(".box")
  let cursor = document.querySelector(".cursor")
  boxes.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      let att = elem.getAttribute("data-image")
      cursor.style.height = "250px"
      cursor.style.width = "350px"
      cursor.style.borderRadius = "0"
      cursor.style.backgroundImage = `url(${att})`
    }),
      elem.addEventListener("mouseleave", () => {
        cursor.style.height = "20px"
        cursor.style.width = "20px"
        cursor.style.borderRadius = "50%"
        cursor.style.backgroundImage = `none`

      })

  })
}
boxesAnim()