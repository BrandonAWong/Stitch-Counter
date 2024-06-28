function getIntRange(msg, min, max) {
    const count = prompt(msg);
    if (count && isFinite(count) && min <= count && max >= count) {
        return count;
    }
    else if (count) {
        alert('Invalid input. Must be number between 0-99.');
    }
}

function setInfo(sets, repsPerSet) {
    if (sets <= 0) {
        return;
    }
    document.querySelector('.stitchCounter').textContent = getStitches();
    setStitchesLeftForSet(repsPerSet);
    setCurrentSet(repsPerSet);
    setFinishedSets(repsPerSet);
    setSetsLeft(sets, repsPerSet);
}

function setStitchesLeftForSet(repsPerSet) {
    const stitches = getStitches();
    document.querySelector('.repsLeft').textContent = `Reps Left For Set: ${repsPerSet - (stitches % repsPerSet)}`;
}

function setCurrentSet(repsPerSet) {
    const stitches = getStitches();
    document.querySelector('.currentSet').textContent = `Working On Set: ${Math.floor(stitches / repsPerSet) + 1}`;
}

function setFinishedSets(repsPerSet) {
    const stitches = getStitches();
    document.querySelector('.setsFinished').textContent = `Sets Finished: ${Math.floor(stitches / repsPerSet)}`;
}

function setSetsLeft(sets, repsPerSet) {
    const stitches = getStitches();
    document.querySelector('.setsLeft').textContent = `Sets Left: ${sets - Math.floor(stitches / repsPerSet)}`;
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
        sets = localStorage.getItem('sets');
        reps = localStorage.getItem('reps');
        document.querySelector('.totalSets').textContent = `Total Sets: ${getSets()}`;
        setInfo(getSets(), getReps());
    }

    document.querySelector('body').addEventListener('keyup', (e) => {
        if (e.key === 'F5') {
            return;
        }
        if (e.key === ' ') {
            add();
            setInfo(getSets(), getReps());
        }
    });

    document.querySelector('.add').addEventListener('click', (e) => {
        add();
        e.target.blur();
        setInfo(getSets(), getReps());
    });

    document.querySelector('.minus').addEventListener('click', (e) => {
        minus();
        e.target.blur()
        setInfo(getSets(), getReps());
    });

    document.querySelector('.setSets').addEventListener('click', () => {
        const sets = getIntRange('Enter how many sets for this round', 0, 99);
        if (!sets) { 
            return; 
        }
        const reps = getIntRange('Enter how many reps per set', 0, 99);
        if (!reps) { 
            return; 
        }

        document.querySelector('.totalSets').textContent = `Total Sets: ${getSets()}`;
        localStorage.setItem('sets', sets);
        localStorage.setItem('rep', reps);
        setInfo(getSets(), getReps());
    });

    document.querySelector('.setCount').addEventListener('click', () => {
        const count = getIntRange('Enter stitch count', 0, 99);
        if (count) {
            document.querySelector('.stitchCounter').textContent = count;
            localStorage.setItem('stitches', count);
            setInfo(getSets(), getReps());
        }
    });

    document.querySelector('.reset').addEventListener('click', () => {
        if (window.confirm('Reset stitch count back to 0?')) {
            document.querySelector('.stitchCounter').textContent = 0;
            localStorage.setItem('stitches', 0);
            setInfo(getSets(), getReps());
        }
    });
}