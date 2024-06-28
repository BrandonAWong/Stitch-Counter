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
    setStitchesLeftForSet(repsPerSet);
    setCurrentSet(repsPerSet);
    setFinishedSets(repsPerSet);
    setSetsLeft(sets, repsPerSet);
}

function setStitchesLeftForSet(repsPerSet) {
    const stitches = document.querySelector('.stitchCounter').textContent;
    document.querySelector('.repsLeft').textContent = `Reps Left For Set: ${repsPerSet - (stitches % repsPerSet)}`;
}

function setCurrentSet(repsPerSet) {
    const stitches = document.querySelector('.stitchCounter').textContent;
    document.querySelector('.currentSet').textContent = `Working On Set: ${Math.floor(stitches / repsPerSet) + 1}`;
}

function setFinishedSets(repsPerSet) {
    const stitches = document.querySelector('.stitchCounter').textContent;
    document.querySelector('.setsFinished').textContent = `Sets Finished: ${Math.floor(stitches / repsPerSet)}`;
}

function setSetsLeft(sets, repsPerSet) {
    const stitches = document.querySelector('.stitchCounter').textContent;
    document.querySelector('.setsLeft').textContent = `Sets Left: ${sets - Math.floor(stitches / repsPerSet)}`;
}

function add() {
    const counterBox = document.querySelector('.stitchCounter');
    if (counterBox.textContent >= 99) {
        return;
    }
    ++counterBox.textContent;
}

function minus() {
    const counterBox = document.querySelector('.stitchCounter');
    if (counterBox.textContent <= 0) {
        return;
    }
    --counterBox.textContent;
}

window.onload = () => {
    let sets = 0;
    let reps = 1;

    document.querySelector('body').addEventListener('keyup', (e) => {
        if (e.key === 'F5') {
            return;
        }
        if (e.key === ' ') {
            add();
            setInfo(sets, reps);
        }
    });

    document.querySelector('.add').addEventListener('click', (e) => {
        add();
        e.target.blur();
        setInfo(sets, reps);
    });

    document.querySelector('.minus').addEventListener('click', (e) => {
        minus();
        e.target.blur()
        setInfo(sets, reps);
    });

    document.querySelector('.setSets').addEventListener('click', () => {
        const setCount = getIntRange('Enter how many sets for this round', 0, 99);
        if (!setCount) { 
            return; 
        }
        const repCount = getIntRange('Enter how many reps per set', 0, 99);
        if (!repCount) { 
            return; 
        }

        sets = setCount;
        reps = repCount;
        document.querySelector('.totalSets').textContent = `Total Sets: ${sets}`;
        setInfo(sets, reps);
    });

    document.querySelector('.setCount').addEventListener('click', () => {
        const count = getIntRange('Enter stitch count', 0, 99);
        if (count) {
            document.querySelector('.stitchCounter').textContent = count;
            setInfo(sets, reps);
        }
    });

    document.querySelector('.reset').addEventListener('click', () => {
        if (window.confirm('Reset stitch count back to 0?')) {
            document.querySelector('.stitchCounter').textContent = 0;
        }
    });
}