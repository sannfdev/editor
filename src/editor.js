const fg = document.querySelector('textarea#fg');
const bg = document.querySelector('pre#bg');

const E = {
    update() { bg.textContent = fg.value; },
    insert(txt) {
        let end, range;
        if (fg.selectionStart !== undefined && fg.selectionEnd !== undefined) {
            end = fg.selectionEnd;
            fg.value = fg.value.slice(0, fg.selectionStart) + txt + fg.value.slice(end);
            fg.selectionStart = fg.selectionEnd = end + txt.length;
        } else if (document.selection !== undefined && document.selection.createRange !== undefined) {
            fg.focus();
            range = document.selection.createRange();
            range.collapse(false);
            range.text = txt;
            range.select();
        }
        this.update();
    },
}

window.addEventListener('load', E.update);
fg.addEventListener('input', E.update);
fg.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 9: e.preventDefault(); E.insert('\t'); break;
    }
});

fg.addEventListener('scroll', () => {
    bg.scrollLeft = fg.scrollLeft;
    bg.scrollTop = fg.scrollTop;
})