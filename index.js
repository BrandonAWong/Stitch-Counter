function getIntRange(msg, min, max) {
    const count = prompt(msg);
    if (count && isFinite(count) && min <= count && max >= count) {
        return count;
    }
    else if (count) {
        alert(`Invalid input. Must be number between ${min}-${max}.`);
    }
}

function setInfo() {
    document.querySelector('.stitchCounter').textContent = getStitches();
    setStitchesLeftForSet();
    setCurrentSet();
    setFinishedSets();
    setSetsLeft();
    if (getStitches() == getReps() * getSets()) {
        alert('Round finished!!')
    }
}

function setStitchesLeftForSet() {
    const stitches = getStitches();
    document.querySelector('.repsLeft').textContent = `Reps Left For Set: ${getReps() - (stitches % getReps())}`;
}

function setCurrentSet() {
    const stitches = getStitches();
    document.querySelector('.currentSet').textContent = `Working On Set: ${Math.floor(stitches / getReps()) + 1}`;
}

function setFinishedSets() {
    const stitches = getStitches();
    document.querySelector('.setsFinished').textContent = `Sets Finished: ${Math.floor(stitches / getReps())}`;
}

function setSetsLeft() {
    const stitches = getStitches();
    document.querySelector('.setsLeft').textContent = `Sets Left: ${getSets() - Math.floor(stitches / getReps())}`;
}

function getStitches() { return localStorage.getItem('stitches'); }

function getSets() { return localStorage.getItem('sets'); }

function getReps() { return localStorage.getItem('reps'); }

function add() {
    const counterBox = document.querySelector('.stitchCounter');
    if (counterBox.textContent >= 99) {
        return;
    }
    localStorage.setItem('stitches', ++counterBox.textContent);
}

function minus() {
    const counterBox = document.querySelector('.stitchCounter');
    if (counterBox.textContent <= 0) {
        return;
    }
    localStorage.setItem('stitches', --counterBox.textContent);
}

window.onload = () => {
    if (localStorage.getItem('stitches') === null) {
        localStorage.setItem('stitches', 0);
        localStorage.setItem('sets', 0);
        localStorage.setItem('reps', 1);
    }
    else {
        document.querySelector('.totalSets').textContent = `Total Sets: ${getSets()}`;
        setInfo();
    }

    document.querySelector('body').addEventListener('keyup', (e) => {
        if (e.key === 'F5') {
            return;
        }
        if (e.key === ' ') {
            add();
            setInfo();
        }
    });

    document.querySelector('.add').addEventListener('click', (e) => {
        add();
        e.target.blur();
        setInfo();
    });

    document.querySelector('.minus').addEventListener('click', (e) => {
        minus();
        e.target.blur()
        setInfo();
    });

    document.querySelector('.setSets').addEventListener('click', () => {
        const sets = getIntRange('Enter how many sets for this round', 0, 99);
        if (!sets) { 
            return; 
        }
        const reps = getIntRange('Enter how many reps per set', 1, 99);
        if (!reps) { 
            return; 
        }

        localStorage.setItem('sets', sets);
        localStorage.setItem('reps', reps);
        document.querySelector('.totalSets').textContent = `Total Sets: ${getSets()}`;
        setInfo();
    });

    document.querySelector('.setCount').addEventListener('click', () => {
        const count = getIntRange('Enter stitch count', 0, 99);
        if (count) {
            document.querySelector('.stitchCounter').textContent = count;
            localStorage.setItem('stitches', count);
            setInfo();
        }
    });

    document.querySelector('.reset').addEventListener('click', () => {
        if (window.confirm('Reset stitch count back to 0?')) {
            document.querySelector('.stitchCounter').textContent = 0;
            localStorage.setItem('stitches', 0);
            setInfo();
        }
    });
}