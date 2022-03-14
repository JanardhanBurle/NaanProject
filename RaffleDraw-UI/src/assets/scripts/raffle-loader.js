
export { Raffle };


function RaffleDisplay() { }
RaffleDisplay.prototype.countDown = function countDown(node0, node1, counter, delay) {
    if (delay === 0) return;
    let n0 = document.querySelector('#' + node0);
    let n1 = document.querySelector('#' + node1);
    let nodeValue = '#' + node0 + ', #' + node1;
    if (counter > 0) {
        counter--;
    } else {
        counter = 9;
    }
    n1.textContent = counter.toString();
    TweenMax.to(nodeValue, delay, {
        y: '+=400',
        delay: delay,
        ease: Power3.easeInOut,
        onComplete: function () {
            n0.textContent = counter.toString();
            TweenMax.set(nodeValue, { y: '-=400', onComplete: countDown(node0, node1, counter) });
        }
    });
};

var Raffle = new RaffleDisplay();



