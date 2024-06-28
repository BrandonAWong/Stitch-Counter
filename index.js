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

function getIntRange(msg, min, max) {
    const count = prompt(msg);
    if (count && isFinite(count) && min <= count && max >= count) {
        return count;
    }
    else if (count) {
        alert('Invalid input. Must be number between 0-99.');
    }
}

window.onload = () => {
    const sets = 0;
    const reps = 0;

    document.querySelector('body').addEventListener('keyup', (e) => {
        if (e.key === 'F5') {
            return;
        }
        add();
    });
    document.querySelector('.add').addEventListener('click', (e) => {
        add();
        e.target.blur()
    });
    document.querySelector('.minus').addEventListener('click', (e) => {
        minus();
        e.target.blur()
    });

    document.querySelector('.setSets').addEventListener('click', () => {
        const setCount = getIntRange('Enter how many sets for this round', 0, 99);
        if (!setCount) { return; }
        const repCount = getIntRange('Enter how many reps per set', 0, 99);
        if (!repCount) { return; }

        sets = setCount;
        reps = repCount;

        document.querySelector('.totalSets').textContent = setCount;
    });
    document.querySelector('.setCount').addEventListener('click', () => {
        const count = getIntRange('Enter stitch count', 0, 99);
        if (count) {
            document.querySelector('.stitchCounter').textContent = count;
        }
    });
    document.querySelector('.reset').addEventListener('click', () => {
        if (window.confirm('Reset stitch count back to 0?')) {
            document.querySelector('.stitchCounter').textContent = 0;
        }
    });
}