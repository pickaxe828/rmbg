export default class progress {
    static update(bar: HTMLElement, percent: number | "error") {
        let inner = bar.children[0] as HTMLElement;
        if (percent < 100) {
            inner.style.width = `${percent}%`;
            inner.innerText = `${percent}%`;
            inner.classList.value = "progress-bar bg-success progress-bar-striped progress-bar-animated";
        } else if (percent >= 100) {
            inner.style.width = `100%`;
            inner.innerText = "✅"
            inner.classList.value = "progress-bar bg-success"
        } else if (percent === "error") {
            inner.style.width = `100%`;
            inner.innerText = "⚠️"
            inner.classList.value = "progress-bar bg-warning"
        }
    }

    static done(bar: HTMLElement) {
        this.update(bar, 100)
    }

    static error(bar: HTMLElement) {
        this.update(bar, "error")
    }
}
